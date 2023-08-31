from enum import Enum
from math import * 
#We use factories when object creation logic becomes too convoluted
#	- initializer is not descriptive, the name is always __init__: cant give out hints about what it actually does
#	- cannot overload with same sets of arguments with different names: same arguments with different names
#	- can turn into 'optional parameter hell': you can have a lot of arguments which can be optional and others default values, we might want to model relations between arguments

#Wholesale object creation (not piecewise, unlike Builder) can be outsourced to:
#	- Factory method, a static method that handles object creation
#	- They may exist in a separate class (Factory) that handles instance creation.
#	- We can define a class hierarchy AbstractFactory

#Factory: a component responsible solely for the wholesale (not piecewise) creation of objects.

# Factory Methods
class Point: 
	def __init__(self,x,y):
		self.x = x
		self.y = y
	# we want to initialize it from polar coordinates
	# def __init__(self,rho,theta): not possible

# we can pass in the coordinate system we want to build the class in
class CoordinateSystem(Enum):
	CARTESIAN = 1
	POLAR = 2
class Point: 
	# this breaks the open close principle as we have to change the class to add a new option, both the enum and the point implementation
	def __init__(self,a,b,system = CoordinateSystem.CARTESIAN):
		if system == CoordinateSystem.CARTESIAN: 
			self.x = a
			self.y = b
		elif system == CoordinateSystem.POLAR: 
			self.x = a*cos(b)
			self.y = a*sin(b)

# with factory methods
class Point:	
	def __init__(self,x,y):
		self.x = x
		self.y = y
	@staticmethod
	def from_cartesian(x,y): 
		return Point(x,y)
	@staticmethod
	def from_polar(rho,theta): 
		return Point(rho*cos(theta),rho*sin(theta))

	def __str__(self):
		return f'(x:{self.x}, y:{self.y})'

# a factory method is a method that build an object
# this way implementation of different arguments stays in static methods instead of making a god like constructor 
print(Point.from_polar(1,2))
print(Point.from_cartesian(1,2))

# Factory 
# is an implementation of the single responsibility principle or the separation of concerns
# once there is too many factory methods in the class it might make sense to move them out of the class or group them somehow into an separate entity
# if point initializer changes we must change all factory static methods
# there is an intrinsic relation between the factory and the object
# the client wont know a priori that the factory exists as they will think the __init__ method is available
# we can specify that there is a factory available in the docs
# we can define the factory as an inner class (this is useful with languages that can define private constructors, as constructor could be private and accessible only by inner factory class)
class PointFactory:
	# these can also be static methods
	# this implementation is useful if we need to store some sort of state
	def from_cartesian(self,x,y): 
		return Point(x,y)
	def from_polar(self,rho,theta): 
		return Point(rho*cos(theta),rho*sin(theta))

print(PointFactory().from_polar(1,2))
print(PointFactory().from_cartesian(1,2))

# we can define pointfactory as an inner class 
# this way PointFactory is a singleton 
class Point:	
	class PointFactory:
		# these can also be static methods
		# this implementation is useful if we need to store some sort of state
		def from_cartesian(self,x,y): 
			return Point(x,y)
		def from_polar(self,rho,theta): 
			return Point(rho*cos(theta),rho*sin(theta))
	factory = PointFactory()
	def __init__(self,x,y):
		self.x = x
		self.y = y
	def __str__(self):
		return f'(x:{self.x}, y:{self.y})'

# to access it: Point.factory
print(Point.factory.from_polar(1,2))
print(Point.factory.from_cartesian(1,2))

# Abstract factory 
# Vending machine
# if we have a hierarchy of types, we can have a hierarchy of abstract factories
from abc import ABC #AbstractBaseClass
class HotDrink(ABC):
	def consume(self):
		pass

class Tea(HotDrink):
	def consume(self):
		print('This tea is delicious')

class Coffee(HotDrink):
	def consume(self):
		print('This coffee is delicious')

class HotDrinkFactory(ABC):
	def prepare(self,amout):
		pass

class TeaFactory(HotDrinkFactory):
	def prepare(self,amout):
		print(f'Put in tea bag, boil water,'
			f' pour {amount}ml ,enjoy')
		return Tea()

class CoffeeFacory(HotDrinkFactory):
	def prepare(self,amout):
		print(f'Grind some beans, boil water,'
			f' pour {amount}ml ,enjoy')
		return Coffee()

def make_drink(type):
	if type == 'tea':
		return TeaFactory.prepare(200)
	if type == 'coffee':
		return CoffeeFactory.prepare(50)
	else:
		return None
# how does somebody make a drink
entry = input('What kind of drink would you like?')
drink = make_drink(entry)
drink.consume()
# we want to make the vending machine
class HotDrinkMachine:
	class AvailableDrinks(enum.Enum): # although it breaks open close principle
		COFFEE = auto()
		TEA = auto()
	factories = []
	initialized = False
	def __init__(self):
		if not self.initialized: 
			self.initialized = True
			for d in self.AvailableDrinks: # looping through enum
				name = d.name[0] + d.name[1:].lower()
				factory_name = name + 'Factory'
				factory_instance = eval(factory_name)()
				self.factories.append((name,factory_instance))
	def make_drink(self):
		print('Available Drinks:')
		for f in self.factories: 
			print(f[0])
		s = input(f'Please pick a drink (0-{len(self.factories)-1})')
		idx = int(s)
		s = input(f'Specify amount:')
		amount = int(s)
		return self.factories[idx][1].prepare(amount)

hdm = HotDrinkMachine()
hdm.make_drink()