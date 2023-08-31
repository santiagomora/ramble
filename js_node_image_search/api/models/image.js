const {Schema,model} = require( 'mongoose' );

module.exports = model(
    'Image',
    new Schema({
            snippet:{type:'String'},
            thumbnail:{type:'String'},
            context:{type:'String'},
            url:{type:'String'}
        },{
            collection:'images'
        }
    )
)
