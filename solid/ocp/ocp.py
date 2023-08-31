# OPEN CLOSE PRINCIPLE
# Open for extension but closed for modifications, after writing a particular class we should not modify it, we should extend it
import enum
import json

class Color(enum.Enum): 
    RED=1
    GREEN=2
    BLUE=3
    YELLOW=4
    BLACK=5
    WHITE=6

class Size(enum.Enum): 
    SMALL=1
    MEDIUM=2
    LARGE=3
    
class Product:
    def __init__(self,name,color,size):
        self.name = name
        self.color = color
        self.size = size
# According to instructor 
# this constitutes a violation of the open-close principle. when we add new functionality, we add it by extension, not by modifications
#class ProductFilter: 
    
    #def filter_by_color(self,products,color):
        #for p in products: 
            #if p.color == color: yield p 
            
    #def filter_by_color(self,products,size):
        #for p in products: 
            #if p.size == size: yield p 

# more methods can be added by any criteria, thus this approach does not scale. because we might want to combine the criterias 
# by either one of them (or) or by both of them (and)
# Instructor says new filters should be added by extension 
