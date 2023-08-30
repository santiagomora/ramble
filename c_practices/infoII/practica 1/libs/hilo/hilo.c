/**********************************************************************************************************************************
 *
 * @file		hilo.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/

#include "hilo.h"

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
int creahilo( pthread_t* thr, void* (* funcptr)( void* ), void* ax ){
	if ( pthread_create( thr,NULL,funcptr,ax ) != 0 ){
		perror("ERROR AL CREAR THREAD");
		exit(1);
	}
	return 0;
}

/**
    \fn     juntarhilo
    \brief  junta los hilos
    \author Luis Mora
    \date   06-05-2020
    \param [in] pthread_t* thr el thread a unir
    \return 0 si hay exito, 1 si hay un error;
*/
int juntarhilo( pthread_t thr ){
	if( pthread_join( thr,NULL )!=0 ){
		perror("ERROR UNIENDO THREAD");
		exit(1);
	}
	return 0;
}
