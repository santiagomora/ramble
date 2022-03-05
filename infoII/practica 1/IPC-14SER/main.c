#include "funciones.h"

int main( int argc, char** argv ){
    if ( argc >=2 ){
        levantar( argv[1] );
    } else {
        fprintf(stderr,"DEBE PASAR 2 O MAS ARGUMENTOS\n");
        exit(1);
    }
    return 0;
}
