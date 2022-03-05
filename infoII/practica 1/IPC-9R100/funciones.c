/**********************************************************************************************************************************
 *
 * @file		funciones.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/
#include "funciones.h"

/***********************************************************************************************************************************
 *** DEFINES PRIVADOS AL MODULO
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** MACROS PRIVADAS AL MODULO
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** TIPOS DE DATOS PRIVADOS AL MODULO
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** TABLAS PRIVADAS AL MODULO
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** VARIABLES GLOBALES PUBLICAS
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** VARIABLES GLOBALES PRIVADAS AL MODULO
 **********************************************************************************************************************************/
int cid;
/***********************************************************************************************************************************
 *** PROTOTIPO DE FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

 /***********************************************************************************************************************************
 *** FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     elimCOLA
    \brief  maneja las interrupciones mientras se lee la cola de mensaje
            para que no quede abierta luego. Elimina la cola para que no
            presente errores en la proxima ejecucion. es el unico entre los
            3 (de la seria IPC-9*) que tiene esta facultad.
    \author Luis Mora
    \date 02-05-2020
    \param [in] señal SIGINT
    \param [out]
    \return 0 si hay exito, 1 si hay una error al eliminar la cola;
*/
void inthandler( int sig ){
    eliminacola( cid );
}

/**
    \fn     recibir
    \brief  Chequea si recibe el mensaje de tipo 100 para finalizar
            su ejecucion y eliminar la cola.
    \author Luis Mora
    \date 02-05-2020
    \param [in] int id de la cola
    \return 0 si hay exito, 1 si hay errores recibiendo mensajes;
*/
int recibir( int id ){
    struct msj buf;
    printf( "ESPERANDO MENSAJE DE TIPO 100:\n" );
    if ( leemensaje( id,&buf,sizeof( struct msj ),MSGTYPE,0 )>=0 ){
        printf("MENSAJE RECIBIDO:%sELIMINANDO COLA\n",buf.mtext );
        eliminacola( id );
    }
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     esperar
    \brief  Intenta conectarse a la cola.
            si ya esta creada, se conecta y espera mensajes
    \author Luis Mora
    \date 02-05-2020
    \return 0 si hay exito, 1 si hay error creando la cola o la llave;
*/
int esperar( ){
    signal( SIGINT,inthandler );
    cid = obtencola( KEYFILE,PRKEY );
    recibir( cid );
    exit(0);
}
