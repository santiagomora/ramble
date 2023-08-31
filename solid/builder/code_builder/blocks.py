from arguments import HandlesArguments
from decorators import HandlesDecorators
from statements import HandlesStatements,HandlesAssignments
from util import Indentable,HasSignature,Appendable,Invokable
from arguments import Arguments
from definitions import *

class Block(Appendable,
			Indentable,
			HasSignature):
	def __init__(self):
		Indentable.__init__(self)
		HasSignature.__init__(self)
		Appendable.__init__(self)
	
	def __str__(self):
		res = [self.signature()]
		self.offset += 1
		for child in self.members: 
			if isinstance(child,Block):
				child.offset = self.offset
				res.append(str(child))
			else:
				res.append(f'{self.indent}{child}')
		return '\n'.join(res)

class Class(Block,
			Invokable,
			HandlesArguments,
			HandlesAssignments,
			HandlesDecorators,
			HandlesClassDefinitions):
	def __init__(self,name):
		Block.__init__(self)
		HandlesDecorators.__init__(self)
		HandlesArguments.__init__(self)
		HandlesAssignments.__init__(self)
		HandlesClassDefinitions.__init__(self)
		self.name = name

	def signature(self):
		self._decorators.offset = self.offset
		arguments = '' if len(self._arguments) == 0 else f'({self._arguments})'
		if len(self.members) == 0:
			self.members.append('pass')
		return f'{self._decorators}{self.indent}class {self.name}{arguments}:'

	def invoke(self,arguments):
		return f'{self.name}({str(arguments)})'

class HandlesMethodDefinitions:
	class MethodBuilder(ClassDefinitionBuilder,
					MethodDefinitionBuilder,
					IfDefinitionBuilder,
					ForDefinitionBuilder):
		pass

	@property
	def definitions(self):
		return self.MethodBuilder(self)

class Method(Block,
			Invokable,
			HandlesArguments,
			HandlesDecorators,
			HandlesStatements,
			HandlesMethodDefinitions):
	def __init__(self,name):
		Block.__init__(self)
		Invokable.__init__(self)
		HandlesArguments.__init__(self)
		HandlesDecorators.__init__(self)
		HandlesStatements.__init__(self)
		HandlesMethodDefinitions.__init__(self)
		self.name = name

	def signature(self):
		self._decorators.offset = self.offset
		if len(self.members) == 0:
			self.members.append('pass')
		return f'{self._decorators}{self.indent}def {self.name}({str(self._arguments)}):'  

	def invoke(self,args):
		return f'{self.name}({str(args)})'

class If(Block,
		HandlesStatements,
		HandlesIfDefinitions):
	def __init__(self,condition):
		Block.__init__(self)
		HandlesStatements.__init__(self)
		HandlesIfDefinitions.__init__(self)
		self.condition = condition

	def signature(self):
		return f'{self.indent}if {str(self.condition)}:'

class Elif(Block,
		HandlesStatements,
		HandlesIfDefinitions):
	def __init__(self,condition):
		Block.__init__(self)
		HandlesStatements.__init__(self)
		HandlesIfDefinitions.__init__(self)
		self.condition = condition

	def signature(self):
		return f'{self.indent}elif {str(self.condition)}:'

class Else(Block,
		HandlesStatements,
		HandlesIfDefinitions):
	def __init__(self):
		Block.__init__(self)
		HandlesStatements.__init__(self)
		HandlesIfDefinitions.__init__(self)

	def signature(self):
		return f'{self.indent}else:'

class For(Block,
		HandlesStatements,
		HandlesForDefinitions):
	def __init__(self,name,predicate):
		Block.__init__(self)
		HandlesStatements.__init__(self)
		HandlesForDefinitions.__init__(self)
		self.name = name
		self.predicate = predicate

	def signature(self):
		return f'{self.indent}for {self.name} in {str(self.predicate)}:'
