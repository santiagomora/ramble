const {
    addQuote,
    getQuotes,
    getQuoteComments,
    getSingleQuote,
    addQuoteComment
} = require( config('path.queries') ).quoteQueries;

async function indexQuotes( req,res )
{
    const {userId} = req.params;
    const data = await getQuotes({userId},req.query);
    return res.status(200).json(data)
}

async function addNewQuote( req,res )
{
    console.log(req.body)
    const data = await addQuote(req.body);
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:"Quote created succesfully"}
    )
}

async function viewSingleQuote( req,res )
{
    const {quoteId:_id} = req.params
    const data = await getSingleQuote({_id});
    return res.status(200).json({data:data[0]})
}

async function indexQuoteComments( req,res )
{
    const {quoteId} = req.params;
    const data = await getQuoteComments({quoteId},req.query);
    return res.status(200).json(data)
}

async function addNewQuoteComment( req,res )
{
    const data = await addQuoteComment(req.body);
    return res.status(200).json(
        data.error
            ? {error:data.error}
            : {success:"Comment added succesfully"}
    )
}

module.exports = {
    indexQuotes,
    addNewQuote,
    addNewQuoteComment,
    viewSingleQuote,
    indexQuoteComments
};
