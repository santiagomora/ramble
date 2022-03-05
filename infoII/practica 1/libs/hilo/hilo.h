#ifndef HILO_H
#define HILO_H // HILO_H

/*********************************************************************************************************************************
 *
 * @file		hilo.h
 * @brief		Breve descripción del objetivo del Módulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

#ifndef ERRNO
#define ERRNO
    int errno;
#endif
/**
    \fn     creahilo
    \brief  crea un hilo sobre cada funcion
    \author Luis Mora
    \date   06-05-2020
    \param [in] void*( *func ) apuntador a funcion que opera sobre el arreglo
    \param [in] int* tg arreglo
    \param [in] int size tamaño del arreglo
    \return 0 si hay exito, 1 si hay un error;
*/
	int creahilo( pthread_t* thr, void* (* funcptr)( void* ), void* ax );

/**
    \fn     juntarhilo
    \brief  junta los hilos
    \author Luis Mora
    \date   06-05-2020
    \param [in] pthread_t* thr el thread a unir
    \return 0 si hay exito, 1 si hay un error;
*/
	int juntarhilo( pthread_t thr );

#endif // HILO_H

