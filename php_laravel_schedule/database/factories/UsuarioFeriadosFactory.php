<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\UsuarioFeriados;
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
$factory->define(UsuarioFeriados::class, function(Faker $faker){
	return [
		'fecha_feriado'=>$faker->dateTimeThisMonth('now','UTC -3'),
		'apertura_reserva'=>"",
		'cierre_reserva'=>"",
		'apertura_atencion'=>"",
		'cierre_atencion'=>"",
		'descripcion'=>$faker->text(100),
		'id_estado'=>rand(1,2),
    ];
});