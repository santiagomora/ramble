# persistence handler, I propose this singleton to handle instance storage in filesystem
# class must implement __str__ method defined
import enum

class FileReadStrategy(enum.Enum): 
    CHUNK=1
    LINE=2
    
class PersistenceHandler:
    # could support various exchange formats
    @staticmethod 
    def instance():
        if not hasattr(PersistenceHandler,'__instance'):
            PersistenceHandler.__instance = PersistenceHandler();
        return PersistenceHandler.__instance
    
    def save(self,filename,class_instance):
        with open(filename,'w') as f:
            f.write(str(class_instance));
            f.close();

    def load_by_line(self,filename,obj): # returns Persists instance
        with open(filename,'r') as jfile: 
            for line in jfile:
                obj.read_line(line)
        return obj;
    
    def load_by_chunk(self,filename,obj): # returns Persists instance
        with open(filename,'r') as jfile: 
            while True: 
                data = jfile.read(obj.get_chunk_size())
                if not data:
                    break;
                obj.read_chunk(data);
        return obj;
    
    def load(self,filename,instance,strategy):
        if strategy == FileReadStrategy.CHUNK:
            return self.load_by_chunk(filename,instance);
        elif strategy == FileReadStrategy.LINE:
            return self.load_by_line(filename,instance);
        else: 
            raise Exception('Unknown strategy')

    def load_from_web(self,uri):
        pass

# injects proxy capabilities to child classes
class Persists:
    
    def save(self,filename):
       PersistenceHandler.instance().save(filename,self); 
    
    def load(self,filename):
       PersistenceHandler.instance().load(filename,self,self.get_persistence_strategy()); 
       
    def get_persistence_strategy(self):
        raise Exception('Not implemented')
    
    def load_from_web(self,uri):
        pass

class PersistsByChunk(Persists):
    
    def get_persistence_strategy(self):
        return FileReadStrategy.CHUNK
    
    def get_chunk_size():
        raise Exception('Not implemented')
    
    def read_chunk():
        raise Exception('Not implemented')

class PersistsByLine(Persists):
    
    def get_persistence_strategy(self):
        return FileReadStrategy.LINE
    
    def read_line():
        raise Exception('Not implemented')
    
