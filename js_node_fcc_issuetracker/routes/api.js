'use strict';

const ProjectHandler = require('./projectHandler')

const Validator = require('./validator');

const dbName = process.env.DB_NAME

const validProjects = process.env.VALID_PROJECTS.split(',');

const projectValidator = new Validator(validProjects);

const projectHandler = new ProjectHandler(projectValidator);

module.exports = function (app,client) 
{
  const db = client.db(dbName)

  app.route('/api/issues/:project')
  .get(
    projectValidator.verifyQuery([...projectHandler.validIssueFields,'created_on','updated_on','open'],'invalid query'),
    async function (req, res)
    {
      return await projectHandler.queryProjects(db.collection(req.project),res,req.query)
    }
  )
  .post(
    projectValidator.verifyBody(['issue_title','issue_text','created_by'],'required field(s) missing'),
    async function (req, res)
    {
      return await projectHandler.createProjectIssue(db.collection(req.project),res,req.body)
    }
  )
  .put(
    projectValidator.verifyBody(['_id'],'missing _id'),
    async function (req, res)
    {
      if(Object.keys(req.body).length<=1)
      {
        return res.status(200).json({error:'no update field(s) sent', _id:req.body._id})
      }
      return await projectHandler.updateProjectIssue(db.collection(req.project),res,req.body)
    }
  )
  .delete(
    projectValidator.verifyBody(['_id'],'missing _id'),
    async function (req, res)
    {
      return await projectHandler.deleteProjectIssue(db.collection(req.project),res,req.body)
    }
  )

    
};
