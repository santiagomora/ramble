import os
import re
import sys
import datetime
import time

class FileHandler():

	__instance = None

	def file_lines_iter(self, filename):
		with open(filename, 'r') as f:
			for line in f:
				yield line
			f.close()

	def list_files(self, path):
		for fname in os.listdir(path):
			yield os.path.join(path, fname)

	def list_matches_iter(self, path, match):
		for fpath in self.list_files(path):
			if re.search(match, fpath):
				yield fpath

	def isfile(self, filename):
		return os.path.isfile(filename)

	def edit(self, filename, editor='vim'):
		if not editor in ['vim', 'nano', 'kate']:
			raise Exception(f'Editor "{editor}" not supported')
		os.system(f'{editor} {filename}');

	def get_path_creation_datetime(self, path):
		return datetime.datetime.fromtimestamp(os.path.getmtime(path))

	def create_file_from(self, dest, frm):
		if not self.isfile(frm):
			raise Exception(f'File {frm} not found')
		with open(dest, 'w') as d:
			for l in self.file_lines_iter(frm):
				d.write(l)
			d.close()

	def create_path(self, path):
		if not os.path.isdir(path):
			os.makedirs(path)

	def get_file_line_range_iter(self, fpath, rg):
		frm, to = rg
		ctr = 0
		for line in self.file_lines_iter(fpath):
			ctr+=1
			if ctr >= frm and ctr <= to:
				yield line
			elif ctr>rg:
				break

	def get_file_nth_line(self, fpath, at):
		return next(self.get_file_line_range_iter(fpath, (at, at)), '')

	def explode(self, path, name_generator, separator):
		try:
			if not self.isfile(path):
				raise Exception(f'Path not found "{path}"')
			name = name_generator()
			dest = open(name, 'w')
			for line in self.file_lines_iter(path):
				if line.rstrip(' \n') == separator:
					dest.close()
					print(f'File "{name}" generated')
					dest = open(name_generator(), 'w')
				else:
					dest.write(line)
			print(f'Deleting original file: {path}')
			os.system(f'rm {path}')
			dest.close()
		except:
			raise Exception(f'Error occurred when exploding file "{path}"')

	@staticmethod
	def instance():
		if FileHandler.__instance is None:
			FileHandler.__instance = FileHandler()
		return FileHandler.__instance
