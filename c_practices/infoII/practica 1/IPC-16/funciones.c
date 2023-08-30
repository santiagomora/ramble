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
    \fn     suma
    \brief  suma los elementos del arreglo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int* tg el arreglo a sumar
    \param [in] int size el tamaño del arreglo a sumar
    \return 0 si hay exito, 1 si hay un error;
*/
void* suma( void* arr ){
    struct arg* arg = ( struct arg* ) arr;
    for ( int i = 0; i<arg->size; i++ ){
        sum+=arg->target[i];
    }
    return arr;
}

/**
    \fn     producto
    \brief  multiplica los elementos del arreglo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int tg el arreglo a multiplicar
    \param [in] int size el tamaño del arreglo a sumar
    \return 0 si hay exito, 1 si hay un error;
*/
void* producto( void* arr ){
    struct arg* arg = ( struct arg* ) arr;
    for ( int i = 0; i<arg->size; i++  ){
        pro*=arg->target[i];
    }
    return arr;
}

/**
    \fn     impares
    \brief  cuenta impares del arreglo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int tg el arreglo del que se cuentan los impares
    \param [in] int size el tamaño del arreglo a sumar
    \return 0 si hay exito, 1 si hay un error;
*/
void* impares( void* arr ){
    struct arg* arg = ( struct arg* ) arr;
    for ( int i = 0; i<arg->size; i++  ){
        if ( arg->target[i]%2!=0 )
            imp++;
    }
    return arr;
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
int hilo( void*( *func )( void* ),int* tg,int size ){
    struct arg aux;
    pthread_t* thr = malloc( sizeof( pthread_t )*CHUNK );
    for ( int i=0; i<size/CHUNK; i++ ){
        aux.target = tg+i*CHUNK;
        aux.size = CHUNK;
        creahilo( &thr[i],func,&aux );
        juntarhilo( thr[i] );
        printf( "HILO:%d:\nIMPARES:%d. SUMA:%d. PRODUCTO:%lld.\n\n",i,imp,sum,pro );
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
    void* func[3] ={ suma,impares,producto };
    for ( int ct=0; ct<3; ct++ ){
        hilo( func[ct],tg,size );
    }
    exit(0);
}
