#!/bin/bash

envf="$1/.env"

if [ $# -ne 6 ]
then 
	printf "ERROR: expecting 6 arguments, got $#.\n"
	exit 1
fi

if [ -f $envf ]
then
	printf "ERROR: there already exists a .env file. if you want to continue delete it and execute this command again.\n"
	exit 1
fi

touch $envf

cat > $envf << EOENV
APP_NAME=Lumen
APP_NAME=Lumen
APP_ENV=local
APP_KEY=$(openssl rand -base64 24)
APP_DEBUG=true
DB_DATABASE=$2
DB_PASSWORD=$4
DB_USERNAME=$3
APP_TIMEZONE=UTC
LOG_CHANNEL=stack
DB_CONNECTION=mysql
DB_HOST=$5
DB_PORT=$6
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
LOG_SLACK_WEBHOOK_URL=
EOENV
printf "SUCCESS: env configured correctly at '$envf'.\n"
exit 0
