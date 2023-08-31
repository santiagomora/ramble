# Interface Segregation Principle
# the problem at hand is that we dont really want to stick too many methods into an interface
# We might be tempted to define a single interface that englobes all functionality and let clients implement it however they want

# Instructor
class Machine 

    def print(self,document):
        raise NotImplementedError
        
    def fax(self,document):
        raise NotImplementedError
    
    def scan(self,document):
        raise NotImplementedError


class MultiFunctionPrinter(Machine):

    def print(self,document):
        pass
    
    def fax(self,document):
        pass
    
    def scan(self,document):
        pass

# Consider we can only work with Machine interface, but an on fashioned printer cant scan!!
class OldFashinedPrinter(Machine):

    def print(self,document): # ok add meaningful implementation
        pass
    
    def fax(self,document): # old fashioned printer cant fax
        pass # noop
    
    def scan(self,document): # old fashioned printer cant scan
        #pass #we can do nothing but this method would still be callable and client might still expect it to do something as it is defined as part of the interface
        raise NotImplementedError('Printer cannot scan!') # we can raise an exception, maybe its okay if its easy to debug in the context its being used, but consider this will crash the application


# The Interface Segregation Principle encourages granularity in interface definition
# We can break machine Interface into three different Interfaces: 

class Printer:
    @abstractmethod
    def print(self,document):
        pass

class Fax:
    @abstractmethod
    def fax(self,document):
        pass

class Scanner:
    @abstractmethod
    def scan(self,document):
        pass
    
# using the granular interfaces    
class MyPrinter(Printer):
    def print(self,document):
        pass

# using the granular interfaces    
class Photocopier(Scanner,Printer):
    def print(self,document):
        pass
    def scan(self,document):
        pass
    
class MyMultiFunctionDevice(Scanner,Printer):
    @abstractmethod
    def print(self,document):
        pass
    @abstractmethod
    def scan(self,document):
        pass
    
class MyMultiFunctionMachine(MyMultiFunctionDevice):
    def __init__(self,printer,scanner):
        self.scanner = scanner
        self.printer = printer
        
    def print(self,document):
        self.printer.print(document)
        
    def scan(self,document):
        self.scanner.scan(document)
        
#  Bulky interfaces forces user to implement methods he might not even need, API is less clear as functions not implemented still appear in the definition of the class
