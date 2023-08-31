# the problem at hand: we wish to construct html entities
text = 'hello'
parts = ['<p>',text,'</p>']
print(''.join(parts))

# more complex scenario, make a html list out of a list of words
words = ['hello','world']
parts = ['<ul>']
for w in words: 
    parts.append(f'\t<li>{w}</li>')
parts.append('</ul>')
print('\n'.join(parts))

# we need to outsource the generation of html to a builder
# it would be nice to give it an object oriented approach where each html entity is represented by a class
# by instructor
class HtmlElement:
    indent_size = 2
    
    def __init__(self,name = '', text=''):
        self.text = text
        self.name = name
        self.elements = []
        
    def __str(self,indent):
        lines = []
        i = ' ' * (indent*self.indent_size)
        lines.append(f'{i}<{self.name}>')
        
        if self.text: 
            i1=' ' * ((indent+1)*self.indent_size)
            lines.append(f'{i1}{self.text}')
    
        for e in self.elements:
            lines.append(e.__str(indent+1))
        
        lines.append(f'{i}</{self.name}>')
        
        return '\n'.join(lines)

    def __str__(self):
        return self.__str(0)

# Once we define the Underlying object structure, we can define the builder
# the builder is an API that's going to help us build the underlying object structure
class HtmlBuilder:
    def __init__(self,root_name):
        #root_name is the name of the top level html element
        #root is the thing we are building up, the API is defined to help us build the html tree using this element as the base or root node
        self.root_name = root_name
        self.__root = HtmlElement( root_name )
    
    def __str__(self):
        # we define the __str__ method so that users can access the object we are building up
        return str(self.__root)
    
    def add_child(self,child_name,child_text):
        self.__root.elements.append( 
            HtmlElement( child_name, child_text ) 
        )
        # if we return self from the method, we can make this a fluent interface
        return self
    
    @staticmethod
    def create(name):
        # gives us an alternative to create the builder
        return HtmlBuilder(name);
        
builder = HtmlBuilder.create('ul')
builder\
    .add_child('li','hello')\
    .add_child('li','world')
print('Ordinary builder:')
print(builder)
