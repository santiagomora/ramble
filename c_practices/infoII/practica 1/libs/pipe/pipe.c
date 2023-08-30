/**********************************************************************************************************************************
 *
 * @file		fifo.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/
#include "pipe.h"
/**
    \fn     creapipe
    \brief  crea el PIPE y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path direccion del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
int creapipe( int fd[2] ){
	if ( pipe( fd )<0 ){
		perror( "ERROR AL CREAR PIPE" );
		exit(1);
	} 
	return 0;
}

/**
    \fn     cierrapipe
    \brief  cierra el fd del PIPE 
    \author Luis Mora
    \date 02-05-2020
    \param [in] int fd file descriptor del pipe
    \return 0 si hay exito, 1 si es interrumpido;
*/
int cierrapipe( int fd ){
	if ( close( fd )<0 ){
            perror( "ERROR AL REMOVER PIPE" );
            exit(1);
        }
	return 0;
}
