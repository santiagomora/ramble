from util import Indentable, Builder, Appendable
from arguments import HandlesArguments

class Decorator(HandlesArguments):
	def __init__(self,name):
		HandlesArguments.__init__(self)
		self.name = name

	def __str__(self):
		return f'@{self.name}' if len(self._arguments)<=0 else f'@{self.name}({str(self._arguments)})'
	
class Decorators(Appendable,
				 Indentable):
	def __init__(self):
		Appendable.__init__(self)
		Indentable.__init__(self)

	def append(self,decorator):
		self.members.append( 
			decorator if isinstance( decorator, Decorator ) else Decorator( decorator ) 
		)

	def __str__(self):
		return '\n'.join( f'{self.indent}{dec}' for dec in self.members )+'\n' if len(self.members)>0 else ''
	
class DecoratorBuilder(Builder): 
	def append(self,decorator):
		self.obj._decorators.append(decorator)
		return self
	
class HandlesDecorators:
	def __init__(self):
		self._decorators = Decorators()

	@property
	def decorators(self):
		return DecoratorBuilder(self)
