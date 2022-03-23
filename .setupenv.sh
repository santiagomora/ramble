#!/bin/bash

ugroup=$(id -g -n)
uname=$(id -u -n)
envf="$1/.env"

if [ $# -ne 7 ]
then 
	printf "ERROR: expecting 7 arguments, got $#.\n"
	exit 1
fi

if [ -f $envf ]
then
	printf "ERROR: there already exists a .env file. if you want to continue delete it and execute this command again.\n"
	exit 1
fi

cat > $envf << EOENV
LUMEN_DIR=./api
LUMEN_HOST=localhost
LUMEN_PORT=8080
DEFAULT_USR=$uname
DEFAULT_GRP=$ugroup
MARIADB_DATABASE=$2
MARIADB_ROOT_PASSWORD=$5
MARIADB_USER=$3
MARIADB_HOSTNAME=$6
MARIADB_PASSWORD=$4
MARIADB_PORT=$7
EOENV
printf "SUCCESS: env configured correctly at '$envf'\n"
exit 0
