/**********************************************************************************************************************************
 *
 * @file		mkey.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/

#include "mkey.h"

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
key_t creallave( char* keypath, char key  ){
        key_t fkey;
        if ( ( fkey = ftok( keypath,key ) )<0 ){
                perror("ERROR GENERANDO LLAVE");
                exit(1);
        }
        return fkey;
}

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
int generaref( char* path ){
        umask(0);
        int fd = open( path,O_CREAT,S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH );
        if ( close( fd )<0 ){
            perror("ERROR VERIFICANDO ARCHIVO");
            exit(1);
        }
        return 0;
}

