#!/bin/bash

wd=$(pwd)
db="pic_api_DB"
dbuser="pic_api_USR"
dbuserpwd="pic_api_PWD"
dbhost="pic_api_mariadb"
dbrootpwd="root"
dbport=3306

declare -A envconf;
envconf[$wd]="$db $dbuser $dbuserpwd $dbrootpwd $dbhost $dbport"
envconf[$wd/api]="$db $dbuser $dbuserpwd $dbhost $dbport"

printf "\n"

env(){
	for wdir in ${!envconf[@]}; 
	do
		confscript="$wdir/.setupenv.sh"
		if [ -x $confscript ]
		then
			printf "NOTICE: configuration script discovered: $confscript.\n"
			eval "$confscript $wdir ${envconf[$wdir]}"
		else 
			printf "ERROR: configuration script not found or doesnt have execution permissions: $confscript.\n"
		fi
	done
}

clean(){
	for wdir in ${!envconf[@]}; 
	do
		envf="$wdir/.env"
		if [ -f $envf ]
		then
			printf "NOTICE: ENV file discovered: $envf. REMOVING...\n"
			rm $envf
		else 
			printf "ERROR: env file not found: $envf.\n"
		fi
	done
}

case $#$1 in 
	1clean	) clean;;
	1env	) env;;
	*	) printf "Expected 1 parameter: 'clean' or 'env'";;
esac

