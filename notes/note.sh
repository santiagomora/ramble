#!/bin/bash

shopt -s extglob

show_usage(){
        printf "\nNote tool - USAGE: note [action] [action arguments]\n\n"
        printf "  -a[theme] [action=view-notes]:\n\t opens vim editor to add note related to theme\n\n"
        printf "  -e[theme?]-[index?] [action=edit-note]:\n\t\tif there is no [theme] set, opens vim editor on last modified note.\n\t\tif [theme] is set, and no [index], opens vim editor on [theme] last modified note,\n\t\tif [theme] and [index] are set, open vim editor of [index]th modified note\n\n"
        printf "  -l[theme?] [action=list-notes/list-themes]:\n\t list all notes related to a theme, if there is no theme, list all themes\n\n"
        printf "  -v[theme|note] [action=view-notes]:\n\t shows in console all note contents related with [theme] or a single [note]\n\n"
        printf "  -g[theme] [...files] [action=group-into-theme]:\n\texpects a theme and a list of regular text files to be associated with that theme. \n\n"
        printf "  -x[note] [action=explode]:\n\texpects a note to be divided into several other notes using =============== as separator. \n\n"
        exit 0
}

case "$#$1$2" in
        1-a+(*) 	) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/notes/main.py" "add-note" "${1/-a/}" && exit;;
        1-x+(*) 	) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/notes/main.py" "explode" "${1/-x/}" "===============" && exit;;
        1-e+(*) 	) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/notes/main.py" "edit-note" "${1/-e/}" && exit;;
        1-l+(*) 	) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/notes/main.py" "list-notes" "${1/-l/}" && exit;;
   [0-9]*-g+(*) 	) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/notes/main.py" "group-into-theme" "${@/$1/${1/-g/}}" && exit;;
        1-v+(*) 	) source "$HOME/bin/python/bin/activate" && python3 "$HOME/bin/python/src/notes/main.py" "view-notes" "${1/-v/}" && exit;;
              * 	) show_usage ;;
esac
