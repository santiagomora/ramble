<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pais;

class PaisSeeder extends Seeder
{
    public function run(    $data,
                            $dependencies,
                            $next   )
    {
        $pais = Pais::firstOrNew([
            'nombre'=>$data['artistNationality']
        ]);
        $pais->save();
        $this->callWith(
            $next,[
                'data'=>$data,
                'dependencies'=>array_merge($dependencies,['pais'=>$pais]),
                'next'=> MuseoSeeder::class
            ]
        );
    }
}
