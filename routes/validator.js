module.exports = class Validator 
{

  constructor( validProjects )
  {
    this.validProjects = validProjects
  }

  checkValidProject = (projectName) => 
  {
    return true;//this.validProjects.indexOf(projectName)>=0
  }

  checkRequired = ( fields,requestBody ) => 
  {
    for(let i=0; i<fields.length; i++)
    {
      if(!requestBody[fields[i]])
      {
        return false
      }
    }
    return true
  }

  checkExtraFields = ( fields,body ) => 
  {
    const bodyFields = Object.keys(body)
    for(let i=0; i<bodyFields.length; i++)
    {
      if( fields.indexOf(bodyFields[i])<0 )
      {
        return true
      }
    }
    return false
  }

  verifyBody = (requiredFields,errorMsg) =>
  (
    async (req,res,next) => 
    {
      let project = req.params.project;
      if(!this.checkValidProject(project))
      {
        return res.status(200).json({error:'unknown project'})
      }
      if(!this.checkRequired(requiredFields,req.body))
      {
        return res.status(200).json({error:errorMsg})
      }
      req.project = project;
      return next();
    } 
  ) 

  verifyQuery = (requiredFields,errorMsg) => 
  (
    async (req,res,next) => 
    {
      let project = req.params.project;
      if(!this.checkValidProject(project))
      {
        return res.status(200).json({error:'unknown project'})
      }
      
      if(this.checkExtraFields(requiredFields,req.query))
      {
        return res.status(200).json({error:errorMsg})
      }
      req.project = project;
      return next();
    }
  )

}