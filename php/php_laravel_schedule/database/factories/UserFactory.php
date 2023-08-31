<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
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

$factory->define(User::class, function (Faker $faker) {
	$intervals = [1,2,3,4,5,6,10,12,15,20,30,60];
	$selectedInterval=$intervals[rand(0,4)];
	$cierre = $intervals[rand(0,4)];
	return [
		'nombre'=>$faker->name,
		'email'=>$faker->unique()->safeEmail,
		'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'email_verified_at' => now(),
		'remember_token' => Str::random(10),
		'razon_social'=> Str::random(20),
		'id_franquicia'=> rand(5,6),
		'id_provincia'=> rand(1,24),
		'id_rol'=>3,
		'email_verified_at'=>now(),
		'intervalo_reserva'=>$selectedInterval,
		'correo_adm'=> $faker->safeEmail,
		'telefono_adm'=>preg_replace("/x[0-9]+/i","",$faker->phoneNumber),
		'nombre_adm'=>$faker->name,
		'caida_reserva'=>$cierre,
		'cuit_cuil'=>((string) rand(1000,9999)).((string) rand(1000,9999)),
		'direccion'=>$faker->text(150),
		'telefono_local'=>preg_replace("/x[0-9]+/i","",$faker->phoneNumber),
		'id_estado'=>1
    ];
});





