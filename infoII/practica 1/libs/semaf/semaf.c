/**********************************************************************************************************************************
 *
 * @file		semaf.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDE
 **********************************************************************************************************************************/

#include "semaf.h"

/**
    \fn     construyesem
    \brief  construye las operaciones a realizar sobre los semaforos
            (en este caso solo hay 1) inicializandolo con un valor por defecto
    \author Luis Mora
    \date 02-05-2020
    \param [in] int semnum cantidad de semaforos sobre los que operar
    \param [in] const int semnum valores iniciales de cada uno de los semaforos
    \param [in] size_t size tamaño del espacio de memoria a reservar para los semaforos
    \param [out] struct sembuf* sem direccion de memoria de las operaciones
    \return struct sembuf*;
*/
struct sembuf* construyesem( int semnum, int init , size_t size ){
    struct sembuf* sem = malloc( size );
    struct sembuf ax;
    for ( int ctr=0; ctr<semnum; ctr++ ){
        ax.sem_op = ( unsigned short ) init;
        ax.sem_num =  ( short ) ctr;
        ax.sem_flg = ( short ) 0;
        sem[ctr] = ax;
    }
    return sem;
}

/**
    \fn     sumasem
    \brief  Realiza las operaciones sobre el semaforo
            guardado en sem[pos] dependiendo del valor pasado en val
    \author Luis Mora
    \date 02-05-2020
    \param [in] int semid id del semaforo
    \param [in] int size numero de semaforos que estamos usando (CANTSEM)
    \param [in] struct sembuf* ops operaciones a realizar sobre el semaforo
    \return 0 si hay exito, 1 si hay una error al realizar operacion;
*/
int sumasem( int id, size_t size, struct sembuf* ops ){
	if ( semop( id,ops,size )<0 ) {
		perror("ERROR AL SUMAR");
		exit(1);
	}
	return 0;
}

/**
    \fn     operasem
    \brief  opera sobre el semaforo 
    \author Luis Mora
    \date 02-05-2020
    \param [in] int id el id del semaforo a leer
    \param [in] int pos la posicion del semaforo a leer
    \param [in] int action GETVAL
    \return 0 si hay exito, 1 si hay un error;
*/
int operasem( int id, int pos, int action ){
	int ctl;
	if( ( ctl = semctl( id,pos,action ) )<0) {
		perror("ERROR AL OPERAR SEMAFORO");
		exit(1);
	}
	return ctl;
}

/**
    \fn     configsem
    \brief  lee el semaforo 
    \author Luis Mora
    \date 02-05-2020
    \param [in] int id el id del semaforo a leer
    \param [in] int pos la posicion del semaforo a leer
    \param [in] int action GETVAL
    \param [in] int value el valor a setear el semaforo
    \return 0 si hay exito, 1 si hay un error;
*/
int configsem( int id, int pos,int action, int value ){
	int ctl;
	if( ( ctl = semctl( id,pos,action,value ) )<0 ) {
		perror("ERROR AL CONFIGURAR SEMAFORO");
		exit(1);
	}
	return ctl;
}
/**
    \fn     creasem
    \brief  crea los cant semaforos 
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path el path del archivo asociado al semaforo
    \param [in] char key la llave para generar el semaforo
    \param [in] int flags el modo para crear el semaforo y permisos
    \param [in] int cant la cantidad de semagoros
    \return id de semaforo si hay exito, 1 si hay un error;
*/
int creasem( char *path,char key,int flags, int cant ){
	int semid;
	generaref( path );
	creallave( path,key );
	if ( ( semid = semget( key,cant,flags ) )<0 ){
		perror("ERROR GENERANDO SEMAFORO");
		exit(1);
	}
	return semid;
}

