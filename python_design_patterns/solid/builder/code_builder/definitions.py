from util import Builder 

class IfDefinitionBuilder(Builder):
	def append_if(self,if_block):
		self.obj.members.append(if_block)
		return self

	def append_elif(self,elif_block):
		self.obj.members.append(elif_block)
		return self

	def append_else(self,else_block):
		self.obj.members.append(else_block)
		return self

class ClassDefinitionBuilder(Builder):
	def append_class(self,class_block):
		self.obj.members.append(class_block)
		return self
		
class MethodDefinitionBuilder(Builder):
	def append_method(self,function_block):
		self.obj.members.append(function_block)
		return self
		
class ForDefinitionBuilder(Builder):
	def append_for(self,for_block):
		self.obj.members.append(for_block)
		return self
	
class HandlesClassDefinitions:
	class ClassBuilder(ClassDefinitionBuilder,
					MethodDefinitionBuilder):
		pass

	@property
	def definitions(self):
		return self.ClassBuilder(self)

class HandlesIfDefinitions:
	class IfBuilder(ClassDefinitionBuilder,
					MethodDefinitionBuilder,
					IfDefinitionBuilder,
					ForDefinitionBuilder):
		pass

	@property
	def definitions(self):
		return self.IfBuilder(self)

class HandlesForDefinitions:
	class ForBuilder(IfDefinitionBuilder,
					ForDefinitionBuilder):
		pass

	@property
	def definitions(self):
		return self.ForBuilder(self)