# instructor
# we want to build a more complicated object, we might want to use more than one builder
# we want to build a person
# a person might have two different aspects: an address and its job information 
class Person: 
    def __init__(self):
        # street_address
        self.street_address = None
        self.postcode = None
        self.city = None
        # employment
        self.company_name = None
        self.position = None
        self.annual_income = None
    
    def __str__(self):
        return f'Address:\n\tstreet address: {self.street_address}\n\tpostcode: {self.postcode}\n\tcity: {self.city}\n'+\
            f'Employment:\n\tworks at: {self.company_name}\n\tas a: {self.position}\n\tearning: {self.annual_income}'
        
class PersonBuilder:
    # this allows the builder to have an instance to work with, and not worrying about instantiation of the person object
    def __init__(self,person = Person()):
        self.person = person
    
    # returns the Jobbuilder so that user can start to use its inner methods
    @property
    def works(self):
        return PersonJobBuilder(self.person)
    
    # returns the Addressbuilder so that user can start to use its inner methods
    @property
    def lives(self):
        return PersonAddressBuilder(self.person)
    
    def build(self):
        return self.person 
    
# we can define the sub builder: one for the employment information and another one for the address
class PersonJobBuilder(PersonBuilder):
    def __init__(self,person):
        super().__init__(person)
        
    def at(self,company_name):
        self.person.company_name = company_name
        return self
    
    def as_a(self,position):
        self.person.position = position
        return self
        
    def earning(self,annual_income):
        self.person.annual_income = annual_income
        return self
       

class PersonAddressBuilder(PersonBuilder):
    def __init__(self,person):
        super().__init__(person)
        
    def at(self,street_address):
        self.person.street_address = street_address
        return self
    
    def with_postcode(self,postcode):
        self.person.postcode = postcode
        return self
        
    def in_city(self,city):
        self.person.city = city
        return self

print('NOT OCP compliant')
pb = PersonBuilder()
person = pb\
            .lives.at('123 London Road').in_city('London').with_postcode('SW12BC')\
            .works.at('Fabrikam').as_a('Engineer').earning(120000)\
            .build()
print(person)
#this approach violates open close principle as we are not using inheritance to perform changes. Whenever we had a new subbuilder, we had to add it to the main builder
# using inheritance to add new features:

class PersonJobBuilderInterface:
    @property
    def works(self):
        return PersonJobBuilder(self.person)
    

class PersonAddressBuilderInterface:
    @property
    def lives(self):
        return PersonAddressBuilder(self.person)
    
class OCPCompliantPersonBuilder(PersonJobBuilderInterface,
                                PersonAddressBuilderInterface):
    
    def __init__(self,person = Person()):
        self.person = person
    
    def build(self):
        return self.person 

print('\nOCP compliant')
opb = OCPCompliantPersonBuilder()
operson = opb\
            .lives.at('123 London Road').in_city('London').with_postcode('SW12BC')\
            .works.at('Fabrikam').as_a('Engineer').earning(120000)\
            .build()
print(operson)

# we can also define an inheritance chain PersonBuilder <- PersonJobBuilder(PersonBuilder) <- PersonAddressBuilder(PersonJobBuilder) this way PersonAddressBuilder would be the most complete builder
