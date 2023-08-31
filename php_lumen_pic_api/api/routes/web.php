<?php

/** @var \Laravel\Lumen\Routing\Router $router */
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(
    [
        'prefix' => 'cuadro','as'=>'cuadro',
        'middleware' => 'auth',
    ],
    function () use ($router) 
    {
        $router->post('', ['as' => 'add', 'uses' => 'CuadroController@add']);
        $router->put('{id}', ['as' => 'update', 'uses' => 'CuadroController@update']);
        $router->delete('{id}', ['as' => 'delete', 'uses' => 'CuadroController@delete']);
        $router->get('', ['as' => 'list', 'uses' => 'CuadroController@list']);
        $router->get('{id}', ['as' => 'view', 'uses' => 'CuadroController@view']);
    }
);