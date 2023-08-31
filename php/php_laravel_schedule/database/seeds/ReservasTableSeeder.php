<?php

use Illuminate\Database\Seeder;

class ReservasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected function generateMinuteArray(
        $int
    ){
        $res = [];
        for ($ctr = 0; $ctr<60; $ctr+=$int){
            array_push(
                $res,
                $ctr === 0 ? 
                    "00"
                    : (string) $ctr
            );
        }
        return $res;
    }

    protected function generateHorasArray(
        $floor,
        $ceil
    ){
        $res = [];
        for ($ctr = $floor; $ctr<=$ceil; $ctr++){
            array_push($res,$ctr);
        }
        return $res;
    }

    public function run()
    {
        foreach(App\User::all() as $usr){
            if(!in_array($usr->id,[4,5,6])){
                $hr = $usr->horariosSemanas;
                $ubcns = $usr->ubicaciones;
                $evnts = $usr->eventos;
                for ($ctr = 0; $ctr<80; $ctr++){
                    $st = DateTime::createFromFormat ("d-m-Y",'01-07-2019');
                    $en = DateTime::createFromFormat ("d-m-Y",'30-09-2019');
                    $rdm_timestamp = mt_rand($st->getTimestamp(), $en->getTimestamp());
                    $min = $this->generateMinuteArray($usr->intervalo_reserva);
                    $hr = $this->generateHorasArray(16,19);
                    $rdm_date = new DateTime();
                    $rdm_date->setTimestamp($rdm_timestamp);
                    $rdm_date->setTime($hr[rand(0,count($hr)-1)],$min[rand(0,count($min)-1)],'00');
                    $usr->reservas()->save(
                        factory(\App\Models\Reserva::class)->make(
                            [
                                'id_ubicacion'=>$ubcns[rand(0,count($ubcns)-1)]->id,
                                'id_evento'=>$evnts[rand(0,count($evnts)-1)]->id,
                                'hora_reserva'=>$rdm_date
                            ]
                        )
                    );
                }
            }
        }
    }
}
