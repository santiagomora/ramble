const {
    addExpense,
    getExpenses,
    updateExpense
} = require( config('path.queries') ).expenseQueries;

async function indexExpenses( req,res )
{
    const {userId} = req.params;
    const data = await getExpenses({userId},req.query);
    return res.status(200).json(data)
}

async function addNewExpense( req,res )
{
    const data = await addExpense(req.body);
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:"Expense created succesfully"}
    )
}

async function updateExistingExpense( req,res )
{
    const {userId,_id} = req.body;
    console.log(userId,_id)
    const data = await updateExpense({userId,_id},req.body)
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:`Expense "${data.title}" updated succesfully`}
    )
}

module.exports = {
    indexExpenses,
    addNewExpense,
    updateExistingExpense
};
