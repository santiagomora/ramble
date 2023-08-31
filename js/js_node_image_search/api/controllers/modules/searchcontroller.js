const Image = require( '../../models/image' );

const History = require( '../../models/history' );

const {IMAGE_API_KEY,IMAGE_API_URL} = require( '../../config/env' );

const axios = require('axios');

function saveHistory( data,res ){
    const create = History.create( data,res );
    res.status( create ? 200:500 );
    return res;
}

async function local( req,res ){
    const {
            snippet,
            limit,
            offset
        } = req.query,

        cb = function( res ){

            return async function( err,data ){

                if(err){
                    console.log(err);
                    return res.status(500);
                }

                res = await saveHistory([{
                    term:snippet.replace(/\s/gi,','),
                    type:'local',
                    date: new Date()
                }],res);

                return res.json({data});

            }

        };

    return Image
        .find( { snippet:new RegExp( snippet.replace(",","|"),"ig" ) } )
        .skip( parseInt( offset-1 ) )
        .limit( parseInt( (offset-1)*limit ) )
        .exec( cb( res ) )

}

async function extern( req,res,next ){

    const {
            snippet,
            limit,
            offset
        } = req.query,

        cb = function( {req,res,next} ){

            return async function({data}) {

                req.data=data;

                res = await saveHistory([{
                    term:snippet,
                    type:'extern',
                    date: new Date()
                }],res)

                next();
            }

        };

    axios.get(
        IMAGE_API_URL,{
            params: snippet ? {
                key:IMAGE_API_KEY,
                q:snippet.replace(/\s/gi,'+'),
                per_page:limit,
                page:offset
            } : {
                key:IMAGE_API_KEY,
                per_page:limit,
                page:offset
            }
        }
    )
    .then( cb( {req,res,next} ) )
    .catch(
        err => {
            res.json({err});
            console.log(err)
            res.end();
        }
    )
}

module.exports = {
    local,
    extern
}
