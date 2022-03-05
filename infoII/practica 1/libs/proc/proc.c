/**********************************************************************************************************************************
 *
 * @file		proc.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/
#include "proc.h"
/**
    \fn  imprimirHijo
    \brief  Imprime los mensajes desde el hijo cada
            1 segundo, a los 5 segundos termina.
    \author Luis Mora
    \date 02-05-2020
    \param [in, id del proceso] pid_t pid
    \param [out]
    \return 0 si hay exito, 1 si es interrumpido;
*/
int imprimirHijo( int lim ){
    pid_t pid = getpid();
    for ( int ctr=0; ctr<lim; ctr++ ){
        printf("Hijo %d: Estoy vivo.\n",pid);
        if ( sleep(1) != 0 ){ //interrupcion del proceso
            perror("SLEEP ERROR");
            exit(1);
        }
    }
    printf("Hijo %d: Terminando actividad.\n",pid);
    exit(0);
}

/**
    \fn  esperarHijo
    \brief  Espera la finalizacion de los procesos hijo,
            y los finaliza para que no queden en estado zombie
    \author Luis Mora
    \date 02-05-2020
    \param [in]
    \param [in]
    \param [out]
    \return 0 si hay exito, 1 si hay un error;
*/
int esperarHijos( ){
    int status;
    pid_t chld;
    while ( ( chld = waitpid( -1,&status,0 ) ) >0 )
        printf( "Padre: hijo %d terminó su actividad.\n",chld );
    return 0;
}

/**
    \fn     handlerHijo
    \brief  Inicia los procesos hijo
    \author Luis Mora
    \date 02-05-2020
    \param [in]
    \param [in]
    \param [out]
    \return 0 si hay exito, 1 si hay un error;
*/
int handlerHijo( int hi, int lo ){
    struct timespec tm;
    clock_gettime(  CLOCK_REALTIME,&tm );
    srand( tm.tv_nsec );
    imprimirHijo( rand()%hi+lo );
    return 0;
}

