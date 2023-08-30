#    The Mutz Hub. - API
To deploy the app on any environment you must install first [composer](https://getcomposer.org/download/)
```
>$ git clone git@github.com:santiagomora/mutz-hub-back.git --branch local or <br/>
>$ git clone https://github.com/santiagomora/mutz-hub-back.git --branch local
>$ cd mutz-hub-back
>$ composer install
>$ php artisan key:generate php artisan migrate  
```
Notes 
-	if your env file is not generated automatically, you can use the .env.example included in the root folder
-	Note: modify your env file, make sure you have a DB connection established after you run this command, the tables required for the API will be created there's a demo dataset in root folder named demo-dump, you can import it using your DBMS and use it for testing.
```
>$ php artisan serve
```
if you downloaded the front-end local development repository, it is expected that this API runs on 127.0.0.1:8000, and the front end on 127.0.0.1:3000. Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to view it on browser.

### Deploying on production
To deploy the app on any environment you must install first [composer](https://getcomposer.org/download/)
```
>$ git clone git@github.com:santiagomora/mutz-hub-back.git --branch local or <br/>
>$ git clone https://github.com/santiagomora/mutz-hub-back.git --branch local
>$ cd mutz-hub-back
>$ composer install --optimize-autoloader --no-dev
>$ php artisan key:generate
>$ php artisan migrate 
```
Notes
-	modify your env file, make sure you have a DB connection established after you run this command, the tables required for the API will be created there's a demo dataset in root folder named demo-dump, you can import it using your DBMS and use it for testing

make sure you properly edit your env file, and change the CorsHeaders Middleware to authorize<br/>
the domain that will consume this API.

#    The Mutz Hub - front end APP
```
>$ git clone git@github.com:santiagomora/mutz-hub-front.git --branch local or 
>$ git clone https://github.com/santiagomora/mutz-hub-front.git --branch local
>$ cd mutz-hub-front
>$ npm install
>$ npm run dev
```
this runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### to deploy on production
The branch master is ready for deployment on Heroku <br/>
To deploy on any server: 
```
>$ git clone git@github.com:santiagomora/mutz-hub-front.git or
>$ git clone https://github.com/santiagomora/mutz-hub-front.git
>$ cd mutz-hub-front
>$ npm install
>$ npm run build
>$ npx serve /build
```
edit package json to set the homepage of your project <br/>
add env variable GENERATE_SOURCEMAP=false

Remember to install the api, available on [this repo](https://github.com/santiagomora/mutz-hub-back) <br/>
and set up to run on 127.0.0.1:8000

ENJOY!

