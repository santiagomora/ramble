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
const int OPINIT = 0;
/***********************************************************************************************************************************
 *** PROTOTIPO DE FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

 /***********************************************************************************************************************************
 *** FUNCIONES PRIVADAS AL MODULO
 **********************************************************************************************************************************/

/**********************************************************************************************************************************/

/**
    \fn     inthandler
    \brief  maneja las interrupciones mientras se lee el segmento de memoria
            para que no quede abierta luego. Elimina el segmento para que no
            presente errores en la proxima ejecucion.
    \author Luis Mora
    \date   02-05-2020
    \param  [in] señal SIGINT
    \return 0 si hay exito, 1 si hay una error al eliminar el semaforo;
*/
void inthandler( int sig ){
    operasem( semid,SEMPOS,IPC_RMID );
}

/**
    \fn     proximo
    \brief  Actualiza el siguiente semaforo
    \author Luis Mora
    \date 02-05-2020
    \param [in] int semid el id del conjunto de semaforos
    \param [in] struct sembuf* ax un apuntador a la operacion actual
    \return 0 ;
*/
int proximo( int semid,struct sembuf* ax ){
    if ( ax[0].sem_num<NPROCESOS-1 ){
        ax[0].sem_num++;
        sumasem( semid,1,ax );
    }
    return 0;
}

/**
    \fn     opera
    \brief  Realiza las operaciones sobre la memoria compartida si se puede
            y actualiza el proximo semaforo al finalizar.
    \author Luis Mora
    \date   02-05-2020
    \param  [in] text el texto del mensaje
    \return 0 si hay exito, 1 si hay error al desenganchar.
*/
int opera( int* mem, int semid, struct sembuf* semop ){
    for( int i=0;i<TAMMEM;i++ ){
        mem[i]++;
    }
    proximo( semid,semop );
    return 0;
}

/**
    \fn     engancha
    \brief  engancha los NPROCESOS al segmento de memoria compartida
            e inicia las operaciones sobre esta.
    \author Luis Mora
    \date   02-05-2020
    \param  [in] el ID de la memoria compartida, semaforo y el puntero
                 a las operaciones que se realizaran sobre los semaforos
    \return 0 si hay exito, 1 si hay un error al enganchar;
*/
int engancha( int shid, int semid, struct sembuf* semop ){
    int* mem = enganchashm( shid,NULL,0 );
    opera( mem,semid,semop );
    exit(0);
}

/**
    \fn     inicia
    \brief  inicia la actualizacion de los semaforos creados operando
            sobre el primer semaforo
    \author Luis Mora
    \date   02-05-2020
    \param  [in] int semid el id del conjunto de semaforos
    \param  [in] struct sembuf* op un apuntador a la primera operacion
    \return 0 si hay exito, 1 si hay un error al inicializar el semaforo 0;
*/
int inicia( int semid, struct sembuf* op ){
    op[0].sem_num = 0;
    op[0].sem_op=1;
    sumasem( semid,1,op );
    return 0;
}

/**
    \fn     espera
    \brief  espera a los NPROCESOS
    \author Luis Mora
    \date   02-05-2020
    \param  [in] los ID de la memoria compartida y el semaforo
    \return 0 si hay exito, 1 si hay un error
*/
int espera( int semid ){
    while( wait(NULL)>0 );
    operasem( semid,0,IPC_RMID );
    printf("MEMORIA ACTUALIZADA CON EXITO\n");
    return 0;
}

/**
    \fn     procesos
    \brief  crea los NPROCESOS e inicializa la estructura
            para operar sobre los semaforos. Los semaforos se
            inician con el numero de proceso (0-NPROCESOS-1), y
            todos los procesos quedaran en estado 0 en espera
            a que el semaforo vuelva a estar nuevamente en 0.
    \author Luis Mora
    \date   02-05-2020
    \param  [in] los ID de la memoria compartida y el semaforo
    \return 0 si hay exito, 1 si hay un error
*/
int procesos( int shid, int semid ){
    struct sembuf* op = construyesem( 1,OPINIT,sizeof( struct sembuf ) );
    for ( int i=0;i<NPROCESOS;i++ ){
        op[0].sem_num = i;
        if ( !fork() ){
            configsem( semid,i,SETVAL,0 );
            engancha( shid,semid,op );
        }
    }
    inicia( semid,op );
    espera( semid );
    return 0;
}

 /***********************************************************************************************************************************
 *** FUNCIONES GLOBALES AL MODULO
 **********************************************************************************************************************************/

/**
    \fn     reescribe
    \brief  crea la llave, semaforo y memoria compartida para que
            posteriormente puedan realiarse operaciones consecutivas
            atomizadas sobre la memoria compartida.
    \author Luis Mora
    \date   02-05-2020
    \param  [in] type el tipo del mensaje
    \param  [in] text el texto del mensaje
    \param  [out] struct msj inicializada
    \return 0 si hay exito, 1 si hay un error;
*/
int reescribe( ){
    int shmid;
    signal( SIGINT,inthandler );
    shmid = conectashm( SHMKEYFILE,PRKEY,TAMMEM*sizeof( int ),0 );
    semid = creasem( SEMKEYFILE,PRKEY,IPC_CREAT|S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH,NPROCESOS );
    procesos( shmid, semid );
    return 0;
}
