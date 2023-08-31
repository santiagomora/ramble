# LISKOV SUBSTITUTION PRINCIPLE
# if we have an interface that works with a base class, we should be stick a derived class and everything should work the same

# Instructor
class Rectangle:
    def __init__(self,width,height):
        self._height = height
        self._width = width
        
    def __str__(self):
        # uses the properties instead of the attributes
        return f'width:{self.width}, height: {self.height}'
    
    @property
    def area(self):
        return self._width*self._height
        
    @property
    def width(self):
        return self._width
    
    @width.setter
    def width(self,value):
        self._width = value

    @property
    def height(self):
        return self._height
        
    @height.setter
    def height(self,value):
        self._height = value

# we will break LSP by making a derived class which does not work with the method use_it
class Square(Rectangle):
    # this class breaks the LSP
    def __init__(self,size):
        Rectangle.__init__(self,size,size)
    
    # instructor claims that these setters violate liskov substitution principles 
    @Rectangle.width.setter
    def width(self,value):
        self._width = self._height = value
        
    @Rectangle.height.setter
    def height(self,value):
        self._height = self._width = value

# as setting height also changes width when using the square, this method only works with rectangles, as rc.width is obsolete when calculating the expected width of a square. So in order to the method use_it to comply with LSP, we should be able to stick in a square (a derived class from the rectangle).
def use_it(rc):
    w = rc.width
    rc.height = 10
    expected = int(w*10)
    print(f'Excpected an area of {expected}, got {rc.area}')
    
rc = Rectangle(2,3)
use_it(rc)
sq = Square(2)
use_it(sq)
# How to solve this situations: 
    # 1.    instructor claims that width and height setters are breaking LSP
    # 2.    instructor claims that there is no need for a Square class, instead a boolean property in Rectangle class would satisfy
    # 3.    we could have a factory method make a square instead of a rectangle
    
# From wikipedia
    #In addition to the signature requirements, the subtype must meet a number of behavioural conditions. These are detailed in a terminology resembling that of design by contract methodology, leading to some restrictions on how contracts can interact with inheritance:

    #Preconditions cannot be strengthened in the subtype.
    #Postconditions cannot be weakened in the subtype.
    #Invariants must be preserved in the subtype.
    
    #A type constructor is 
    #Covariant - method return types in the subtype: order types are preserved: if A <= B then I<A> <= I<B>
    #Contravariant - method parameter types in the subtype. Covariance order is reverted if A <= B then I<B> <= I<A>
    # Bivariant if both apply A <= B then I<A> iff I<B> and A <= B reads as A is a subtype of B
    # Variant if covariant contravariant or bivariant
    # Invariant if not variant
    #New exceptions cannot be thrown by the methods in the subtype, except if they are subtypes of exceptions thrown by the methods of the supertype.

    #For example, in C#, if Cat is a subtype of Animal, then:

    #IEnumerable<Cat> is a subtype of IEnumerable<Animal>. The subtyping is preserved because IEnumerable<T> is covariant on T.
    #Action<Animal> is a subtype of Action<Cat>. The subtyping is reversed because Action<T> is contravariant on T.
    #Neither IList<Cat> nor IList<Animal> is a subtype of the other, because IList<T> is invariant on T.
    #Covariance

        #Canonical examples: IEnumerable<out T>, Func<out T>

        #You can convert from IEnumerable<string> to IEnumerable<object>, or Func<string> to Func<object>. Values only come out from these objects. (but not backwards?)

        #It works because if you're only taking values out of the API, and it's going to return something specific (like string), you can treat that returned value as a more general type (like object).

    #Contravariance

        #Canonical examples: IComparer<in T>, Action<in T>

        #You can convert from IComparer<object> to IComparer<string>, or Action<object> to Action<string>; values only go into these objects.

    #This time it works because if the API is expecting something general (like object) you can give it something more specific (like string).
    #If you have an interface IFoo<T> it can be covariant in T (i.e. declare it as IFoo<out T> if T is only used in an output position (e.g. a return type) within the interface. It can be contravariant in T (i.e. IFoo<in T>) if T is only used in an input position (e.g. a parameter type).
