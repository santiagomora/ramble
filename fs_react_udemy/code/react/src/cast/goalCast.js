export default function expenseCast(goa)
{
    return goa
        ? {
            _id:goa._id,
            title:goa.title,
            userId:goa.userId,
            description:goa.description,
            createdAt:new Date(goa.createdAt),
            updatedAt:new Date(goa.updatedAt)
        }
        : {
            userId:7,
            title:"",
            description:""
        }
}
