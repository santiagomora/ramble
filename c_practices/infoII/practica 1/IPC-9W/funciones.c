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
    \fn     iniciaMSJ
    \brief  inicializa la estructura mensaje
    \author Luis Mora
    \date 02-05-2020
    \param [in] tipo de mensaje
    \param [in] texto de mensaje
    \param [out] mensaje
    \return estructura con el mensaje;
*/
struct msj iniciamensaje( int type,char* text ){
    time_t tm;
    time(&tm);
    struct msj aux;
    aux.mtype = type;
    strcpy( aux.mtext,text );
    strcpy( aux.fecha,ctime( &tm ) );
    return aux;
}
/**
    \fn     envia
    \brief  Envia el mensaje a la cola.
    \author Luis Mora
    \date 02-05-2020
    \param [in]
    \param [in]
    \param [out]
    \return 0 si hay exito, 1 si hay un error de envio;
*/
int envia( int type, char* txt,int cid ){
    struct msj m= iniciamensaje( type,txt );
    escribemensaje( cid,&m,sizeof( struct msj ),0 );
    printf( "Mensaje de tipo [%ld] enviado: %s\n",m.mtype,m.mtext );
    return 0;
}
 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     solicita
    \brief  Envia el mensaje a la cola luego de realizar los chequeos:
            que no exceda los 100 caracteres (BUFSIZE) y que el tipo de
            mensaje sea entero entre 0 y 100 inclusive.
    \author Luis Mora
    \date 02-05-2020
    \param [in] fkey la llave del archivo asociado a la cola
    \param [in] cid el id de la cola
    \param [out]
    \return 0 si hay exito, 1 si la cola es eliminada;
*/
int solicita( int cid ){
    int type,len;
    char buf[BUFSIZE];
    while ( 1 ){
        printf("INTRODUZCA EL TIPO DE MENSAJE 0-100.\n100 PARA ELIMINAR LA COLA Y SALIR:\n");
        //no permitimos 0 por potenciales errores de atoi (lectura de char).
        type = atoi( fgets( buf,BUFSIZE,stdin ) );
        if ( type>MINTYPE && type<=MAXTYPE ){
            printf( "INTRODUZCA EL MENSAJE(1-100 CARACTERES):\n" );
            fgets( buf,BUFSIZE,stdin );
            len = strlen(buf);
            if ( len>0 && len<BUFSIZE )
                envia( type,buf,cid );
            else {
                printf("ERROR: MENSAJE EXCEDE LONGITUD MAXIMA (100)\n");
                //eliminar exceso
                while ( fgetc( stdin ) != '\n');
            }
        } else
            printf("ERROR: MENSAJE EXCEDE RANGO (1-100)\n");
    }
}
