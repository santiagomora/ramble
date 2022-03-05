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

#include "fifo.h"

/**
    \fn     creafifo
    \brief  crea la FIFO y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path direccion del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
int creafifo( char *path ){
	umask(0);	
	if ( mkfifo( path,O_CREAT|S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH )<0 ){
		perror("ERROR AL CREAR FIFO");
		exit(1);
	}
	return 0;
}

/**
    \fn     cierrafifo
    \brief  cierra la FIFO y quita el archivo, y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path direccion del fifo
    \param [in] int fd file descriptor del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
int cierrafifo( char* path, int fd ){
	if ( close( fd )<0 || remove( path )<0 ){
            perror( "ERROR AL REMOVER FIFO" );
            exit(1);
        }
	return 0;
}

/**
    \fn     abrefifo
    \brief  abre la FIFO y maneja los errores
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path direccion del fifo
    \param [in] int fd file descriptor del fifo
    \return 0 si hay exito, 1 si es interrumpido;
*/
int abrefifo( char* path,int mode  ) {
	int fd;
	if ( ( fd = open( path,mode ) )<0 ) {
		perror( "ERROR AL ABRIR FIFO" );
		exit(1);
	}
	return fd;
}

