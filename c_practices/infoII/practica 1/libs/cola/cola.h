#ifndef COLA_H
#define COLA_H // COLA_H
/*********************************************************************************************************************************
 *
 * @file		cola.h
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
#include <sys/msg.h>
#include <sys/stat.h>
#include <sys/signal.h>
#include "../mkey/mkey.h"

#ifndef ERRNO
#define ERRNO
    int errno;
#endif

/**
    \fn     eliminacola
    \brief  elimina la cola
    \author Luis Mora
    \date 02-05-2020
    \param [in] señal SIGINT
    \return 0 si hay exito, 1 si hay una error al eliminar la cola;
*/
	void eliminacola( int cid );

/**
    \fn     leermensaje
    \brief  Chequea si recibe el mensaje de tipo 100 para finalizar
            su ejecucion y eliminar la cola.
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay errores recibiendo mensajes;
*/
	ssize_t leemensaje( int colaid, void* buf, size_t size, long type, int flag  );

/**
    \fn     creacola
    \brief  Intenta conectarse a la cola.
            si ya esta creada, se conecta y espera mensajes
            si no fue creada, presenta error en la salida correspondiente
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay error creando la cola o la llave;
*/
	int obtencola( char* keypath, char key  );

/**
    \fn     enviamensaje
    \brief  Envia el mensaje a la cola.
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay error creando la cola o la llave;
*/
	int escribemensaje( int cid, void* msj, size_t size, int flag );

#endif // COLA_H

