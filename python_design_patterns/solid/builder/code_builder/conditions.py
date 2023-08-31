from util import Builder, Appendable

class Condition:
	def __init__(self,operation):
		self.compare = operation[0]
		self.operation = operation[1]
		self.to = operation[2]

	def __str__(self):
		return str(self.compare) + f' {self.operation} ' + str(self.to)

	def __and__(self,other):
		if isinstance(other,list):
			other = Group(other[0])
		return And(self,other)

	def __or__(self,other):
		if isinstance(other,list):
			other = Group(other[0])
		return Or(self,other)

class And(Condition):
	def __init__(self,*args):
		self.args = args

	def __str__(self):
		return ' and '.join(str(arg) for arg in self.args)

class Or(Condition):
	def __init__(self,*args):
		self.args = args

	def __str__(self):
		return ' or '.join(str(arg) for arg in self.args)

class Group(Condition):
	def __init__(self,group):
		self.group = group

	def __str__(self):
		return f'({str(self.group)})'

def lt(a,b):
	return Condition((a,'<',b)) 
	
def gt(a,b):
	return Condition((a,'>',b))

def ltEq(a,b):
	return Condition((a,'<=',b))

def gtEq(a,b):
	return Condition((a,'<=',b))

def eq(a,b):
	return Condition((a,'==',b))

def ne(a,b):
	return Condition((a,'!=',b))
