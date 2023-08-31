#include "iofd.h"

/**
    \fn     escribe
    \brief  escribe y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] int fd file descriptor del fifo
    \param [in] void* msj mensaje del fifo
    \param [in] ssize_t size tamaño del mensaje a escribir
    \return 0 si hay exito, 1 si hay error de lectura;
*/
ssize_t escribefd( int fd, void* msj ,size_t size  ) {
	ssize_t sz;
        if ( ( sz = write( fd,msj,size ) ) <0 ) {
            perror( "ERROR AL ESCRIBIR" );
            exit(1);
	}
	return sz;
}

/**
    \fn     lee
    \brief  lee y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] int fd file descriptor del fifo
    \param [in] void* msj mensaje del fifo
    \param [in] ssize_t size tamaño del mensaje a leer
    \return 0 si hay exito, 1 si hay error de lectura;
*/
ssize_t leefd( int fd, void* msj ,size_t size  ) {
	ssize_t sz;
        if ( ( sz = read( fd,msj,size ) )<0 ) {
            perror( "ERROR AL LEER" );
            exit(1);
	}
	return sz;
}

