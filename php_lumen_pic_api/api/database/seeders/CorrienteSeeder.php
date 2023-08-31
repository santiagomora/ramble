<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Corriente;

class CorrienteSeeder extends Seeder
{
    public function run(    $data,
                            $dependencies,
                            $next   )
    {
        $corriente = Corriente::firstOrNew([
            'nombre'=>$data['objectName'],
            'descripcion'=>$data['department']
        ]);
        $corriente->save();
        $this->callWith(
            $next,[
                'data'=>$data,
                'dependencies'=>array_merge($dependencies,['corriente'=>$corriente]),
                'next'=> AutorSeeder::class
            ]
        );
    }
}
