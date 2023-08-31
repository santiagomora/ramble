# Instructor encourages Enterprise pattern: Specification 
import enum,json
class Specification: 
    # determines whether a particular item satisfies a particular criteria
    def is_satisfied(self,item):
        #this method is meant to be overridden
        pass

    # we want to override the & operator 
    def __and__(self,other):
        return AndSpecification(self,other)

    # we want to override the | operator     
    def __or__(self,other):
        return OrSpecification(self,other)

class Filter: 
    # doesnt specify any criteria, this class is also meant to be extended 
    # spec is meant to be a instance of Specification
    def filter(self,items,spec): 
        # applies a certain spec to a set of items
        pass

class ColorSpecification(Specification):

    def __init__(self,color):
        self.color = color

    def is_satisfied(self,item):
        return item['color'] == self.color

class SizeSpecification(Specification):

    def __init__(self,size):
        self.size = size

    def is_satisfied(self,item):
        return item['size'] == self.size

class BetterFilter(Filter):
    def filter(self,items,spec):
        for item in items: 
            if spec.is_satisfied(item):
                yield item

class AndSpecification(Specification):
    # combines specifications by and 
    # receives a variable quantity of arguments
    def __init__(self,*args):
        self.args = args

    # ensures all specifications are satisfied
    def is_satisfied(self,item):
        return all( map( lambda spec: spec.is_satisfied(item), self.args ) )
    
class OrSpecification(Specification):
    # combines specifications by and 
    # receives a variable quantity of arguments
    def __init__(self,*args):
        self.args = args

    # ensures all specifications are satisfied
    def is_satisfied(self,item):
        return any( map( lambda spec: spec.is_satisfied(item), self.args ) )

with open('ocp_products.json','r') as j:
    products = json.load(j) 

blackSpec = ColorSpecification("black")
blueSpec = ColorSpecification("blue")
yellowSpec = ColorSpecification("yellow")
largeSpec = SizeSpecification("large")
mediumSpec = SizeSpecification("medium")

print('ALL PRODUCTS:')
for p in products:
    print(p)

print('FILTERED PRODUCTS (INSTRUCTOR):')
bf = BetterFilter()
for p in bf.filter( products, blackSpec | ( largeSpec & yellowSpec ) | blueSpec ):
    print(p)
