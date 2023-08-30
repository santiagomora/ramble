const {
    addRecipe,
    getRecipes,
    getSingleRecipe,
    getFormData,
    updateExistingRecipe,
    deleteExistingRecipe
} = require( config('path.queries') ).recipeQueries;

const {buildResponse} = require( config('path.helper') );

function RecipeController( RecipeQueries )
{
    this.indexRecipes = async function( req,res )
    {
        const data = await RecipeQueries.getRecipes({userId:req.user._id},req.query);
        const response = (data.error) 
            ? buildResponse.error(400,"An error has occurred when indexing recipes.","inHeader",data.error)
            : buildResponse.info(200,"Recipes indexed, successfully.","noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.addNewRecipe = async function( req,res )
    {
        const data = await RecipeQueries.addRecipe({...req.body,userId:req.user._id});
        const response = (data.error) 
            ? buildResponse.error(400,"An error has occurred when creating recipes.","inComponent",data.error)
            : buildResponse.info(200,"Recipe created successfully.","topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.getRecipe = async function( req,res )
    {
        const {_id} = req.params
        const {withoutPopulate} = req.query
        const data = await RecipeQueries.getSingleRecipe({_id,withoutPopulate,userId:req.user._id});
        const response = (data.error) 
            ? buildResponse.error(400,`An error has occurred querying recipe with id ${_id}.`,"inHeader",data.error)
            : buildResponse.success(200,`Recipe with id ${_id} found.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.formData = async function( req,res )
    {
        const data = await RecipeQueries.getFormData({userId:req.user._id});
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when getting recipe form data.`,"inHeader",data.error)
            : buildResponse.info(200,`Recipe form data queried successfully.`,"noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.editRecipe = async function( req,res )
    {
        const query = {_id:req.body._id||null,userId:req.user._id}
        const data = await RecipeQueries.updateExistingRecipe(query,req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when editing recipe`,"inComponent",data.error)
            : buildResponse.success(200,`Recipe edited successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.deleteRecipe = async function( req,res )
    {
        const {_id} = req.params
        const data = await RecipeQueries.deleteExistingRecipe({_id,userId:req.user._id},req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when deleting recipe`,"topLeftCorner",data.error)
            : buildResponse.info(200,`Recipe deleted successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }

}


module.exports = RecipeController