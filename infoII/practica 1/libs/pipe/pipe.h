#ifndef PIPE_H
#define PIPE_H
// PIPE_H

/*********************************************************************************************************************************
 *
 * @file		pipe.h
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
#include "../iofd/iofd.h"

#ifndef ERRNO
#define ERRNO
    int errno;
#endif

/**
    \fn     creapipe
    \brief  crea la PIPE y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] cha* path direccion del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
	int creapipe( int fd[2] );

/**
    \fn     cierrapipe
    \brief  cierra el PIPE y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] int fd file descriptor del pipe
    \return 0 si hay exito, 1 si es interrumpido;
*/
	int cierrapipe( int fd );

#endif // PIPE_H

