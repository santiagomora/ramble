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
int semid;
/***********************************************************************************************************************************
 *** PROTOTIPO DE FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

 /***********************************************************************************************************************************
 *** FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     elimSEM
    \brief  maneja las interrupciones mientras se lee el segmento de memoria
            para que no quede abierta luego. Elimina el segmento para que no
            presente errores en la proxima ejecucion.
    \author Luis Mora
    \date 02-05-2020
    \param [in] señal SIGINT
    \param [out]
    \return 0 si hay exito, 1 si hay una error al eliminar la cola;
*/
void elimSEM( int sig ){
    operasem( semid,SEMPOS,IPC_RMID );
    printf( "SEMAFORO ELIMINADO CON EXITO\n" );
}

/**
    \fn     operaSEM
    \brief  Realiza las operaciones sobre el semaforo
            guardado en sem[pos] dependiendo del valor pasado en val
    \author Luis Mora
    \date 02-05-2020
    \param [in] int semid id del semaforo
    \param [in] int size numero de semaforos que estamos usando (CANTSEM)
    \param [in] int val proximo valor del semaforo
    \param [in] struct sembuf* ops operaciones a realizar sobre el semaforo
    \param [out] int 0
    \return 0 si hay exito, 1 si hay una error al realizar operacion;
*/
int actualiza( int semid, struct sembuf* ops ){
    sumasem( semid,CANTSEMS,ops );
    printf(
        "SEMAFORO %s\n",
        operasem( semid,0,GETVAL )==0 ? "LIBERADO" : "TOMADO"
    );
    return 0;

}

/**
    \fn     esperaenter
    \brief  muestra las instrucciones en salida estandar y espera.
    \author Luis Mora
    \date 02-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
int esperaenter( int id ){
    int ctl,val=0;
    size_t size = sizeof( struct sembuf )*CANTSEMS;
    struct sembuf *opsem = construyesem( CANTSEMS,0,size );
    for ( int ctr=1; ctr<NVUELTAS+1; ctr++ ){
        ctl = operasem( id,SEMPOS,GETVAL );
        printf("PRESIONE ENTER PARA %s EL CONTROL DEL SEMAFORO\n", ctl==0 ? "TOMAR" : "DEJAR" );
        if ( fgetc( stdin ) == '\n' ){
            val = ctl==0 ? 1 : -1;
            printf("%s SEMAFORO\nVUELTA %d/%d\n",val == 1 ? "TOMANDO" : "LIBERANDO", ctr, NVUELTAS );
            opsem[SEMPOS].sem_op = val;
            configsem( id,SEMPOS,SETVAL,1 );
            actualiza( id,opsem );
        }
    }
    operasem( id,SEMPOS,IPC_RMID );
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     crea
    \brief  crea las llaves para el semaforo y obtiene el ID
    \author Luis Mora
    \date 02-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
int crea( void ){
    semid = creasem( KEYFILE,PRKEY,IPC_CREAT|S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH,CANTSEMS );
    esperaenter( semid );
    return 0;
}
