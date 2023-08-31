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
int imp=0;
int sum=0;
long long int pro=1;
/***********************************************************************************************************************************
 *** PROTOTIPO DE FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

 /***********************************************************************************************************************************
 *** FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     imprimir
    \brief  cuenta impares del arreglo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int tg el arreglo del que se cuentan los impares
    \param [in] int size el tamaño del arreglo a sumar
    \return 0 si hay exito, 1 si hay un error;
*/
void imprimir( struct arg* arg ){
    printf("VALORES: [");
    for ( int i=0; i<arg->size; i++ ){
        printf("%d",arg->target[i]);
        if ( i!=arg->size-1 )
            printf(",");
        else
            printf("]. SUMADO: %d.\n",arg->value);
    }
}

/**
    \fn     suma
    \brief  suma los elementos del arreglo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int* tg el arreglo a sumar
    \param [in] int size el tamaño del arreglo a sumar
    \return 0 si hay exito, 1 si hay un error;
*/
void* suma( void* arg ){
    struct arg* val = ( struct arg* ) arg;
    for ( int i = 0; i<val->size; i++ ){
        val->target[i]+=val->value;
    }
    return arg;
}

/**
    \fn     hilo
    \brief  crea los hilos sobre cada funcion
    \author Luis Mora
    \date   06-05-2020
    \param [in] void*( *func ) apuntador a funcion que opera sobre el arreglo
    \param [in] int* tg arreglo
    \param [in] int size tamaño del arreglo
    \return 0 si hay exito, 1 si hay un error;
*/
int hilo( struct arg tg ){
    struct arg aux;
    int chunk = tg.size/NUMHI;
    pthread_t* thr = malloc( sizeof( pthread_t )*NUMHI );
    for ( int i=0; i<NUMHI; i++ ){
        aux.target = tg.target+i*chunk;
        aux.size = chunk;
        aux.value = tg.value;
        creahilo( &thr[i],suma,&aux );
        juntarhilo( thr[i] );
        imprimir( &aux );
    }
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     operar
    \brief  realiza las operaciones sobre el arreglo
    \author Luis Mora
    \date   06-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
int operar( int* tg,int size ){
    struct arg ini = ( struct arg ){
        .target=tg,
        .size=size,
        .value=0
    };
    printf("INICIAL:\n");
    imprimir( &ini );
    for ( int k=0; k<NUMHI; k++ ){
        ini.value = k+1;
        hilo( ini );
    }
    ini.target = tg;
    printf("FINAL:\n");
    imprimir( &ini );
    exit(0);
}
