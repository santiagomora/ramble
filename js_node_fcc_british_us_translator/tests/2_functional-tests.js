const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test(
    'Translation with text and locale fields: POST request to /api/translate',
    (done) => 
    {
      const text = 'Paracetamol takes up to an hour to work.'
      const locale = 'british-to-american'
      const translation = '<span class=\"highlight\">Tylenol</span> takes up to an hour to work.'
      const expected = {text,translation}
      chai.request(server)
        .post('/api/translate')
        .send({text,locale})
        .end(
          function(err, res)
          {
            assert.equal(res.status, 200,'Server error');
            assert.deepEqual(res.body,expected,'Solution error')
            done();
          }
        )
    }
  )
  test(
    'Translation with text and invalid locale field: POST request to /api/translate',
    (done) => 
    {
      const text = 'Paracetamol takes up to an hour to work.'
      const locale = 'french-to-american'
      const expected = { error: 'Invalid value for locale field' }
      chai.request(server)
        .post('/api/translate')
        .send({text,locale})
        .end(
          function(err, res)
          {
            assert.equal(res.status, 200,'Server error');
            assert.deepEqual(res.body,expected,'Solution error')
            done();
          }
        )
    }
  )
  test(
    'Translation with missing text field: POST request to /api/translate',
    (done) => 
    {
      const locale = 'british-to-american'
      const expected = { error: 'Required field(s) missing' }
      chai.request(server)
        .post('/api/translate')
        .send({locale})
        .end(
          function(err, res)
          {
            assert.equal(res.status, 200,'Server error');
            assert.deepEqual(res.body,expected,'Solution error')
            done();
          }
        )
    }
  )
  test(
    'Translation with missing locale field: POST request to /api/translate',
    (done) => 
    {
      const text = 'Paracetamol takes up to an hour to work.'
      const expected = { error: 'Required field(s) missing' }
      chai.request(server)
        .post('/api/translate')
        .send({text})
        .end(
          function(err, res)
          {
            assert.equal(res.status, 200,'Server error');
            assert.deepEqual(res.body,expected,'Solution error')
            done();
          }
        )
    }
  )
  test(
    'Translation with empty text: POST request to /api/translate',
    (done) => 
    {
      const text = ''
      const locale = 'british-to-american'
      const expected = { error: 'No text to translate' }
      chai.request(server)
        .post('/api/translate')
        .send({text,locale})
        .end(
          function(err, res)
          {
            assert.equal(res.status, 200,'Server error');
            assert.deepEqual(res.body,expected,'Solution error')
            done();
          }
        )
    }
  )
  test(
    'Translation with text that needs no translation: POST request to /api/translate',
    (done) => 
    {
      const text = 'SaintPeter and nhcarrigan give their regards!'
      const locale = 'british-to-american'
      const expected = { text,translation:"Everything looks good to me!" }
      chai.request(server)
        .post('/api/translate')
        .send({text,locale})
        .end(
          function(err, res)
          {
            assert.equal(res.status, 200,'Server error');
            assert.deepEqual(res.body,expected,'Solution error')
            done();
          }
        )
    }
  )
});
