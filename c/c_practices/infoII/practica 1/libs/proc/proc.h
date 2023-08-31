#ifndef PROC_H
#define PROC_H
// PROC_H

/*********************************************************************************************************************************
 *
 * @file		proc.h
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
#include <signal.h>

#ifndef ERRNO
#define ERRNO
    int errno;
#endif

/**
    \fn  imprimirHijo
    \brief  Imprime los mensajes desde el hijo cada
            1 segundo, a los 5 segundos termina.
    \author Luis Mora
    \date 02-05-2020
    \param [in, id del proceso] pid_t pid
    \param [out]
    \return 0 si hay exito, 1 si es interrumpido;
*/
	int imprimirHijo( int lim );

/**
    \fn  esperarHijos
    \brief  Espera la finalizacion de los procesos hijo,
            y los finaliza para que no queden en estado zombie
    \author Luis Mora
    \date 02-05-2020
    \param [in]
    \param [in]
    \param [out]
    \return 0 si hay exito, 1 si hay un error;
*/
	int esperarHijos( void );

/**
    \fn     handlerHijo
    \brief  Inicia los procesos hijo
    \author Luis Mora
    \date 02-05-2020
    \param [in] int hi upper bound for rand generation
    \param [in] int lo lower bound for rand generation
    \param [out]
    \return 0 si hay exito, 1 si hay un error;
*/
	int handlerHijo( int hi, int lo );

#endif // PROC_H

