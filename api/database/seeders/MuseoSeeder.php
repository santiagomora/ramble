<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Museo;

class MuseoSeeder extends Seeder
{
    public function run(    $data,
                            $dependencies,
                            $next   )
    {
        $museo = Museo::firstOrNew([
            'nombre'=>$data['repository']
        ]);
        $museo->save();
        $this->callWith(
            $next,[
                'data'=>$data,
                'dependencies'=>array_merge($dependencies,['museo'=>$museo]),
                'next'=> DuenoSeeder::class
            ]
        );
    }
}
