const { buildResponse } = require( config('path.helper') );

function CartItemController( CartItemQueries )
{
    this.indexCartItems = async function( req,res )
    {
        const data = await CartItemQueries.getCartItems({userId:req.user._id},req.query);
        const response = (data.error)
            ? buildResponse.error(400,`An error occurred when indexing cart items.`,"inComponent",data.error)
            : buildResponse.info(200,"Cart items indexed successfully.","noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.addNewCartItem = async function( req,res )
    {
        const data = await CartItemQueries.addCartItem({...req.body,userId:req.user._id});
        const response = (data.error)
            ? buildResponse.error(400,'An error occurred when creating the cart item.',"inComponent",data.error)
            : buildResponse.info(200,"Cart item created succesfully","topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.editCartItem = async function( req,res )
    {
        const query = {_id:req.params._id||null,userId:req.user._id}
        const data = await CartItemQueries.updateExistingCartItem(query,req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when editing item`,"inComponent",data.error)
            : buildResponse.success(200,`Item edited successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.getCartItemFormData = async function( req,res )
    {
        const data = await CartItemQueries.getFormData({userId:req.user._id});
        const response = (data.error)
            ? buildResponse.error(400,`An error occurred when getting cart item form data.`,"inComponent",data.error)
            : buildResponse.info(200,"Cart item form data retrieved successfully.","noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.deleteOneCartItem = async function( req,res )
    {
        const {_id} = req.params
        const data = await CartItemQueries.deleteCartItem({_id,userId:req.user._id},req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when deleting cart item`,"topLeftCorner",data.error)
            : buildResponse.info(200,`Cart item deleted successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.getCartItem = async function( req,res ) 
    {
        const {_id} = req.params
        const data = await CartItemQueries.getSingleCartItem({_id,userId:req.user._id});
        const response = (data.error) 
            ? buildResponse.error(400,`An error has occurred querying cart item with id ${_id}.`,"inHeader",data.error)
            : buildResponse.success(200,`Item ${_id} found`,'noDisplay',data)
        return res.status(response.code).json(response.description)
    }

}

module.exports = CartItemController