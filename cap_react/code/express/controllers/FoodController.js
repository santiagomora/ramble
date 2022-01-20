const {getMenu,getCategories,addOrder} = require( config('path.queries') ).foodQueries

async function indexMenu(req,res)
{
    const {userId,category} = req.params;
    const queryObj = category ? {userId,category} : {userId}
    const data = await getMenu(queryObj,req.query);
    return res.status(200).json(data)
}

async function createOrder(req,res)
{
    const data = await addOrder(req.body);
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:"Order created succesfully"}
    )
}

async function indexCategories(req,res)
{
    const {userId} = req.params;
    const data = await getCategories({userId},req.query);
    return res.status(200).json(data)
}

module.exports = {indexMenu,createOrder,indexCategories}

/**
 * 
 * 
const extras = [
    {name:'mozzarella',price:1,available:true},
    {name:'chimichurri',price:1.6,available:true},
    {name:'napoli sauce',price:1.4,available:false},
    {name:'cheddar',price:2,available:true},
    {name:'extra meat',price:5.99,available:true},
    {name:'bacon',price:2.49,available:true},
    {name:'ruccula',price:1,available:true}
]

const categories = [
    {name:'pizzas',userId:7,extras:[0,5,6]},
    {name:'hamburger',userId:7,extras:[5,4]},
    {name:'tacos',userId:7,extras:[1,]},
]

const meals = [
    {userId:7,name:'Cheeseburger',pic:'path/to/cheeseburger.pic',category:14,price:9.99,userId:7,description:'Basic cheeseburger with fries',available:1},
    {userId:7,name:'Bacon burger',pic:'path/to/baconburger.pic',category:14,price:9.99,userId:7,description:'Cheeseburger with bacon and fries',available:1},
    {userId:7,name:'Veggie burger',pic:'path/to/veggieburger.pic',category:14,price:9.99,userId:7,description:'Basic grass burger with fries',available:1},
    {userId:7,name:'Margarita pizza',pic:'path/to/margaritapizza.pic',category:15,price:19.99,userId:7,description:'large pizza with napoli tomato sauce and mozzarella cheese',available:1},
    {userId:7,name:'Ruccula pizza',pic:'path/to/rucculapizza.pic',category:15,price:29.99,userId:7,description:'large pizza with napoli tomato sauce, ruccula, and mozzarella cheese',available:1},
    {userId:7,name:'Pepperoni pizza',pic:'path/to/pepperonipizza.pic',category:15,price:29.99,userId:7,description:'large pizza with napoli tomato sauce, hot pepperoni, and mozzarella cheese',available:1},
    {userId:7,name:'Bacon pizza',pic:'path/to/baconpizza.pic',category:15,price:29.99,userId:7,description:'large pizza with napoli tomato sauce, smoked bacon, and mozzarella cheese',available:1},
    {userId:7,name:'Basic taco',pic:'path/to/basictaco.pic',category:16,price:5.99,userId:7,description:'3 basic tacos with carnitas, mole, lettuce and pico de gallo',available:1},
    {userId:7,name:'Beans taco',pic:'path/to/beanstaco.pic',category:16,price:13.99,userId:7,description:'3 basic tacos with carnitas, mole, lettuce and pico de gallo and black beans',available:1},
    {userId:7,name:'ultra hot taco',pic:'path/to/ultrahottaco.pic',category:16,price:19.99,userId:7,description:'3 basic tacos with carnitas, mole, lettuce ultra hot sauce and pico de gallo',available:1},
]


function createData(req,res)
{
    const data = genericDataAdd(Meal,meals);
    return res.status(200).json(data)
}
 */