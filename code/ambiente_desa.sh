#!/bin/bash

cd /var/www/html/FrontEnd
composer install
rm -Rf var/cache/*
chmod 777 -Rf var/cache
chmod 777 -Rf var/logs
