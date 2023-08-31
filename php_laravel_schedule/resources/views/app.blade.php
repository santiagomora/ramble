<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
        <!-- Styles -->
        <link href="{{ asset('css/styles.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('fontawesome-free-5.9.0-web/css/all.css') }}" rel="stylesheet"/>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body style="overflow:hidden">
        <script type = "text/javascript">
            const sidebar = {!!
                json_encode (
                    [//get on user login, assign according to permissions
                        [
                            'data'=> "1",
                            'disabled'=> false,
                            'title'=> "Reservaciones",
                            'route'=> 'escritorio/reservas',
                            'permission' => [1,2,3],
                            'sub'=> []
                        ],
                        [
                            'data'=> "2",
                            'title'=> "Horarios",
                            'disabled'=> false,
                            'route'=> 'escritorio/horarios',
                            'permission' => [1,2,3],
                            'sub'=> []
                        ],
                        [
                            'title'=> 'Feriados',
                            'route'=> 'escritorio/feriados',
                            'data'=> "3",
                            'disabled'=> false,
                            'permission' => [1,2,3],
                            'sub'=>[]
                        ],
                        [
                            'data'=> "3",
                            'disabled'=> false,
                            'title'=> "Ubicaciones",
                            'route'=> 'escritorio/ubicaciones',
                            'permission' => [1,2,3],
                            'sub'=> []
                        ],
                        [
                            'data'=> "4",
                            'disabled'=> false,
                            'title'=> "Eventos",
                            'route'=> 'escritorio/eventos',
                            'permission' => [1,2,3],
                            'sub'=> []
                        ],
                        [
                            'data'=> "5",
                            'disabled'=> false,
                            'title'=> "Promociones",
                            'route'=> 'escritorio/promociones',
                            'permission' => [1,2,3],
                            'sub'=> []
                        ],
                        [
                            'data'=> "6",
                            'disabled'=> false,
                            'title'=> "Locales",
                            'route'=> 'escritorio/locales',
                            'permission' => [1,2],
                            'sub'=> []
                        ],
                        [
                            'data'=> "7",
                            'disabled'=> false,
                            'title'=> "Configuración",
                            'route'=> 'escritorio/configuracion',
                            'permission' => [1,2,3],
                            'sub'=> [
                                [
                                    'title'=>"Establecimiento",
                                    'to'=> '/configuracion/establecimiento',
                                    'route'=>'configuracion',
                                    'data'=>"0",
                                    'permission' => [3],
                                    'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                                ],
                                [
                                    'title'=>"Usuario",
                                    'to'=> '/configuracion/usuario',
                                    'route'=>'configuracion',
                                    'data'=>"1",
                                    'permission' => [1,2,3],
                                    'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                                ],
                                [
                                    'title'=> "Reservas",
                                    'to'=> '/configuracion/reservas',
                                    'route'=>'configuracion',
                                    'data'=> "2",
                                    'permission' => [3],
                                    'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                                ]
                            ]
                        ],
                        [
                            'data'=> "8",
                            'route'=> 'franquicias',
                            'permission' => [1],
                            'disabled'=> false,
                            'title'=> "Franquicias",
                            'sub'=> []
                        ]
                    ]
                )
            !!};
        </script>
        <div id="app-container" >
        </div>
    </body>
    <script src="{{asset('js/app.js')}}"></script>
</html>
