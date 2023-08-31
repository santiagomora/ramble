from datetime import datetime
from file_handler import FileHandler
import os

#AGREGAR posibilidad de indicar subtema, de manera que un tema padre pueda mostrar sus temas hijo
class Note():

	date_format = '%d%m%Y_%H%M%S%f'

	def __init__(self, path, theme, work_date):
		self.path = path
		self.work_date = work_date
		self.theme = theme

	def __str__(self):
		work_date_str = self.work_date.strftime('%d/%m/%y %H:%M:%S.%f')
		name = self.get('name')
		return f' Note:\t\t{name}\n Theme:\t\t{self.theme}\n Work date:\t{work_date_str}';

	def __contents_iter(self):
		for line in FileHandler.instance().file_lines_iter(self.path):
			yield line

	def print_contents(self, separator_length):
		separator = '='*separator_length
		print(f'{separator}\n{self}\n{separator}')
		for line in self.__contents_iter():
			print(line, end='')

	def get(self, attr):
		if attr == 'name':
			return os.path.basename(self.path)
		if attr == 'header':
			return FileHandler.instance().get_file_nth_line(self.path, 1)
		return getattr(self, attr)

	@staticmethod
	def create(path):
		name = os.path.basename(path)
		description = name.split('.')
		return Note(path, description[0], datetime.strptime(description[1], Note.date_format))

