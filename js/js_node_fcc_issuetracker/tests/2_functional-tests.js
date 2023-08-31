const chaiHttp = require('chai-http');
const chai = require('chai');
let { assert,
      expect } = chai;

const {before} = require('mocha')

const server = require('../server');

chai.use(chaiHttp);

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
  }
}

const ISSUE_FIELDS = {
  '_id'         :(val) => testByType.string(val,'_id'),
  'issue_title' :(val) => testByType.string(val,'issue_title'),
  'issue_text'  :(val) => testByType.string(val,'issue_text'),
  'created_by'  :(val) => testByType.string(val,'created_by'),
  'status_text' :(val) => testByType.string(val,'status_text'),
  'assigned_to' :(val) => testByType.string(val,'assigned_to'),
  'created_on'  :(val) => testByType.date(val,'created_on'),
  'updated_on'  :(val) => testByType.date(val,'updated_on'),
  'open'        :(val) => testByType.bool(val,'open')
}

let WORKING_ID = null

const generateGroups = (group,startAt,original) => 
{
  const grouped = [];
  for(let j=startAt;j<original.length;j++)
  {
    grouped.push([...group,original[j]])
  }
  return grouped;
}
/**
 * Generates all group combinations in an array of elements
 * Ideally, one of these algorithms would receive a group size 
 * and generate all combinations using that group size, then to
 * generate all combinations, we could use a loop and pass the group length
 * as a parameter
 * const test = [1,2,3,4,5,6]
 * generateCombinations(test,0,[])
 */
const generateCombinations = ( original,groupSize,groups ) =>
{ 
  let res = [];
  if(groupSize === original.length)
  {
    return [];
  }
  if(groupSize===0)
  {
    res = generateGroups([],0,original)
  }
  for( let i=0; i<groups.length; i++ )
  {
    res = [
      ...res,
      ...generateGroups(
        groups[i],
        1+original.indexOf(groups[i][groups[i].length-1]),
        original
      )
    ]
  }
  return [...res,...generateCombinations(original,groupSize+1,res)]
}

const generateCombinationObjects = (obj) => 
{
  const res = []
  let aux = {}
  const keyCombinations = generateCombinations(Object.keys(obj),0,[])
  for(let combinationGroup of keyCombinations)
  {
    aux = {};
    for(let combinationKey of combinationGroup)
    {
      aux[combinationKey] = obj[combinationKey]
    }
    res.push(aux) 
  }
  return res; 
}

/*before(
  done => 
  {
    server.on(
      "ready", 
      () => 
      {
        done();
      }
  )
})*/

function testTypes( fields )
{
  for(const fieldName in fields)
  {
    if( !ISSUE_FIELDS[fieldName] )
    {
      assert.fail(`unknown issue field: ${fieldName}`)
    }
    ISSUE_FIELDS[fieldName](fields[fieldName]);
  }
}

