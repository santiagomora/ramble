# SEPARATION OF CONCERNS
# class should take only one responsibility
import re 
from soc_persistence import PersistsByLine

class Journal(PersistsByLine):
    
    def __init__(self):
        self.entries = [];
        self.count = 0;
        
    def add_entry(self,text):
        self.count+=1;
        self.entries.append(f'{self.count}: {text}');
        
    def __str__(self):
        return '\n'.join(self.entries)
    
    def read_line(self,line):
        self.add_entry(re.sub(r'^\d+:\s*|\n$','',line));
    
    ## should not belong in class implementation
        # now our journal not only manages the internal state of the object but also provides persistency and reading from particular resources
        # other types might also need persistency and it would not be good design to have each one of them manage their own persistence methods, also each one of them might perform tasks related to check the filesystem itself, this means each class must perform the same task over and over, hence leading to bulk code. furthermore, changing the save method or load method would imply to change each one of the classes that implements it.
    
        # we want to take out the persistency management from each class
        #def save(self,filename):
            #file = open(filename,'w');
            #file.write(str(self));
            #file.close();d
        
        #@staticmethod 
        #def load(filename):
            #j = Journal();
            #with open(filename) as jfile: 
                #for line in jfile: 
                    #j.add_entry(re.sub(r'^\d+:\s*|\n$','',line))
            #return j;
        
        #def load_from_web(self,uri):
            #pass
    ## should not belong in class implementation

# Instructor proposes PersistenceHandler
class PersistenceHandler: 
    # Antipattern: god object, everything in a single class, prevented by SOC. By separation of concerns a class should have a single reason to change and that change must be related to its resposibility
    @staticmethod
    def save_to_file(journal,filename):
        file = open(filename,'w');
        file.write(str(journal));
        file.close();
    
j = Journal();
j.add_entry('test 1');
j.add_entry('test 2');
j.add_entry('test 3');
j.add_entry('test 4');
print(f'Journal entries:\n{j}');
j.save('soc_test_journal')
cp = Journal()
cp.load('sco_test_journal');
print(f'Copy Journal entries:\n{cp}');

