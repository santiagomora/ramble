#ifndef SEMAF_H
#define SEMAF_H // SHMEM_H
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
#include <sys/signal.h>
#include <sys/sem.h>
#include <sys/stat.h>
#include "../mkey/mkey.h"

#ifndef ERRNO
#define ERRNO
    int errno;
#endif

#include "semaf.h"

/**
    \fn     construyesem
    \brief  construye las operaciones a realizar sobre los semaforos
            (en este caso solo hay 1) inicializandolo con un valor por defecto
    \author Luis Mora
    \date 02-05-2020
    \param [in] int semnum cantidad de semaforos sobre los que operar
    \param [in] const int semnum valores iniciales de cada uno de los semaforos
    \param [in] size_t size tamaño del espacio de memoria a reservar para los semaforos
    \param [out] struct sembuf* sem direccion de memoria de las operaciones
    \return struct sembuf*;
*/
	struct sembuf* construyesem( int semnum, int init , size_t size );

/**
    \fn     sumasem
    \brief  Realiza las operaciones sobre el semaforo
            guardado en sem[pos] dependiendo del valor pasado en val
    \author Luis Mora
    \date 02-05-2020
    \param [in] int semid id del semaforo
    \param [in] int size numero de semaforos que estamos usando (CANTSEM)
    \param [in] struct sembuf* ops operaciones a realizar sobre el semaforo
    \return 0 si hay exito, 1 si hay una error al realizar operacion;
*/
	int sumasem( int semid, size_t size, struct sembuf* ops );

/**
    \fn     operasem
    \brief  opera sobre el semaforo 
    \author Luis Mora
    \date 02-05-2020
    \param [in] int id el id del semaforo a leer
    \param [in] int pos la posicion del semaforo a leer
    \param [in] int action GETVAL
    \return 0 si hay exito, 1 si hay un error;
*/
	int operasem( int id, int pos, int action );

/**
    \fn     configsem
    \brief  lee el semaforo 
    \author Luis Mora
    \date 02-05-2020
    \param [in] int id el id del semaforo a leer
    \param [in] int pos la posicion del semaforo a leer
    \param [in] int action GETVAL
    \param [in] int value el valor a setear el semaforo
    \return 0 si hay exito, 1 si hay un error;
*/
	int configsem( int id, int pos,int action, int value );

/**
    \fn     creasem
    \brief  crea los cant semaforos 
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path el path del archivo asociado al semaforo
    \param [in] char key la llave para generar el semaforo
    \param [in] int flags el modo para crear el semaforo y permisos
    \param [in] int cant la cantidad de semagoros
    \return id de semaforo si hay exito, 1 si hay un error;
*/
	int creasem( char *path,char key,int flags, int cant );

#endif // SEMAF_H

