#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>

#ifndef ERRNO 
#define ERRNO 
    int errno; 
#endif 

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
	ssize_t escribefd( int fd, void* msj ,size_t size  );

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
	ssize_t leefd( int fd, void* msj ,size_t size  );
