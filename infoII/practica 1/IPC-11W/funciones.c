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
int shid,*val;
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
    \fn     inthandler
    \brief  elimina segmento ante interrupciones
    \author Luis Mora
    \date   02-05-2020
    \param  [in] señal SIGINT
    \return 0 si hay exito, 1 si hay una error al liberar el segmento;
*/
void inthandler( int sig ){
    desenganchashm( val );
    eliminashm( shid );
}

/**
    \fn     aleatorios
    \brief  genera 10 numeros aleatorios
    \author Luis Mora
    \date   02-05-2020
    \param  [in] int* res direccion donde guardar
    \return direccion con valores.
*/
int* aleatorios( int* res ){
    srand( time( NULL ) );
    for ( int ctr = 0; ctr<SHMSIZE; ctr++ )
        res[ctr]=rand()%100 + 1;
    return res;
}

/**
    \fn     imprimemem
    \brief  imprime valores almacenados en memoria compartida
    \author Luis Mora
    \date   02-05-2020
    \param  [in] *v mem direccion de memoria compartida
*/
void imprimemem( int* v ){
    printf("Valores: [");
    for ( int ctr =0; ctr<SHMSIZE; ctr++ ){
        printf("%d",v[ctr]);
        if (ctr != SHMSIZE-1)
            printf(",");
    }
    printf("], PID: %d\n",getpid());
}

/**
    \fn     escribe
    \brief  engancha los SHMSIZE enteros random generados a la
            memoria compartida
    \author Luis Mora
    \date   02-05-2020
    \return 0 si hay exito, 1 si hay un error enganchando a la memoria.
*/
int escribe( int id ){
    val = enganchashm( id,NULL,0 );
    printf("MEMORIA COMPARTIDA ESCRITA.\nVALORES ALMACENADOS:\n");
    val = aleatorios( val );
    while(1){
        imprimemem( val );
        sleep(5);
    }
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     conectaSHM
    \brief  inicializa la memoria compartida
    \author Luis Mora
    \date   02-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
int conecta( void ){
    signal( SIGUSR1,inthandler );
    signal( SIGINT,inthandler );
    shid = conectashm( KEYFILE,PRKEY,SHMSIZE*sizeof( int ),IPC_CREAT|S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH );
    escribe( shid );
    return 0;
}
