#ifndef SHMEM_H
#define SHMEM_H // SHMEM_H
/*********************************************************************************************************************************
 *
 * @file		shmem.h
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
#include <errno.h>
#include <string.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <sys/stat.h>
#include <signal.h>
#include "../mkey/mkey.h"

#ifndef ERRNO
#define ERRNO
    int errno;
#endif

/**
    \fn     enganchashm
    \brief  engancha a la memoria compartida    
    \author Luis Mora
    \date 02-05-2020
    \param [in] int shid el id de la memoria compartida
    \return 0 si hay exito, 1 si hay un error.
*/
	void* enganchashm( int shid,const void *addr,int flag );

/**
    \fn     desenganchashm
    \brief  desengancha de la memoria compartida    
    \author Luis Mora
    \date 02-05-2020
    \param [in] int shid el id de la memoria compartida
    \return 0 si hay exito, 1 si hay un error.
*/
	int desenganchashm( void *mem );

/**
    \fn     eliminashm
    \brief  elimina el segmento de memoria compartida    
    \author Luis Mora
    \date 02-05-2020
    \param [in] int shid el id de la memoria compartida
    \return 0 si hay exito, 1 si hay un error.
*/
	int eliminashm( int shid );

/**
    \fn     conectashm
    \brief  conecta a la memoria compartidainicializa la estructura mensaje
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path el path del archivo llave
    \param [in] int size el tamaño de la memoria a reservar  
    \param [in] char key el caracter para  
    \param [out] el id la memoria compartida
    \return 0 si hay exito, 1 si hay un error;
*/
	int conectashm( char* path,size_t size,char ckey,int flag  );

#endif // SHMEM_H

