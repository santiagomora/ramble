class Validator 
{

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
      if(!this.checkRequired(requiredFields,req.body))
      {
        return res.status(200).send(errorMsg)
      }
      return next();
    } 
  ) 

  verifyQuery = (requiredFields,errorMsg) => 
  (
    async (req,res,next) => 
    { 
      if(this.checkExtraFields(requiredFields,req.query))
      {
        return res.status(200).send(errorMsg)
      }
      return next();
    }
  )

  verifyParams = (requiredFields,errorMsg) => 
  (
    async (req,res,next) => 
    {
      if(!this.checkRequired(requiredFields,req.params))
      {
        return res.status(200).send(errorMsg)
      }
      return next();
    }
  )

}

module.exports = new Validator()