suite(
  'Functional Tests', 
  function() 
  {
    test( 
      "Create an issue with only required fields: POST request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const input = {
          issue_title:'test title',
          issue_text:'test text',
          created_by:'test creator'
        }
        await chai.request(server)
          .post( `/api/issues/${project}` )
          .send(input)
          .then(
            (res) => 
            {
              let expected = {
                ...input,
                status_text:"",
                assigned_to:"",
                open:true
              }
              expect(res).to.be.json
              expect(res).to.have.status(200);
              testTypes(res.body)
              const {_id,created_on,updated_on} = res.body
              assert.deepEqual(res.body,{...expected,_id,created_on,updated_on}) 
              WORKING_ID = _id;
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )

    test( 
      "Create an issue with every field: POST request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const input = {
          issue_title:'test title',
          issue_text:'test text',
          created_by:'test creator',
          status_text:"test status",
          assigned_to:"test assignment"
        }
        await chai.request(server)
          .post( `/api/issues/${project}` )
          .send(input)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              testTypes(res.body)
              const {_id,open,created_on,updated_on} = res.body
              assert.deepEqual(res.body,{...input,_id,created_on,updated_on,open}) 
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
    
    test( 
      "Create an issue with missing required fields: POST request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const input = {
          issue_title:'test title',
          issue_text:'test text',
          created_by:'test creator'
        }
        const testObjects = generateCombinationObjects(input)
        for(key in input)
        {
          await chai.request(server)
            .post( `/api/issues/${project}` )
            .send(input[key])
            .then(
              (res) => 
              {
                let expected = input
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.deepEqual(res.body,{error:'required field(s) missing'})
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        }
      }
    )
    
    test( 
      "View issues on a project: GET request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const testVal = {}
        await chai.request(server)
          .get( `/api/issues/${project}` )
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.isArray(res.body,'The request body is not an array')
              for(const issue of res.body)
              {
                testTypes(issue)
              }
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
    test( 
      "View issues on a project with one filter: GET request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const filters = {
          _id:WORKING_ID,
          issue_title:'test title',
          issue_text:'test text',
          created_by:'test creator',
          status_text:"test status",
          assigned_to:"test assignment",
          open:true
        }
        for(const fil in filters)
        {
          await chai.request(server)
            .get( `/api/issues/${project}` )
            .query({[fil]:filters[fil]})
            .then(
              (res) => 
              {
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.isArray(res.body,'The request body is not an array')
                for(const issue of res.body)
                {
                  testTypes(issue)
                  assert.equal(issue[fil],filters[fil],`detected value different from "${filters[fil]}" when applying filter: ${fil}`)
                }
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 

        }
      }
    )
    test( 
      "View issues on a project with multiple filters: GET request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const filters = {
          _id:WORKING_ID,
          issue_title:'test title',
          issue_text:'test text',
          created_by:'test creator',
          status_text:"test status",
          assigned_to:"test assignment",
          open:true
        }
        const testObjects = generateCombinationObjects(filters)
        for(const filter in filters)
        {
          await chai.request(server)
            .get( `/api/issues/${project}` )
            .query(filter)
            .then(
              (res) => 
              {
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.isArray(res.body,'The request body is not an array')
                for(const issue of res.body)
                {
                  testTypes(issue)
                  for(const filterName of filter)
                  {
                    assert.equal(issue[filterName],filter[filterName],`detected value different from "${filter[filterName]}" when applying filter: ${filterName}`)
                  }
                }
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 

        }
      }
    )
    test( 
      "Update one field on an issue: PUT request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const modify = {
          _id:WORKING_ID,
          issue_text:'changed issue text'
        }
        let testModify;
        await chai.request(server)
            .get( `/api/issues/${project}` )
            .query({_id:modify._id})
            .then(
              (res) => {
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.isArray(res.body,'The request body is not an array')
                assert.isOk(res.body.length>0,'The request body is empty')
                testModify = res.body[0]
                testTypes(testModify);
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        await chai.request(server)
            .put( `/api/issues/${project}` )
            .send(modify)
            .then(
              (res) => 
              {
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.deepEqual(res.body,{result:'successfully updated',_id:modify._id})
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        await chai.request(server)
            .get( `/api/issues/${project}` )
            .query({_id:modify._id})
            .then(
              (res) => {
                let fetched;
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.isArray(res.body,'The request body is not an array')
                assert.isOk(res.body.length>0,'The request body is empty')
                fetched = res.body[0]
                testTypes(fetched)
                assert.strictEqual(modify.issue_text,fetched.issue_text,'could not change issue text')
                assert.notEqual(testModify.updated_on,fetched.updated_on, 'could not change updated_on date')
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        
      }
    )

    test( 
      "Update multiple fields on an issue: PUT request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const modify = {
          _id:WORKING_ID,
          issue_text:'changed issue text',
          created_by:'changed test creator',
          status_text:"changed test status",
          assigned_to:"changed test assignment",
          open:false
        }
        let testModify;
        await chai.request(server)
            .get( `/api/issues/${project}` )
            .query({_id:modify._id})
            .then(
              (res) => {
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.isArray(res.body,'The request body is not an array')
                assert.isOk(res.body.length>0,'The request body is empty')
                testModify = res.body[0]
                testTypes(testModify);
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        await chai.request(server)
            .put( `/api/issues/${project}` )
            .send(modify)
            .then(
              (res) => 
              {
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.deepEqual(res.body,{result:'successfully updated',_id:modify._id})
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        await chai.request(server)
            .get( `/api/issues/${project}` )
            .query({_id:modify._id})
            .then(
              (res) => {
                let fetched;
                expect(res).to.be.json
                expect(res).to.have.status(200);
                assert.isArray(res.body,'The request body is not an array')
                assert.isOk(res.body.length>0,'The request body is empty')
                fetched = res.body[0]
                testTypes(fetched)
                assert.strictEqual(modify.issue_text,fetched.issue_text,'could not change issue_text')
                assert.strictEqual(modify.created_by,fetched.created_by,'could not change created_by')
                assert.strictEqual(modify.status_text,fetched.status_text,'could not change status_text')
                assert.strictEqual(modify.assigned_to,fetched.assigned_to,'could not change assigned_to')
                assert.strictEqual(modify.open,fetched.open,'could not change issue open')
                assert.notEqual(testModify.updated_on,fetched.updated_on, 'could not change updated_on date')
              }
            )
            .catch(
              (err) => 
              {
                assert.fail(err);
                throw err; 
              }
            ) 
        
      }
    )
    test( 
      "Update an issue with missing _id: PUT request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const modify = {
          issue_title:'test title',
          issue_text:'test text',
          created_by:'test creator'
        }
        await chai.request(server)
          .put( `/api/issues/${project}` )
          .send(modify)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.deepEqual(res.body,{error:'missing _id'})
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )

    test( 
      "Update an issue with no fields to update: PUT request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const modify = {
          _id:WORKING_ID
        }
        await chai.request(server)
          .put( `/api/issues/${project}` )
          .send(modify)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.deepEqual(res.body, {error: 'no update field(s) sent', '_id': modify._id })
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
    test( 
      "Update an issue with an invalid _id: PUT request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const modify = {
          _id:"any _id",
          issue_text:"change"
        }
        await chai.request(server)
          .put( `/api/issues/${project}` )
          .send(modify)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.deepEqual(res.body, { error: 'could not update', '_id': modify._id })
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
    test( 
      "Delete an issue: DELETE request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const toDelete = {
          _id:WORKING_ID
        }
        await chai.request(server)
          .delete( `/api/issues/${project}` )
          .send(toDelete)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.deepEqual(res.body, { result: 'successfully deleted', '_id': toDelete._id })
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
    test( 
      "Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const toDelete = {
          _id:'any _id'
        }
        await chai.request(server)
          .delete( `/api/issues/${project}` )
          .send(toDelete)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.deepEqual(res.body, { error: 'could not delete', '_id': toDelete._id })
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
    test( 
      "Delete an issue with missing _id: DELETE request to /api/issues/{project}", 
      async function()
      {
        const project = "apitest"
        const toDelete = {}
        await chai.request(server)
          .delete( `/api/issues/${project}` )
          .send(toDelete)
          .then(
            (res) => 
            {
              expect(res).to.be.json
              expect(res).to.have.status(200);
              assert.deepEqual(res.body, { error: 'missing _id' })
            }
          )
          .catch(
            (err) => 
            {
              assert.fail(err);
              throw err; 
            }
          ) 
      }
    )
  }
);
