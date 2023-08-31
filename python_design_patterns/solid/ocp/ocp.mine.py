import enum,json
# My approach:
class ChainageType(enum.Enum):
    # Chainage type
    OR=1
    AND=2

class Chainer(): 
    
    def __init__(self):
        self.chain = []
    
    def _and(self, *args):
        self.chain.append((ChainageType.AND, *args))
        return self
    
    def _or(self, *args):
        self.chain.append((ChainageType.OR, *args))
        return self
    
    def complies(self,product):
        res = None
        for condition in self.chain:
            if condition[0] == ChainageType.OR:
                complies = any( map( lambda crit: crit.complies(product), condition[1:] ) )
                res = complies if res is None else res or complies
            elif condition[0] == ChainageType.AND:
                complies = all( map( lambda crit: crit.complies(product), condition[1:] ) )
                res = complies if res is None else res and complies
            else: 
                raise Exception('Unknown chainage')
        return res


class FilterCriteria: 
    def complies(self,product):
        raise Exception('Not implemented')


class ColorCriteria(FilterCriteria):
    def __init__(self,color):
        self.color = color 
        
    def complies(self,product):
        return product['color'] == self.color


class SizeCriteria(FilterCriteria):
    def __init__(self,size):
        self.size = size 
        
    def complies(self,product):
        return product['size'] == self.size


class PriceLtEqCriteria(FilterCriteria):
    def __init__(self,price):
        self.price = price 
        
    def complies(self,product):
        return product['price'] <= self.price

class PriceGtEqCriteria(FilterCriteria):
    def __init__(self,price):
        self.price = price 
        
    def complies(self,product):
        return product['price'] >= self.price

class ProductFilter: 
    @staticmethod
    def filter_by(products,criteria):
        for p in products: 
            if criteria.complies(p): 
                yield p

with open('ocp_products.json','r') as j:
    products = json.load(j) 

blackCriteria = ColorCriteria("black")
blueCriteria = ColorCriteria("blue")
yellowCriteria = ColorCriteria("yellow")
largeCriteria = SizeCriteria("large")
mediumCriteria = SizeCriteria("medium")
smallCriteria = SizeCriteria("small")
gtCriteria = PriceGtEqCriteria(9)
ltCriteria = PriceLtEqCriteria(17)

print('ALL PRODUCTS:')
for p in products:
    print(p)

print('FILTERED PRODUCTS (MINE):')
for p in ProductFilter.filter_by( products, Chainer()._or(blackCriteria,Chainer()._and(yellowCriteria,largeCriteria))._or(blueCriteria) ):
    print(p)


class Or(): 
    
    def __init__(self,*args):
        self.chain = args
    
    def complies(self,product):
        return any( map( lambda crit: crit.complies(product), self.chain ) )

class And(): 
    
    def __init__(self,*args):
        self.chain = args
    
    def complies(self,product):
        return all( map( lambda crit: crit.complies(product), self.chain ) )

print('FILTERED PRODUCTS (MINE - V2):')
for p in ProductFilter.filter_by( products, Or( blackCriteria, And( yellowCriteria, largeCriteria ), blueCriteria ) ):
    print(p)
# What happened? First my solution wasn't working properly. chainer was not build to support successive method calls chain(...).chain(...) as it was always pointing to one criteria. It became clear that a list structure would be needed. The criterias should not be tested individually but by groups. Chainer infraestructure became an array of And/Or groups to be processed at once with all/any helpers, then i realized that using And and Or classes would be easier to write per the instructor's resolution (seems like the most simple way). It made no sense to test each criteria individually
