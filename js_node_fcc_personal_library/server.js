'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');
const mongoUrl          = process.env.DB_URL

let client

const app = express();
( 
  async function() 
  {
    client = new MongoClient(mongoUrl);
    // Use connect method to connect to the server
    const connection = await client.connect();
    console.log('Connected successfully to server');
    return connection;
  }
)()
.then(
  connection => 
  {
    app.use('/public', express.static(process.cwd() + '/public'));

    app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Index page (static HTML)
    app.route('/')
      .get(function (req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
      });

    //For FCC testing purposes
    fccTestingRoutes(app);

    //Routing for API 
    apiRoutes(app,client);  
        
    //404 Not Found Middleware
    app.use(function(req, res, next) {
      res.status(404)
        .type('text')
        .send('Not Found');
    });

    //Start our server and tests!
    const listener = app.listen(process.env.PORT || 3000, function () {
      console.log('Your app is listening on port ' + listener.address().port);
      if(process.env.NODE_ENV==='test') {
        console.log('Running Tests...');
        setTimeout(function () {
          try {
            runner.run();
          } catch(e) {
              console.log('Tests are not valid:');
              console.error(e);
          }
        }, 1500);
      }
    });

  }
)

module.exports = app; //for unit/functional testing
