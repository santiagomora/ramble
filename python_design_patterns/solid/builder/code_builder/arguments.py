from util import Indentable, Builder, Appendable

class Argument: 
	def __init__(self,name,arg_type=''):
		self.name = name
		self.arg_type = arg_type

	def __str__(self):
		if self.arg_type != '':
			return f'{self.name}:{self.arg_type}'
		return self.name

class Arguments(Appendable):
	def append(self,name,arg_type=''):
		self.members.append(Argument(name,arg_type))

	def __str__(self):
		return ', '.join(str(arg) for arg in self.members)

	@staticmethod
	def instance_from(args):
		arguments = Arguments()
		for arg in args:
			if isinstance(arg,tuple):
				arguments.append(arg[0],arg[1])
			else:
				arguments.append(arg)
		return arguments


class ArgumentBuilder(Builder):
	argc = None 
	def append(self,arg): 
		if not self.argc is None and self.argc <= len(self.obj._arguments):
			raise Exception('Invalid argument quantity')
		self.obj._arguments.append(arg)
		return self
	
class HandlesArguments: # Provides ArgumentBuilder functionality to objects
	argc = None
	def __init__(self):
		self._arguments = Arguments()

	@property
	def arguments(self):
		builder = ArgumentBuilder(self);
		builder.argc = self.argc
		return builder
