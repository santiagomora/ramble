#ifndef FIFO_H
#define FIFO_H
// FIFO_H

/*********************************************************************************************************************************
 *
 * @file		fifo.h
 * @brief		Breve descripción del objetivo del Módulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/
#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <wait.h>
#include <errno.h>
#include <time.h>
#include <string.h>
#include <signal.h>
#include <sys/stat.h>
#include "../iofd/iofd.h"

#ifndef ERRNO
#define ERRNO
    int errno;
#endif

/**
    \fn     creafifo
    \brief  crea la FIFO y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] cha* path direccion del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
	int creafifo( char *path );

/**
    \fn     cierrafifo
    \brief  cierra la FIFO y quita el archivo, y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path direccion del fifo
    \param [in] int fd file descriptor del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
	int cierrafifo( char* path, int fd );
	
/**
    \fn     abrefifo
    \brief  abre la FIFO y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path direccion del fifo
    \param [in] int fd file descriptor del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
	int abrefifo( char* path,int mode  );

#endif // FIFO_H

