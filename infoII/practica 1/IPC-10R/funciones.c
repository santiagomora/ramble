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
int shid;
/***********************************************************************************************************************************
 *** PROTOTIPO DE FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

 /***********************************************************************************************************************************
 *** FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     inthandler
    \brief  maneja las interrupciones mientras se lee el segmento de memoria
            para que no quede abierta luego. Elimina el segmento para que no
            presente errores en la proxima ejecucion.
    \author Luis Mora
    \date 02-05-2020
    \param [in] señal SIGINT
    \return 0 si hay exito, 1 si hay una error;
*/
void inthandler( int sig ){
    eliminashm( shid );
}

/**
    \fn     imprimemem
    \brief  imprime valores almacenados en memoria compartida
    \author Luis Mora
    \date 02-05-2020
    \param [in] mem direccion de memoria compartida
    \param [out]
    \return 0 si hay exito, 1 si hay un error al enviar el mensaje,
              al obtener la cola o al generar la llave;
*/
void imprimemem( int* mem ){
    int sum=0;
    for (int ctr =0; ctr<SHMSIZE; ctr++){
        printf("valor[%d]: %d\n",ctr+1,mem[ctr]);
        sum+=mem[ctr];
    }
    printf("-----------------------------\n");
    printf("SUMATORIA: %d\n",sum);
}

/**
    \fn     enganchashm
    \brief  engancha los SHMSIZE enteros random generados a la
            memoria aleatoria
    \author Luis Mora
    \date 02-05-2020
    \param [in] text el texto del mensaje
    \param [out]
    \return 0 si hay exito, 1 si hay un error al enviar el mensaje,
              al obtener la cola o al generar la llave;
*/
int lee( int id ){
    int* val = ( int* ) enganchashm( shid,NULL,SHM_RDONLY );
    printf("MEMORIA COMPARTIDA LEIDA\n");
    imprimemem( val );
    desenganchashm( val );
    eliminashm( id );
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/
/**
    \fn     iniciaMSJ
    \brief  inicializa la estructura mensaje
    \author Luis Mora
    \date 02-05-2020
    \param [in] type el tipo del mensaje
    \param [in] text el texto del mensaje
    \param [out] struct msj inicializada
    \return 0 si hay exito, 1 si hay un error;
*/
int conecta( void ){
    signal( SIGINT,inthandler );
    shid = conectashm( KEYFILE,SHMSIZE*sizeof( int ),PRKEY,0 );
    lee( shid );
    exit(0);
}
