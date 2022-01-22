export default function expenseCast(exp)
{
    return exp
        ? {
            _id:exp._id,
            userId:7,
            title:exp.title,
            amount:exp.amount,
            description:exp.description,
            createdAt:new Date(exp.createdAt),
            updatedAt:new Date(exp.updatedAt),
            date:new Date(exp.date)
        }
        : {
            userId:7,
            title:"",
            amount:"",
            date: new Date(),
            description:""
        }
}
