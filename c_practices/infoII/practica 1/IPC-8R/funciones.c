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
    \fn     inthandler
    \brief  maneja las interrupciones mientras se lee la cola de mensaje
            para que no quede abierta luego.
    \author Luis Mora
    \date 02-05-2020
    \param [in] el codigo de la señal SIGINT
    \return 0 si hay exito, 1 si no puede eliminar la cola;
*/
void inthandler( int sig ){
    eliminacola( cid );
}

/**
    \fn     leer
    \brief  Abre el FIFO y lee los numeros aleatorios escritos
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay error de recepcion;
*/
int leer( int id ){
    struct msj buf;
    for ( int ctr=0; ctr<CANTMSJ; ctr++ ){
        leemensaje( id,&buf,sizeof( struct msj ),1,0 );
        printf( "Mensaje [%d] recibido: %s\n",ctr+1,buf.mtext );
    }
    eliminacola( id );
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     crear
    \brief  Crea la cola de mensajes y espera hasta que se reciban 5 mensajes.
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 un error al obtener la cola o generar la llave;
*/
int crear( ){
    signal( SIGINT,inthandler );
    cid = obtencola( KEYFILE,PRKEY );
    printf( "ESPERANDO MENSAJE:\n" );
    leer( cid );
    return 0;
}