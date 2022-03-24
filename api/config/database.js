const {connect} = require('mongoose');

const {
    DB_USER,
    DB_SCHEMA,
    DB_PORT,
    DB_PASSWORD,
    DB_HOST
} = require( './env' );

const db_url = `mongodb://${DB_HOST}:${DB_PORT}`;

function db_connect(){
    return (
        connect(
            db_url,{
                useUnifiedTopology:true,
                useNewUrlParser:true,
                dbName:DB_SCHEMA,
                user:DB_USER,
                pass:DB_PASSWORD
            }
        )
        .then(
            res => {
                console.log(`Database connection established succesfully.`);
                return res;
            }
        )
        .catch(
            err => {
                console.log(`Error establishing connection to Database: ${err}`);
            }
        )
    )
}

module.exports = {
    db_connect
};
