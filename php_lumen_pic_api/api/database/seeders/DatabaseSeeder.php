<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use GuzzleHttp\Psr7\Request;

class DatabaseSeeder extends Seeder
{
    private const MAX_DATA = 30;
    private const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

    public function getQueryUrl( string $q )
    {
        return DatabaseSeeder::BASE_URL."/$q";
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    private function getDataFromMuseumAPI()
    {
        $client = new Client();
        $request = new Request(
            'GET', 
            $this->getQueryUrl('search?geoLocation=France&isHighlight=true&q=woman')
        );
        return $client->sendAsync($request)
            ->then(
                function ($response) use ($client)
                {
                    $parsed = json_decode($response->getBody(),true)['objectIDs'];
                    $toRequest = [];
                    for( $i=0; $i<DatabaseSeeder::MAX_DATA; $i++ )
                    {
                        array_push($toRequest, $client->getAsync($this->getQueryUrl('objects/'.$parsed[$i])));
                    }
                    return Promise\Utils::unwrap($toRequest);
                }
            );
    }


    public function run()
    {
        $this->getDataFromMuseumAPI()
            ->then(
                function ($responses)
                {
                    foreach( $responses as $res )
                    {
                        $data = json_decode($res->getBody(),true);
                        $this->callWith(
                            PaisSeeder::class,[
                                'data'=>$data,
                                'dependencies'=>[],
                                'next'=>CorrienteSeeder::class
                            ]
                        );
                    }
                }
            )
            ->wait();
        // $this->call('UsersTableSeeder');
    }
}
