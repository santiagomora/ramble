const {Recipe,Ingredient,Unit} = require( config('path.models') );

const {
    genericIndex,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFind,
    getAll,
    genericFindAndUpdate,
    genericFindAndDelete
} = require( config( 'path.helper' ) ).genericQueryHelper;

async function getRecipes( query,{skip,limit} )
{
    const populate = {
        path:'ingredients',
        populate:[
            { path:'ingredient',model: 'Ingredient'},
            { path:'unit',model: 'Unit'}
        ]
    }
    const pagination = buildPagination({skip,limit});
    const total = await countModel(query,Recipe);
    const data = await genericIndex(pagination,query,Recipe,{createdAt:-1},populate)
    return {data,pagination:{...pagination,total}}
}

async function addRecipe( recipe )
{
    const data = await genericDataAdd(Recipe,recipe)
    return data;
}

async function getSingleRecipe( recipeQuery )
{
    const populate = {
        path:'ingredients',
        populate:[
            { path:'ingredient',model: 'Ingredient'},
            { path:'unit',model: 'Unit'}
        ]
    }
    const data = await genericFind(Recipe,recipeQuery,populate)
    return data;
}

async function getFormData()
{
    const units = await getAll({type:"ingredient"},Unit)
    const ingredients = await getAll({},Ingredient)
    return {ingredients,units}
}

async function updateExistingRecipe(query,updatedData)
{
    const data = await genericFindAndUpdate(Recipe,query,updatedData)
    return data
}

async function deleteExistingRecipe(query)
{
    const data = await genericFindAndDelete(query,Recipe)
    return data
}

module.exports = {deleteExistingRecipe,updateExistingRecipe,getRecipes,addRecipe,getSingleRecipe,getFormData};
