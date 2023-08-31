<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cuadro;

class CuadroSeeder extends Seeder
{
    public function run(    $data,
                            $dependencies,
                            $next   )
    {
        $cuadro = Cuadro::firstOrNew([
            'id_dueno' => $dependencies['dueno']['id'], 
            'id_autor'=> $dependencies['autor']['id'], 
            'id_corriente' => $dependencies['corriente']['id'], 
            'id_museo' => $dependencies['museo']['id'], 
            'titulo' => $data['title'], 
            'fecha'=> $data['objectDate'], 
            'descripcion'=> $data['objectWikidata_URL']
        ]);
        $cuadro->save();
    }
}
