#include "funciones.h"

int main() {
    creafifo( FIFOPATH );
    printf("FIFO CREADA. ESPERANDO MENSAJE:\n");
    abrir();
    exit(0);
}
