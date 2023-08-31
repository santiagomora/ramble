const {Schema,model} = require( 'mongoose' );

const HistorySchema = new Schema({
        term:{type:'String'},
        date:{type:Date},
        type:{type:'String'}
    },{
        collection:'history'
    }
)

async function create( term ){
    return await History.insertMany(term);
}

HistorySchema.method('create',create)

module.exports = model(
    'History',
    HistorySchema
)
