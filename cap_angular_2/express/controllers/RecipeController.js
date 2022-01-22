const {
    addRecipe,
    getRecipes,
    getSingleRecipe,
    getFormData,
    updateExistingRecipe,
    deleteExistingRecipe
} = require( config('path.queries') ).recipeQueries;

const {buildResponse} = require( config('path.helper') );

async function indexRecipes( req,res )
{
    const data = await getRecipes({userId:req.user._id},req.query);
    const response = (data.error) 
        ? buildResponse.error(400,"An error has occurred when indexing recipes.","inHeader",data.error)
        : buildResponse.info(200,"Recipes indexed, successfully.","noDisplay",data)
    return res.status(response.code).json(response.description)
}

async function addNewRecipe( req,res )
{
    const data = await addRecipe({...req.body,userId:req.user._id});
    const response = (data.error) 
        ? buildResponse.error(400,"An error has occurred when creating recipes.","inComponent",data.error)
        : buildResponse.info(200,"Recipe created, successfully.","noDisplay",data)
    return res.status(response.code).json(response.description)
}

async function getRecipe( req,res )
{
    const {_id} = req.params
    const data = await getSingleRecipe({_id,userId:req.user._id});
    const response = (data.error) 
        ? buildResponse.error(400,`An error has occurred querying recipe with id ${_id}.`,"inHeader",data.error)
        : buildResponse.success(200,"Recipe created, successfully.","topLeftCorner",data)
    return res.status(response.code).json(response.description)
}

async function formData( req,res )
{
    const data = await getFormData();
    const response = data.error 
        ? buildResponse.error(400,`An error has occurred when getting recipe form data.`,"inHeader",data.error)
        : buildResponse.info(200,`Recipe form data queried successfully.`,"noDisplay",data)
    return res.status(response.code).json(response.description)
}

async function editRecipe( req,res )
{
    const query = {_id:req.body._id||null,userId:req.user._id}
    const data = await updateExistingRecipe(query,req.body);
    const response = data.error 
        ? buildResponse.error(400,`An error has occurred when editing recipe`,"inComponent",data.error)
        : buildResponse.success(200,`Recipe edited successfully.`,"topLeftCorner",data)
    return res.status(response.code).json(response.description)
}

async function deleteRecipe( req,res )
{
    const {_id} = req.params
    const data = await deleteExistingRecipe({_id,userId:req.user._id},req.body);
    const response = data.error 
        ? buildResponse.error(400,`An error has occurred when deleting recipe`,"topLeftCorner",data.error)
        : buildResponse.info(200,`Recipe deleted successfully.`,"topLeftCorner",data)
    return res.status(response.code).json(response.description)
}

module.exports = {
    addNewRecipe,
    indexRecipes,
    getRecipe,
    formData,
    editRecipe,
    deleteRecipe
};
