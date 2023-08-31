const {ObjectId} = require('mongodb');

class LibraryHandler {
  defaultBook = {
    title: "",
    comments:[],
    commentcount:0
  }

  createBook = async (collection,res,body) => 
  {
    try 
    {
      const newBook = {
        ...this.defaultBook,
        title:body.title
      };
      const book = await collection.insertMany([newBook])
      if(book.acknowledged && book.insertedCount>0)
      {
        return res.status(200).json({title:newBook.title,_id:book.insertedIds[0]})
      }
      throw {}
    }
    catch(e)
    {
      return res.status(200).send('Could not create book')
    }
  }

  queryBooks = async (collection,res,query) => 
  {
    try 
    {
      const books = await collection.find(query).toArray()
      return res.status(200).json(books)
    }
    catch(e)
    {
      return res.status(200).send('could not query')
    }
  }

  querySingleBook = async (collection,res,query) => 
  {
    try 
    {
      if(query._id)
      {
        query._id = ObjectId(query._id)
      }
      const books = await collection.find(query).toArray()
      if(books.length>0)
      {
        return res.status(200).json(books[0])
      }
      throw {}
    }
    catch(e)
    {
      return res.status(200).send('no book exists')
    }
  }

  createBookComments = async (collection,res,query,newComments) =>
  {
    try 
    {
      if(query._id)
      {
        query._id = ObjectId(query._id)
      }
      const updateBook = await collection.findOneAndUpdate(
        query,
        {
          $addToSet:{comments:{$each:newComments}},
          $inc:{commentcount:1}
        },
        {returnDocument: 'after'}
      )
      if(updateBook.ok && updateBook.value)
      {
        return res.status(200).json(updateBook.value)
      }
      throw {}
    }
    catch(e)
    {
      return res.status(200).send('no book exists')
    }
  }

  deleteAllBooks = async (collection,res) => 
  {
    try 
    {
      const deleted = await collection.drop()
      if(deleted)
      {
        return res.status(200).send('complete delete successful')
      }
      throw {}
    }
    catch(e)
    {
      return res.status(200).send('could not delete all books')
    }
  }

  deleteSingleBook = async (collection,res,query) => 
  {
    try 
    {
      if(query._id)
      {
        query._id = ObjectId(query._id)
      }
      const deleted = await collection.deleteOne(query)
      if(deleted.acknowledged && deleted.deletedCount>0)
      {
        return res.status(200).send('delete successful')
      }
      throw {}
    }
    catch(e)
    {
      return res.status(200).send('no book exists')
    }
  }

  
}

module.exports = new LibraryHandler()