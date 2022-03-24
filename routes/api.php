<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/search/{route}/{user}','SearchController@search')->name('search');

Route::post('/auth/login','Auth\LoginController@login')->name('auth.login');

Route::middleware('custom')->group( function(){

    Route::prefix('auth')->name('auth.')->group( function (){
        Route::get('/logout','Auth\LoginController@logout')->name('logout');
        Route::get('/retrieve','Auth\LoginController@retrieve')->name('retrieve');
    });

    Route::prefix('usuario')->name('usuario.')->group( function (){
        Route::get('/{add}/{id}/{role}','UserController@add')->where('add','add')->name('add');
        Route::delete('/delete/{id}','UserController@delete')->name('delete');
        Route::post('/create','UserController@create')->name('create');
        Route::put('/update/usuario','UserController@update')->name('update.usuario');
        Route::put('/scope','UserController@modifyScope')->name('update.scope');
    });

    Route::prefix('administrador')->name('admin.')->group( function (){
        Route::get('{locales}/{id}','AdminController@locales')->where('locales','locales')->name('locales');
        Route::get('{franquicias}/{id}','AdminController@franquicias')->where('franquicias','franquicias')->name('franquicias');
        Route::delete('/delete/{id}','AdminController@delete')->name('delete');
        Route::put('/update','AdminController@update')->name('update');
        Route::put('/scope','AdminController@modifyScope')->name('update.scope');
    });

    Route::prefix('local')->name('local.')->group( function (){
        Route::get('/{add}/{id}/{role}','LocalController@add')->where('add','add')->name('add');
        Route::get('/{local}/{id}','LocalController@singleLocal')->where('local','local')->name('local');
        Route::get('/{franquicia}/{id}','LocalController@singleFranquicia')->where('franquicia','franquicia')->name('franquicia');
        Route::delete('/delete/{id}','LocalController@delete')->name('delete');
        Route::post('/create','LocalController@create')->name('create');
        Route::put('/update/establecimiento','LocalController@updateEstablecimiento')->name('establecimiento');
        Route::put('/update/reservas','LocalController@updateReservas')->name('reservas');
        Route::put('/scope','LocalController@modifyScope')->name('update.scope');
    });

    Route::prefix('ubicaciones')->name('ubicaciones.')->group( function (){
        Route::get('{list}/{id}','UbicacionController@list')->where('list','list')->name('list');
        Route::get('{single}/{userId}/{id}','UbicacionController@single')->where('single','single')->name('single');
        Route::put('/update','UbicacionController@update')->name('update');
        Route::put('/disable','UbicacionController@disable')->name('disable');
        Route::delete('/delete','UbicacionController@delete')->name('delete');
        Route::post('/create','UbicacionController@create')->name('create');
        Route::put('/update/scope','UbicacionController@modifyScope')->name('update.scope');
    });

    Route::prefix('franquicia')->name('franquicia.')->group( function (){
        Route::get('{locales}/{id}','FranquiciaController@locales')->where('locales','locales')->name('locales');
        Route::get('{franquicias}/{id}','FranquiciaController@franquicias')->where('franquicias','franquicias')->name('franquicias');
        Route::get('/{add}/{id}/{role}','FranquiciaController@add')->where('add','add')->name('add');
        Route::get('/{local}/{id}','FranquiciaController@singleLocal')->where('local','local')->name('local');
        Route::get('/{franquicia}/{id}','FranquiciaController@singleFranquicia')->where('franquicia','franquicia')->name('franquicia');
        Route::delete('/delete/{id}','FranquiciaController@delete')->name('delete');
        Route::put('/update','UserController@update')->name('update');
        Route::put('/scope','FranquiciaController@modifyScope')->name('update.scope');
    });

    Route::prefix('reservas')->name('reservas.')->group( function (){
        Route::get('{list}/{id}/{month}/{year}','ReservaController@list')->where('list','list')->name('list');
        Route::get('list/{id}/{all}','ReservaController@all')->where('all','all')->name('all');
        Route::get('/{add}/{id}/{month}/{year}','ReservaController@add')->where('add','add')->name('add');
        Route::get('{single}/{userId}/{id}','ReservaController@single')->where('single','single')->name('single');
        Route::put('/update','ReservaController@update')->name('update');
        Route::delete('/delete','ReservaController@delete')->name('delete');
        Route::post('/create','ReservaController@create')->name('create');
    });

    Route::prefix('eventos')->name('eventos.')->group( function (){
        Route::get('{list}/{id}','EventoController@list')->where('list','list')->name('list');
        Route::get('{add}/{id}','EventoController@add')->where('add','add')->name('add');
        Route::get('{single}/{userId}/{id}','EventoController@single')->where('single','single')->name('single');
        Route::put('/update','EventoController@update')->name('update');
        Route::delete('/delete','EventoController@delete')->name('delete');
        Route::post('/create','EventoController@create')->name('create');
        Route::put('/scope','EventoController@modifyScope')->name('update.scope');
    });

    Route::prefix('promociones')->name('promociones.')->group( function (){
        Route::get('{list}/{id}','PromocionController@list')->where('list','list')->name('list');
        Route::get('{add}/{id}','PromocionController@add')->where('add','add')->name('add');
        Route::get('{single}/{userId}/{id}','PromocionController@single')->where('single','single')->name('single');
        Route::put('/update','PromocionController@update')->name('update');
        Route::delete('/delete','PromocionController@delete')->name('delete');
        Route::put('/disable','PromocionController@disable')->name('disable');
        Route::post('/create','PromocionController@create')->name('create');
        Route::put('/scope','PromocionController@modifyScope')->name('update.scope');
    });


    Route::prefix('horarios')->name('horarios.')->group( function (){
        Route::get('{list}/{id}','HorarioController@list')->where('list','list')->name('list');
        Route::get('{add}/{id}/','HorarioController@add')->where('add','add')->name('add');
        Route::get('{single}/{userId}/{id}','HorarioController@single')->where('single','single')->name('single');
        Route::put('/update','HorarioController@update')->name('update');
        Route::delete('/delete/{id}','HorarioController@delete')->name('delete');
        Route::post('/create','HorarioController@create')->name('create');
    });

    Route::prefix('feriados')->name('feriados.')->group( function (){
        Route::get('{list}/{id}/{month}/{year}','FeriadoController@list')->where('list','list')->name('list');
        Route::get('list/{id}/{all}','FeriadoController@all')->where('all','all')->name('all');
        Route::get('{add}/{id}/{month}/{year}','FeriadoController@add')->where('add','add')->name('add');
        Route::get('{single}/{userId}/{id}','FeriadoController@single')->where('single','single')->name('single');
        Route::put('/update','FeriadoController@update')->name('update');
        Route::delete('/delete/{id}','FeriadoController@delete')->name('delete');
        Route::post('/create','FeriadoController@create')->name('create');
        Route::put('/scope','FeriadoController@modifyScope')->name('update.scope');
    });
});
