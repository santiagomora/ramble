<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\HorariosSemana;
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

$factory->define(HorariosSemana::class, function(Faker $faker){
	return [
		'id_dia_semana'=>rand(1,7),
		'apertura_reserva'=>"",
		'cierre_reserva'=>"",
		'apertura_atencion'=>"",
		'cierre_atencion'=>""
    ];
});