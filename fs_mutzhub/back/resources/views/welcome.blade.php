<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }
            .app-title{
                color:#22b295;
                font-weight:bold;
                text-shadow: 2px 0 0 #b2223f,
                    -2px 0 0 #b2223f,
                    0 2px 0 #b2223f,
                    0 -2px 0 #b2223f,
                    1px 1px #b2223f,
                    -1px -1px 0 #b2223f,
                    1px -1px 0 #b2223f,
                    -1px 1px 0 #b2223f;
            }
            .bolder{
                font-weight:bold;
                font-size:48px;
            }
            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height" style="flex-direction:column">
            <h1 class="nomargin app-title bolder">
                the mutz hub.
            </h1>
            <div>
                <a href="https://github.com/santiagomora/mutz-hub-back"
                    target="_blank"
                    style="margin:15px">
                    Repository
                </a>
                <a href="https://mutz-hub.herokuapp.com"
                    target="_blank"
                    style="margin:15px">
                    Deployment
                </a>
            </div>
        </div>
    </body>
</html>
