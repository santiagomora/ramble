<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Reserva;
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

$factory->define(Reserva::class, function(Faker $faker){
	return[
		'email'=>$faker->safeEmail,
		'nombre'=>$faker->firstName,
		'apellido'=>$faker->lastName,
		'telefono'=>preg_replace("/x[0-9]+/i","",$faker->phoneNumber),
		'id_ubicacion'=>"",
		'cantidad_personas'=>rand(0,20),
		'id_evento'=>"",
		'descripcion_evento'=>$faker->text(45),
		'hora_reserva'=>"",
		'id_estado'=>rand(1,3)
    ];
});

