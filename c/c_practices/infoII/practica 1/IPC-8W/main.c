#include "funciones.h"

int main( int argc, char** argv )
{
    char err[20];
    if ( argc==2&&strlen(argv[1])<BUFSIZE )
        escribir( argv[1] );
    else {
        strcpy(
            err,
            argc==2
            ? "MESSAGE TOO LONG. MAX: 100 CHAR\n"
            : "ERROR:NOT ENOUGH OR TOO MANY ARGUMENTS\n"
        );
        fputs( err,stderr );
        exit(1);
    }
    exit(0);
}
