'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');
const mongoUrl          = process.env.DATABASE_URL

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

let client;

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
    (connection)=>
    {
      //Start our server and tests!
      apiRoutes(app,client);
      
      //404 Not Found Middleware
      app.use(
        function(req, res, next) 
        {
          res.status(404)
            .type('text')
            .send('Not Found');
        }
      );

      app.emit("ready")

      const listener = app.listen(
        process.env.PORT || 3000, 
        function () 
        {
          console.log('Your app is listening on port ' + listener.address().port);
          if(process.env.NODE_ENV==='test') 
          {
            console.log('Running Tests...');
            setTimeout(
              function () 
              {
                try 
                {
                  runner.run();
                } 
                catch(e) 
                {
                  console.log('Tests are not valid:');
                  console.error(e);
                }
              }, 
              3500
            );
          }
          listener.on(
            'close', 
            function() 
            {
              console.log('closing...');
              client.close()
            }
          );
        }
      )
    }
  )
  .catch(console.error);

//Routing for API

module.exports = app; //for testing
