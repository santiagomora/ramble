<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
Route::middleware('auth:api')->get('/user', function (Request $request) {
return $request->user();
});
*/

Route::prefix('auth')->name('auth.')->group( function (){

    Route::prefix('client')->name('client.')->group(function(){

        Route::post('/register','ClientAuthController@register')->name('register');
        Route::post('/login','ClientAuthController@login')->name('login');

        Route::middleware('auth.custom')->group(function(){

            Route::get('/logout','ClientAuthController@logout')->name('logout');
            Route::get('/retrieve','ClientAuthController@retrieve')->name('retrieve');

        });

    });

});

Route::prefix('client')->name('client.')->group( function (){
    Route::get('{id}/','ClientController@updateUser')->name('update');
    Route::middleware('auth.custom')->group(function(){
        Route::put('update/{id}','ClientController@updateUser')->name('update');
    });
});

Route::prefix('menu')->name('menu.')->group( function (){
    Route::get('{id}/','MenuController@getMenu')->name('single');
});

Route::prefix('shop')->name('shop.')->group( function (){
    Route::get('list','ShopController@getShopList')->name('list');
    Route::get('{id}/','ShopController@getShop')->name('single');
});

Route::prefix('extra')->name('extra.')->group( function (){
    Route::get('{shop_id}/{cat_id}','ExtraIngredientController@getList')->name('list');
});

Route::prefix('order')->name('order.')->group( function (){
    Route::post('save','OrderController@save')->name('save');
    Route::middleware('auth.custom')->group(function(){
        Route::get('list/client/{id}/','OrderController@getOrders')->name('list');
        Route::get('single/{id}/','OrderController@getSingleOrder')->name('single');
    });
});

Route::get('rates','ShopController@getRates')->name('rates.fix');