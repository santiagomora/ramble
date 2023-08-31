from datetime import datetime, timedelta
from file_handler import FileHandler
from note import Note
import os
import sys

def sorter_helper(objects, key, direction = 'DESC'):
	if len(objects) <= 1:
		return objects
	else:
		order = None; ox=0
		for ix, obj in enumerate(objects):
			(order, ox) = (obj, ix) if order is None or (order.get(key) <= obj.get(key) and direction == 'DESC') else (order, ox)
			(order, ox) = (obj, ix) if order is None or (order.get(key) >= obj.get(key) and direction == 'ASC') else (order, ox)
		return [order] + sorter_helper(objects[0:ox] + objects[ox+1:], key , direction)

class NoteHandler():

	BASE_DIR = '/home/smora/notes'

	SEPARATOR_LEN = 55

	__instance = None

	def add(self, theme):
		created_at = datetime.now().strftime(Note.date_format)
		FileHandler.instance().edit(os.path.join(NoteHandler.BASE_DIR, f'{theme}.{created_at}.note'))

	def edit_at(self, theme, index):
		notes = [n for n in (self.list_by_theme(theme) if theme != '' else self.list_all())]
		if len(notes)>=index:
			notes = sorter_helper(notes, 'work_date', 'DESC')
			FileHandler.instance().edit(notes[index-1].path)
		else:
			print(f'Found only {len(notes)} notes related to "{theme}"')

	def edit(self, name):
		fh = FileHandler.instance()
		npath = os.path.join(NoteHandler.BASE_DIR, name)
		if fh.isfile(npath):
			fh.edit(npath)
		else:
			print(f'Note {name} not Found')

	def group_files_into_notes(self, theme, files):
		fh = FileHandler.instance()
		for f in files:
			created_at = fh.get_path_creation_datetime(f).strftime(Note.date_format)
			fh.create_file_from(os.path.join(NoteHandler.BASE_DIR, f'{theme}.{created_at}.note'), f)

	def find(self, name):
		fh = FileHandler.instance()
		npath = os.path.join(NoteHandler.BASE_DIR, name)
		if fh.isfile(npath):
			return Note.create(npath)
		return None

	def find_or_fail(self, name):
		n = self.find(name)
		if n is None:
			raise Exception(f'Note not found "{name}"')
		return n

	def list_all(self):
		for fname in FileHandler.instance().list_files(NoteHandler.BASE_DIR):
			if not os.path.basename(fname).startswith('.'):
				yield Note.create(fname)

	def list_by_theme(self, theme):
		for note in self.list_all():
			if note.theme == theme:
				yield note

	def show_theme_contents(self, theme):
		for note in self.list_by_theme(theme):
			note.print_contents(NoteHandler.SEPARATOR_LEN)
			print('\n')

	def show_note_contents(self, path):
		note = self.find_or_fail(path)
		note.print_contents(NoteHandler.SEPARATOR_LEN)

	def list_themes(self):
		themes = {}
		for n in self.list_all():
			theme = themes.get(n.theme, {'total': 0, 'last_updated': n.work_date})
			theme['total'] += 1
			theme['last_updated'] = n.work_date if n.work_date > theme['last_updated'] else theme['last_updated']
			themes[n.theme] = theme
		separator = '='*NoteHandler.SEPARATOR_LEN
		print(f'{separator}\n {len(themes.keys())} Themes found\n{separator}')
		header = f' Last updated at\t\t| Notes\t| Theme'
		print(header)
		print(separator)
		for theme in sorted(themes):
			print(f'{themes[theme]["last_updated"]}\t| {themes[theme]["total"]}\t| {theme}\n', end='')

	def list_notes(self, theme):
		notes = [n for n in self.list_by_theme(theme)]
		separator = '='*(NoteHandler.SEPARATOR_LEN*2)
		print(f'{separator}\n {len(notes)} Notes found for "{theme}"\n{separator}')
		print(f' Last updated at\t\t| Name\t\t\t\t\t| Header\n{separator}')
		for n in sorter_helper(notes, 'work_date', 'ASC'):
			print(f'{n.get("work_date")}\t| {n.get("name")}\t| {n.get("header")}', end='')

	def explode(self, name):
		note = self.find_or_fail(name)
		FileHandler.instance().explode(note.path, lambda : os.path.join(Note.BASE_DIR, f'{note.theme}.{datetime.now().strftime(Note.date_format)}.note'))

	@staticmethod
	def instance():
		if NoteHandler.__instance is None:
			NoteHandler.__instance = NoteHandler()
		return NoteHandler.__instance
