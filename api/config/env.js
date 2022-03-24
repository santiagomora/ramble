const {config} = require( 'dotenv' );

config();

module.exports={

    NODE_ENV:process.env.NODE_ENV,

    API_PORT:process.env.API_PORT,
    API_URL:process.env.API_URL,

    DB_USER:process.env.DB_USER,
    DB_SCHEMA:process.env.DB_SCHEMA,
    DB_PORT:process.env.DB_PORT,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST:process.env.DB_HOST,

    IMAGE_API_KEY:process.env.IMAGE_API_KEY,
    IMAGE_API_URL:process.env.IMAGE_API_URL
    
}
