#!/bin/bash

shopt -s extglob

show_usage(){
	printf "\nMONTH CALENDAR - USAGE:\tmc [MODE] \n\n"
	printf "\t[MODE]:\t-g[M]: [M]: 1-12 month. Creates calendar file. \n"
	printf "\t[MODE]:\t-l[MMYYYY]: [MMYYYY]: 1-12 month. and long year. Opens calendar file in vim. \n\n"
	exit 0
}

edit_hours(){
	if [ -f $1 ]
	then
		vim $1;
	else
		echo "ERROR: $1 not found."
	fi	

}

case "$#$1" in 
	1-g+(*) ) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/mc/generate_month_template.py" "${1/-g/}" ;;
	1-l+(*) ) edit_hours "$HOME/horas/${1/-l/}"  ;;
	*	) show_usage ;;
esac
