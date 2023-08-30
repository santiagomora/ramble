/**********************************************************************************************************************************
 *
 * @file		shmem.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDE
 **********************************************************************************************************************************/

#include "shmem.h"

/**
    \fn     enganchashm
    \brief  engancha a la memoria compartida    
    \author Luis Mora
    \date 02-05-2020
    \param [in] int shid el id de la memoria compartida
    \return 0 si hay exito, 1 si hay un error.
*/
void* enganchashm( int shid,const void *addr,int flag ){
	void* val;
	if ( ( val = shmat( shid,addr,flag ) ) == (void*) -1 ) {
		perror("ERROR ENGANCHANDO A MEMORIA COMPARTIDA");
		exit(1);
	}
	return val;
}

/**
    \fn     eliminashm
    \brief  elimina el segmento de memoria compartida    
    \author Luis Mora
    \date 02-05-2020
    \param [in] int shid el id de la memoria compartida
    \return 0 si hay exito, 1 si hay un error.
*/
int eliminashm( int shid ){
	if ( shmctl( shid,IPC_RMID,NULL )<0 ){
		perror( "ERROR ELIMINANDO COLA" );
		exit(1);
	}
	return 0;
}

/**
    \fn     desenganchashm
    \brief  desengancha de la memoria compartida    
    \author Luis Mora
    \date 02-05-2020
    \param [in] int shid el id de la memoria compartida
    \return 0 si hay exito, 1 si hay un error.
*/
int desenganchashm( void* mem ){
    if ( shmdt( mem )== -1 ) {
        perror("ERROR DESENGANCHANDO DE MEMORIA COMPARTIDA");
        exit(1);
    }
    return 0;
}

/**
    \fn     conectashm
    \brief  conecta a la memoria compartidainicializa la estructura mensaje
    \author Luis Mora
    \date 02-05-2020
    \param [in] char* path el path del archivo llave
    \param [in] int size el tamaño de la memoria a reservar  
    \param [in] char ckey el caracter para  
    \param [out] el id la memoria compartida
    \return 0 si hay exito, 1 si hay un error;
*/
int conectashm( char* path,size_t size,char ckey,int flag  ){
	int shid;
	key_t fkey;
	generaref( path );
	fkey = creallave( path,ckey );
	if ( ( shid = shmget( fkey,size,flag  ) )<0 ){
		perror("ERROR GENERANDO MEMORIA COMPARTIDA");
		exit(1);
	}
	return shid;
}
