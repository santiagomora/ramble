# Dependency Inversion Principle
# High level modules should only depend on abstractions instead of depending directly from low level modules, we should depend on interfaces instead of concrete implementations
# Genealogy research
import enum 
from abc import ABCMeta, abstractmethod

class Relationship(enum.Enum):
    PARENT=0
    CHILD=1
    SIBLING=2
    
class Person:
    def __init__(self,name):
        self.name = name
        
class RelationshipBrowser:
    # finds all children of someone given the name 
    @abstractmethod
    def find_all_children_of(self,name):
        pass
    
class Relationships(RelationshipBrowser): 
    # low level module, uses functionality much closer to hardware (storage)
    # we want to store all different relations
    # relations is the way Relationships module stores the data, at the moment is a list, if we change it to another structure all the code would break, we should provide utility methods in this low level module so that changes on the underlying structures wont break high level implementations
    def __init__(self):
        self.relations = []
        
    def add_parent_and_child(self,parent,child):
        self.relations.append((parent,Relationship.PARENT,child))
        self.relations.append((child,Relationship.CHILD,parent))
    
    # implementation of RelationshipBrowser interface 
    # we provide an interface to research given the actual relations structure
    # client will not notice underlying structure changes
    def find_all_children_of(self,name):
        for r in relationships.relations:
            if r[0].name == name and r[1] == Relationship.PARENT: 
                yield r[2].name
        
        
# we define a high level module: uses a functionality much closer to hardware
# should not depend on internal mechanics of low level modules we should rely on abstractions
class Research: 
    # we attempt to query on relations
    def __init__(self,browser):
        for p in browser.find_all_children_of('John'):
            print(f'John has a child called {p}')
                
parent = Person('John')
child1 = Person('Chris')
child2 = Person('Matt')

relationships = Relationships()
relationships.add_parent_and_child(parent,child1) 
relationships.add_parent_and_child(parent,child2)    

Research(relationships)
