<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Ubicacion;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/
$factory->define(Ubicacion::class, function(Faker $faker){
    return[
		'nombre'=>$faker->firstName,
		'descripcion'=>$faker->text(45),
		'cantidad_maxima'=>rand(15,60),
		'id_estado'=>1
    ];
});
