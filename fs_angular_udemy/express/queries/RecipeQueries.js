const {Recipe,CartItem} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function RecipeQueries(genericQueryHelper)
{
    this.getRecipes = async function( query,{skip,limit} )
    {
        const populate = {
            path:'ingredients',
            populate:{
                path:'item',
                model:'CartItem',
                populate:{
                    path:'unit',
                    model:'Unit'
                }
            }
        }
        const pagination = genericQueryHelper.buildPagination({skip,limit});
        const total = await genericQueryHelper.countModel(query,Recipe);
        const data = await genericQueryHelper.genericIndex(pagination,query,Recipe,{createdAt:-1},populate)
        return {data,pagination:{...pagination,total}}
    }
    
    this.addRecipe = async function( recipe )
    {
        const data = await genericQueryHelper.genericDataAdd(Recipe,recipe)
        return data;
    }
    
    this.getSingleRecipe = async function( recipeQuery )
    {
        let populate ={
            path:'ingredients',
            populate:{
                path:'item',
                model:'CartItem',
                populate:{
                    path:'unit',
                    model:'Unit'
                }
            }
        }
        if( recipeQuery.withoutPopulate ){
            populate = recipeQuery.withoutPopulate === 'true' ? null : populate;
            delete recipeQuery.withoutPopulate
        }
        const data = await genericQueryHelper.genericFind(Recipe,recipeQuery,populate)
        return data;
    }
    
    this.getFormData = async function(query)
    {
        const populate = {
            path:"unit",
            model:'Unit'
        }
        const items = await genericQueryHelper.getAll(query,CartItem,{},populate)
        return {items}
    }
    
    this.updateExistingRecipe = async function(query,updatedData)
    {
        const data = await genericQueryHelper.genericFindAndUpdate(Recipe,query,updatedData)
        return data
    }
    
    this.deleteExistingRecipe = async function(query)
    {
        const data = await genericQueryHelper.genericFindAndDelete(query,Recipe)
        return data
    }
}


module.exports = new RecipeQueries(genericQueryHelper);
