#include "funciones.h"

int main( int argc, char**argv )
{
    int pos,val;
    if ( argc==2 ){
        val = (pid_t) atoi( argv[1] ); //PID
        if ( kill( val,SIGUSR1 )<0 ){
            perror("ERROR ENVIANDO SEÑAL")   ;
            exit(1);
        }
    } else if ( argc== 3){
        pos = atoi( argv[1] );
        val = atoi( argv[2] );
        conecta(
            pos<=0 ? 1 : pos>SHMSIZE ? SHMSIZE : pos,
            val
        );
    } else {
        fprintf( stderr,"SOLO PUEDE INTRODUCIR 1 O 2 ARGUMENTOS." );
        exit(1);
    }
    exit(0);
}
