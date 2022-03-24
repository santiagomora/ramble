function categoryExtraCast(catExt)
{
    return {
        _id: catExt._id,
        categoryId: catExt.categoryId,
        name: catExt.name,
        available: catExt.available===1,
        price: parseInt(catExt.price),
        createdAt: new Date(catExt.createdAt),
        updatedAt: new Date(catExt.updatedAt)
    }
}

function categoryCast(cat)
{
    return {
        _id: cat._id,
        userId: cat.userId,
        name: cat.name,
        createdAt: new Date(cat.createdAt),
        updatedAt: new Date(cat.updatedAt),
        extraPrice: parseFloat(cat.extraPrice),
        extras: cat.extras 
            ? cat.extras.map(
                ext => categoryExtraCast(ext)
            )
            : []
    }
}

export default function mealCast(mea)
{
    return mea
    ? {
        _id: mea._id,
        name: mea.name,
        pic: mea.pic,
        price: mea.price,
        userId: mea.userId,
        createdAt: new Date(mea.createdAt),
        updatedAt: new Date(mea.updatedAt),
        description: mea.description,
        available: mea.available===1,
        category: mea.category 
            ? categoryCast(mea.category)
            : {}
    }
    : {
        name: '',
        pic: '',
        price: 0,
        userId: 7,
        description:'',
        category:{}
    }
} 