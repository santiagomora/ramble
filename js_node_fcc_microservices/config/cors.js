const whitelist = process.env.CORS_WHITELIST.split(',');

function allowed_origin( origin,callback ){
    const args = ( whitelist.indexOf( origin ) !== -1 || !origin )
        ? [null,true]
        : [ new Error('Not allowed by CORS') ];
    callback( null,true );
}

module.exports = {
    options:{
        optionsSuccessStatus: 200,
        origin:allowed_origin,
        credentials:true,
        methods:['GET','POST']
    }
}
