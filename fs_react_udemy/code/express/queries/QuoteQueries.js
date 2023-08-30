const {Quote,QuoteComment} = require( config('path.models') );

const {
    genericIndex,
    genericFind,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFindAndUpdate
} = require( config( 'path.helper' ) ).genericQueryHelper;
/*
 * database methods
 * */

async function getQuotes( queryObj,{skip,limit} )
{
    const pagination = buildPagination({skip,limit});
    const total = await countModel(queryObj,Quote);
    const data = await genericIndex(pagination,queryObj,Quote)
    return {data,pagination:{...pagination,total}}
}

async function getSingleQuote( quoteQuery )
{
    const data = await genericFind(Quote,quoteQuery)
    return data;
}

async function addQuote( quote )
{
    const data = await genericDataAdd(Quote,quote)
    return data;
}

async function getQuoteComments( queryObj,{skip,limit} )
{
    const pagination = buildPagination({skip,limit});
    const total = await countModel(queryObj,QuoteComment);
    const data = await genericIndex(pagination,queryObj,QuoteComment)
    return {data,pagination:{...pagination,total}}
}

async function addQuoteComment( comment )
{
    const data = await genericDataAdd(QuoteComment,comment)
    return data;
}

module.exports = {getQuoteComments,addQuote,getQuotes,getSingleQuote,addQuoteComment};
