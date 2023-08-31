#!/bin/sh
composer install 
php artisan migrate
php -S 0.0.0.0:8080 -t ./public
