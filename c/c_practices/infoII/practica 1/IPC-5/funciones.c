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

/***********************************************************************************************************************************
 *** PROTOTIPO DE FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

 /***********************************************************************************************************************************
 *** FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     imprimeMsj
    \brief  Muestra los mensajes por salida estandar
    \author Luis Mora
    \date 02-05-2020
    \param [in] buf es el mensaje guardado en el buffer
    \return void;
*/
void imprimeMsj( struct msj buf ){
    printf("\
       Inicio Mensaje:\n\
           Random:%d\n\
           PID:%d\n\
           Mensaje:%s\n\
           Fecha:%s\
       Fin mensaje.\n",
           buf.rand,buf.chpid,buf.msj,buf.fecha
    );
}

/**
    \fn     iniciaMsj
    \brief  Inicializa la estructura msj que sera enviada
    \author Luis Mora
    \date 02-05-2020
    \param [in] numero random generado por el proc hijo
    \param [in] pid del proceso hijo
    \param [in] contador para armar el mensaje
    \param [in] estructura para obtener fecha
    \param [out] mensaje inicializado
    \return struct msj;
*/
struct msj iniciaMsj( int rand, pid_t pid, int ctr, time_t* tm ) {
    struct msj aux = ( struct msj ){
        .rand=rand,
        .chpid=pid
    };
    sprintf( aux.msj,"Mensaje %d.",ctr+1 );
    strcpy( aux.fecha,ctime( tm ) );
    return aux;
}

/**
    \fn     handlerHijo
    \brief  Escribe TIEMPO_DE_VIDA mensajes en el pipe
            para que sean leidos por el padre.
    \author Luis Mora
    \date 02-05-2020
    \param [in] recibe el fd para escribir en el pipe
    \return void
*/
void handlerHijo( int fd ){
    struct msj msj;
    time_t tm;
    srand( time( &tm ) );
    for ( int ctr=0; ctr<TIEMPO_DE_VIDA; ctr++ ){
        time( &tm );
        msj = iniciaMsj( rand()%LIMSUP+LIMINF,getpid(),ctr,&tm );
        escribefd( fd,&msj,sizeof( struct msj ) );
        sleep(1);
    }
    cierrapipe( fd );
    exit(0);
}

/**
    \fn     handlerPadre
    \brief  Lee TIEMPO_DE_VIDA mensajes escritos
            por el proceso hijo en el pipe.
    \author Luis Mora
    \date 02-05-2020
    \param [in] recibe fd para leer del pipe
    \return void
*/
void handlerPadre( int fd ){
    int ctr=0;
    struct msj buf;
    while( ctr<TIEMPO_DE_VIDA ){
        leefd( fd,&buf,sizeof( struct msj ) );
        ctr++;
        imprimeMsj( buf );
    }
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     crearHijo
    \brief  Crea el pipe y el proceso hijo de escritura.
    \author Luis Mora
    \date 02-05-2020
    \return 0 si hay exito, 1 si hay error;
*/
int crearHijo( ){
    int pipefd[2];
    creapipe( pipefd );
    if ( fork() )
        handlerPadre( pipefd[0] );
    else
        handlerHijo( pipefd[1] );
    cierrapipe( pipefd[0] );
    exit(0);
}
