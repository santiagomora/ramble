#include "funciones.h"

int main( int argc, char**argv )
{
    if ( argc==2 ){
        if ( ( kill( (pid_t) atoi( argv[1] ) ,SIGUSR1 ) )<0 ){
            perror("ERROR ENVIANDO SEÑAL")   ;
            exit(1);
        }
    } else
        reescribe();
    exit(0);
}
