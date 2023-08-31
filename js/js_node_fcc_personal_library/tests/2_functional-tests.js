/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

let WORKING_ID;

const testByType = {
  string: (value,name) => 
  {
    assert.exists(value, `the ${name} value does not exist`)
    assert.isString(value,`the ${name} value "${value}" is not a string`)
  },
  bool:(value,name) => 
  {
    assert.exists(value, `the ${name} does not exist`)
    assert.isBoolean(value,`the ${name} value "${value}" is not boolean`)
  },
  date: (value,name) => 
  {
    assert.exists(value, `the ${name} does not exist`)
    const date = new Date(value)
    if(!(date instanceof Date && !isNaN(date)))
    {
      assert.fail(`the ${name} value "${value}" is not a valid date`)
    }
  },
  number: (value,name) => 
  {
    assert.exists(value, `the ${name} does not exist`)
    assert.isNumber(value,`the ${name} value "${value}" is not a number`)
  },
  array: (value,name,type) => 
  {
    assert.exists(value, `the ${name} does not exist`)
    assert.isArray(value,`the ${name} value "${value}" is not an array`)
    for(let j; j<value.length; j++)
    {
      testByType[type](value[j],j)
    }
  }
}

const BOOK_FIELDS = {
  '_id'         :(val) => testByType.string(val,'_id'),
  'title'       :(val) => testByType.string(val,'title'),
  'comments'    :(val) => testByType.array(val,'comments','string'),
  'commentcount':(val) => testByType.number(val,'commentcount')
}

function testTypes( fields )
{
  for(const fieldName in fields)
  {
    if( !BOOK_FIELDS[fieldName] )
    {
      assert.fail(`unknown issue field: ${fieldName}`)
    }
    BOOK_FIELDS[fieldName](fields[fieldName]);
  }
}
suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        const title ='POST with title'; 
        chai
        .request(server)
        .post('/api/books')
        .send({title})
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.property(res.body,"title")
          assert.equal(res.body.title,title)
          assert.property(res.body,'_id')
          WORKING_ID = res.body._id
          done()
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
        .request(server)
        .post('/api/books')
        .send({})
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isString(res.text)
          assert.equal(res.text,'missing required field title')
          done()
        });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
        .request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isArray(res.body)
          const book = res.body[0]
          assert.property(book,'_id')
          assert.isString(book._id)
          assert.property(book,'title')
          assert.isString(book.title)
          assert.property(book,'comments')
          assert.isArray(book.comments)
          assert.property(book,'commentcount')
          assert.isNumber(book.commentcount)
          done()
        });
      });      
      
    });

    
    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
        .request(server)
        .get('/api/books/testid')
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isString(res.text)
          assert.equal(res.text,'no book exists')
          done()
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
        .request(server)
        .get('/api/books/'+WORKING_ID)
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.property(res.body,'_id')
          assert.isString(res.body._id)
          assert.property(res.body,'title')
          assert.isString(res.body.title)
          assert.property(res.body,'comments')
          assert.isArray(res.body.comments)
          assert.property(res.body,'commentcount')
          assert.isNumber(res.body.commentcount)
          done()
        });
      });
      
    });

    
    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        const comment = 'test comment'
        chai
        .request(server)
        .post('/api/books/'+WORKING_ID)
        .send({comment})
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.property(res.body,'_id')
          assert.isString(res.body._id)
          assert.property(res.body,'title')
          assert.isString(res.body.title)
          assert.property(res.body,'comments')
          assert.isArray(res.body.comments)
          assert.property(res.body,'commentcount')
          assert.isNumber(res.body.commentcount)
          assert.include(res.body.comments,comment,'the new comment is not included in the book comments')
          done()
        });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
        .request(server)
        .post('/api/books/'+WORKING_ID)
        .send({})
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isString(res.text)
          assert.equal(res.text,'missing required field comment')
          done()
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
        .request(server)
        .post('/api/books/testid')
        .send({comment:'test comment'})
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isString(res.text)
          assert.equal(res.text,'no book exists')
          done()
        });
      });
      
    });
    
    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
        .request(server)
        .delete('/api/books/'+WORKING_ID)
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isString(res.text)
          assert.equal(res.text,'delete successful')
          done()
        });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
        .request(server)
        .delete('/api/books/testid')
        .end(function(err, res){
          assert.equal(res.status,200)
          assert.isString(res.text)
          assert.equal(res.text,'no book exists')
          done()
        });
      });
    })
    })
  });

});
