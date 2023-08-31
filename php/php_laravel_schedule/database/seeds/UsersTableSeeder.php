<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
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

    protected function customDataByClass(
        $className,
        $intervaloUser
    ){
        $interval = $this->generateMinuteArray($intervaloUser);
        $aperturaAtencionHoras = $this->generateHorasArray(12,14);
        $cierreAtencionHoras = $this->generateHorasArray(20,23);
        $aperturaReservaHoras = $this->generateHorasArray(14,16);
        $cierreReservaHoras = $this->generateHorasArray(19,20);

        return [
            'apertura_reserva'=>DateTime::createFromFormat ("d-m-Y H:i:s",'01-07-2019 '.$aperturaReservaHoras[rand(0,count($aperturaReservaHoras)-1)].":".$interval[rand(0,count($interval)-1)].":00"),
            'cierre_reserva'=>DateTime::createFromFormat ("d-m-Y H:i:s",'01-07-2019'.$cierreReservaHoras[rand(0,count($cierreReservaHoras)-1)].":".$interval[rand(0,count($interval)-1)].":00"),
            'apertura_atencion'=>DateTime::createFromFormat ("d-m-Y H:i:s",'01-07-2019'.$aperturaAtencionHoras[rand(0,count($aperturaAtencionHoras)-1)].":".$interval[rand(0,count($interval)-1)].":00"),
            'cierre_atencion'=>DateTime::createFromFormat ("d-m-Y H:i:s",'01-07-2019'.$cierreAtencionHoras[rand(0,count($cierreAtencionHoras)-1)].":".$interval[rand(0,count($interval)-1)].":00")
        ];
    }

    protected function assignDataByClass(
        $className,
        $recordLength,
        $customData,
        $target,
        $intervalo
    ){
        $res = collect([]);
        for ($ctr = 0; $ctr<$recordLength;$ctr++){
            $target->save(
                factory($className)->make(
                    $customData ? 
                        $this->customDataByClass(
                            $className,
                            $intervalo
                        ) : []
                )
            );
        }
        return $res;
    }

    public function run()
    {
        $modelsToSeed = [
            '\\App\\Models\\HorariosSemana',
            '\\App\\Models\\UsuarioFeriados',
            '\\App\\Models\\Ubicacion',
            '\\App\\Models\\UsuarioEvento',
        ];
        factory(App\User::class, 10)->create()->each(function ($user) use ($modelsToSeed) {
            foreach($modelsToSeed as $model) {
                $this->assignDataByClass(...$model::dataSeeding($user));
            }
        });
    }
}
