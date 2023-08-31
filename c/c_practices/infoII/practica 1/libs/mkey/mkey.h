/**********************************************************************************************************************************
 *
 * @file		mkey.h
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/
#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <sys/ipc.h>

#ifndef ERRNO
#define ERRNO
	int errno;
#endif

/**
    \fn     creallave
    \brief  crea la llave asociada al archivo
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* keypath el path del archivo
    \param [in] char key asociado al archivo
    \param [out] key_t llave generada
    \return 0 si hay exito, 1 si hay error generando la llave;
*/
	key_t creallave( char* keypath, char key  );

/**
    \fn     generaref
    \brief  Crea el archivo con los permisos necesarios que necesita ftok
            para crear la llave si no existe,
            en caso de que exista, omitimos el error.
    \author Luis Mora
    \date 02-05-2020
            \param [in] path del archivo necesario para crear la llave
    \return 0 si hay exito, 1 si no puede cerrar el archivo. Presenta error si el archivo fue creado pero no lo reporta;
*/
	int generaref( char* path );

