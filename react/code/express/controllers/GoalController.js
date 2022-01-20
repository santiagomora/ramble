const {
    addGoal,
    getGoals,
    updateGoal
} = require( config('path.queries') ).goalQueries;

async function indexGoals( req,res )
{
    const {userId} = req.params;
    const data = await getGoals({userId},req.query);
    return res.status(200).json(data)
}

async function addNewGoal( req,res )
{
    const data = await addGoal(req.body);
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:"Goal created succesfully"}
    )
}

async function updateExistingGoal( req,res )
{
    const {userId,_id} = req.body;
    const data = await updateGoal({userId,_id},req.body)
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:`Goal "${data.title}" updated succesfully`}
    )
}

module.exports = {
    indexGoals,
    addNewGoal,
    updateExistingGoal
};
