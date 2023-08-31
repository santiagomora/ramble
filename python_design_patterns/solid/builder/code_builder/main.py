from blocks import Class,If,Elif,Else,For,Method
from conditions import *
from statements import Predicate 
from arguments import Arguments
from decorators import Decorator

cls = Class('MyClass')
cls\
	.decorators.append(
		Decorator('decorta').arguments.append('test').done()
	).append('jola').done()\
	.arguments.append('MyBaseClass')\
		.append('MyOtherBaseClass').done()\
	.definitions.append_method(
			Method('test')\
				.arguments.append('test1').append('test2').done()
				.statements.append_assignment(
					['test','prop'],
					Predicate().append('test').append('test2').append_invokable(Method('test'),['test1','test2']),
					'False'
				).done()\
				.definitions.append_if( 
					If(eq('test',10) | [gt('test',10) & lt('test',15)])\
						.statements.append_return('test').done()
				)\
				.append_elif(
					Elif(eq('test',10) | [gt('test',10) & lt('test',15)])\
						.statements.append_return('test').done()
				).append_else(
					Else()\
						.statements.append_assignment('abc','None').done()
						.definitions.append_for(
							For('test',Predicate().append('test').append('test2').append_invokable(Method('test'),['test1','test2']))\
								.statements.append_assignment('test','test + 1').done()
						).done()\
						.statements.append_return(['test']).done()
				).done()
				#.statements.append_return(['test']).done()
		)\
		.append_method(Method('test2').decorators.append('test').append('test2').done())\
		.append_class(Class('test')).done()
print(cls)
