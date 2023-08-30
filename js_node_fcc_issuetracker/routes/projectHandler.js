const {ObjectId} = require('mongodb');

module.exports = class ProjectHandler 
{

  validIssueFields = ['_id','issue_title','issue_text','created_by','assigned_to','status_text']

  constructor( validator )
  {
    this.validator = validator; 
  }

  static getDefaultProject()
  {
    return {
      status_text:"",
      issue_text:"",
      assigned_to:"",
      issue_title:"",
      created_by:"",
    }
  }
  
  createProjectIssue = async (collection,res,body) => 
  {
    try 
    {
      if( this.validator.checkExtraFields( this.validIssueFields,body ) )
      {
        return res.status(200).json('extra fields detected.')
      }
      const date = new Date();
      const newIssue = {
        ...ProjectHandler.getDefaultProject(),
        ...body,
        created_on:date,
        updated_on:date,
        open:true
      };
      const issue = await collection.insertMany([newIssue])
      if(issue.acknowledged && issue.insertedCount>0)
      {
        return res.status(200).json({...newIssue,_id:issue.insertedIds[0]})
      }
      throw {}
    }
    catch(e)
    {
      return res.status(400).json('database error')
    }
  }

  updateProjectIssue = async (collection,res,body) => 
  {
    try 
    {
      const updated_on = new Date();
      body._id = ObjectId(body._id)
      const updated = await collection.updateOne({_id:body._id},{$set:{...body,updated_on}})
      if(updated.acknowledged && updated.modifiedCount>0)
      {
        return res.status(200).json({result:'successfully updated',_id:body._id})
      }
      throw {};
    }
    catch(e)
    {
      return res.status(200).json({error: 'could not update', _id:body._id})
    }
  }

  deleteProjectIssue = async (collection,res,body) => 
  {
    try 
    {
      const deleted = await collection.deleteOne({_id:ObjectId(body._id)})
      if(deleted.acknowledged && deleted.deletedCount>0)
      {
        return res.status(200).json({ result: 'successfully deleted', '_id': body._id })
      }
      throw {}
    }
    catch(e)
    {
      return res.status(200).json({ error: 'could not delete', '_id': body._id })
    }
  }

  queryProjects = async (collection,res,query) => 
  {
    try 
    {
      if(query._id)
      {
        query._id = query._id && ObjectId(query._id)
      }
      if(query.open)
      {
        query.open = query.open === 'true'
      }
      
      const projectIssues = await collection.find(query).toArray()
      return res.status(200).json(projectIssues)
    }
    catch(e)
    {
      return res.status(200).json({error:'could not query'})
    }
  }
}