#include "funciones.h"

int main() {
    creafifo( FIFOPATH );
    printf("FIFO CREADA. ESPERANDO RECEPCION:\n");
    enviar();
    exit(0);
}
