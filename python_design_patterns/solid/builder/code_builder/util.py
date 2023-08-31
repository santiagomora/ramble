class Indentable:
	def __init__(self,offset=0):
		self._offset = offset
		self.ichar = '\t'

	@property
	def offset(self):
		return self._offset

	@offset.setter
	def offset(self,offset):
		self._offset = offset

	@property
	def indent(self):
		return self.offset*self.ichar

class Invokable:
	def invoke(self,arguments):
		raise NotImplementedError

class Builder:	
	def __init__(self,obj):
		self.obj = obj

	def done(self):
		return self.obj

class Appendable: 
	def __init__(self):
		self.members = []

	def __len__(self):
		return len(self.members)

	def append(self,member):
		raise NotImplementedError

	def __str__(self):
		raise NotImplementedError

class HasSignature:
	def signature(self):
		raise NotImplementedError