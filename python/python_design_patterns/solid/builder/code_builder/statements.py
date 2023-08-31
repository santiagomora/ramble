from util import Appendable, Builder
from arguments import Arguments

class Assignment:
	def __init__(self,*args):
		if len(args) <= 1: 
			raise Exception('Not enough arguments for assignment')
		self.args = args

	def __str__(self):
		return ' = '.join(str(a) for a in self.args)

class Invoke:
	def __init__(self,invokable,args):
		self.invokable = invokable
		self.args = Arguments.instance_from(args)

	def __str__(self):
		return self.invokable.invoke(self.args)

class Return:
	def __init__(self,value):
		self.value = value

	def __str__(self):
		return f'return {str(self.value)}'

class Predicate(Appendable):
	def append(self,member):
		self.members.append(member)
		return self
	
	def append_members(self,*args):
		for arg in args:
			self.append(arg)
		return self

	def append_invokable(self,invokable,args):
		self.append(Invoke(invokable,args))
		return self

	@staticmethod
	def instance_from(arglist):
		pred = Predicate()
		for arg in arglist:
			pred.append(arg)
		return pred

	def __str__(self):
		return '.'.join(str(arg) for arg in self.members)

class AssignmentBuilder(Builder):
	def append_assignment(self,*args):
		predicates = []
		for arg in args:
			predicates.append( 
				arg if isinstance(arg,Predicate) else Predicate.instance_from(
					arg if isinstance(arg,list) else [arg]
				) 
			)
		self.obj.append_statement(Assignment(*predicates))
		return self

class StatementBuilder(AssignmentBuilder):
	def append_procedure(self,pred):# deberia tener algun method call
		if not isinstance(pred,Predicate):
			pred=Predicate(*pred)
		self.obj.append_statement(pred)
		return self

	def append_return(self,pred):
		if not isinstance(pred,Predicate): #es arreglo
			pred=Predicate.instance_from(pred if isinstance(pred,list) else [pred])
		self.obj.append_statement(Return(pred))
		return self

class HandlesStatements:
	@property
	def statements(self):
		return StatementBuilder(self)
	
	def append_statement(self,statement):
		self.members.append(statement)

class HandlesAssignments:
	@property
	def assignments(self):
		return AssignmentBuilder(self)
	
	def append_assignment(self,assignment):
		self.members.append(assignment)

