/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const libraryHandler = require('./libraryHandler.js')

const validator = require('./validator.js');

const BOOK_COLLECTION_NAME = 'books';

const DB_NAME = process.env.DB_NAME;

module.exports = function (app,client) 
{

  const db = client.db(DB_NAME)

  app.route('/api/books')
    .get(
      async function (req, res)
      {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        return await libraryHandler.queryBooks(db.collection(BOOK_COLLECTION_NAME),res,req.query||{})
      }
    )
    
    .post(
      validator.verifyBody(['title'],'missing required field title'),
      async function (req, res)
      {
        let title = req.body.title;
        //response will contain new book object including atleast _id and title
        return await libraryHandler.createBook(db.collection(BOOK_COLLECTION_NAME),res,req.body)
      }
    )
    
    .delete(
      async function(req, res)
      {
        //if successful response will be 'complete delete successful'
        return await libraryHandler.deleteAllBooks(db.collection(BOOK_COLLECTION_NAME),res)
      }
    );



  app.route('/api/books/:id')
    .get(
      validator.verifyParams(['id'],'id not present'),
      async function (req, res)
      {
        let bookid = req.params.id;
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        return await libraryHandler.querySingleBook(db.collection(BOOK_COLLECTION_NAME),res,{_id:bookid})
      }
    )
    
    .post(
      validator.verifyBody(['comment'],'missing required field comment'),
      async function(req, res)
      {
        let bookid = req.params.id;
        let comment = req.body.comment;
        //json res format same as .get
        return await libraryHandler.createBookComments(db.collection(BOOK_COLLECTION_NAME),res,{_id:bookid},[comment])
      }
    )
    
    .delete(
      async function(req, res)
      {
        let bookid = req.params.id;
          //if successful response will be 'delete successful'
        return await libraryHandler.deleteSingleBook(db.collection(BOOK_COLLECTION_NAME),res,{_id:bookid})
      }
    );
  
};
