from note_handler import NoteHandler
from file_handler import FileHandler
import sys

def main(options):
	nh = NoteHandler.instance()
	FileHandler.instance().create_path(NoteHandler.BASE_DIR)
	if len(options) < 2:
		raise Exception('invalid parameters')
	if options[0] == 'view-notes': # debo recibir tema
		if options[1] == '':
			raise Exception('view-notes: expects parameter 1 to be a note theme')
		try:
			nh.show_note_contents(options[1])
		except:
			nh.show_theme_contents(options[1])
	elif options[0] == 'add-note':
		if options[1] == '':
			raise Exception('add-note: expects parameter 1 to be a note theme')
		nh.add(options[1])
	elif options[0] == 'edit-note':
		if options[1] == '':
			nh.edit_at('', 1)
		else:
			opt = options[1].split('-')
			if len(opt) == 1:
				nh.edit(opt[0])
			else:
				nh.edit_at(opt[0], 1 if len(opt)<=1 or opt[1] == '' else int(opt[1]))
	elif options[0] == 'list-notes':
		if options[1] is None:
			raise Exception('list-notes: expects parameter 1 to be a note theme or empty to list all themes')
		if options[1] == '':
			nh.list_themes()
		else:
			nh.list_notes(options[1])
	elif options[0] == 'explode':
		if len(options) != 2:
			raise Exception('explode-note: expects parameter 1 to be a note and parameter 2 a file separator')
		nh.explode(options[1])
	elif options[0] == 'group-into-theme':
		if len(options)<= 2:
			raise Exception('group-into-theme: expects parameter 1 to be a note theme and files from which the notes will be created')
		nh.group_files_into_notes(options[1], options[2:])
	else:
		raise Exception(f'note.py: Action not found {options[1]}')

if __name__ == '__main__':
	main(sys.argv[1:])
