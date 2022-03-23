<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Autor;

class AutorSeeder extends Seeder
{
    public function run(    $data, 
                            $dependencies,
                            $next   ) 
    {
        $autor = Autor::firstOrNew([
            'nombre'=>$data['artistDisplayName'], 
            'ano_nacimiento'=>$data['artistBeginDate'], 
            'ano_defuncion'=>$data['artistEndDate'],
            'id_pais_nacimiento'=>$dependencies['pais']['id']
        ]);
        $autor->save();
        $this->callWith(
            $next,[
                'data'=>$data,
                'dependencies'=>array_merge($dependencies,['autor'=>$autor]),
                'next'=> CuadroSeeder::class
            ]
        );
    }
}
