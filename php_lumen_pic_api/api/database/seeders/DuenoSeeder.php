<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Dueno;

class DuenoSeeder extends Seeder
{
    public function run(    $data,
                            $dependencies,
                            $next )
    {
        $dueno1 = Dueno::firstOrNew([
            'nombre'=>'test1',
            'token'=>'43zMkG2biNkxGaYkMsGTdfWgzgELJ14OQ1d5SJP6zu1sO2gj1h'
        ]);
        $dueno2 = Dueno::firstOrNew([
            'nombre'=>'test2',
            'token'=>'bCYZ8amNkMvqlBYyMsgDE5hcpeqqtGbkUhMVsZeFvndXQqEHvx'
        ]);
        $dueno1->save();
        $dueno2->save();
        $rand = random_int(0,1);
        $this->callWith(
            $next,[
                'data'=>$data,
                'dependencies'=>array_merge($dependencies,['dueno'=>[$dueno1,$dueno2][$rand]]),
                'next'=> ''
            ]
        );
    }
}
