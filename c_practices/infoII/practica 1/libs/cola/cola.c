/**********************************************************************************************************************************
 *
 * @file		cola.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES
 **********************************************************************************************************************************/

#include "cola.h"

/**
    \fn     eliminacola
    \brief  elimina la cola
    \author Luis Mora
    \date 02-05-2020
    \param [in] señal SIGINT
    \return 0 si hay exito, 1 si hay una error al eliminar la cola;
*/
void eliminacola( int cid ){
    if ( msgctl( cid,IPC_RMID,NULL )<0 ){
        perror( "ERROR ELIMINANDO COLA" );
        exit(1);
    }
}

/**
    \fn     leermensaje
    \brief  Chequea si recibe el mensaje de tipo 100 para finalizar
            su ejecucion y eliminar la cola.
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay errores recibiendo mensajes;
*/
ssize_t leemensaje( int colaid, void* buf, size_t size, long type, int flag  ){
	ssize_t rcv;
	if ( ( rcv = msgrcv( colaid,buf,size,type,flag ) )<0 ){
		perror( "ERROR RECIBIENDO MENSAJE" );
		exit(1);
	}
	return rcv;
}

/**
    \fn     enviamensaje
    \brief  Envia el mensaje a la cola.
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay error creando la cola o la llave;
*/
int escribemensaje( int cid, void* msj, size_t size, int flag ){
	int snd;
        if ( ( snd = msgsnd( cid,msj,size,flag ) ) <0 ) {
		perror( "ERROR AL ENVIAR MENSAJE" );
		exit(1);
	}
	return snd;
}

/**
    \fn     obtencola
    \brief  Intenta conectarse a la cola.
            si ya esta creada, se conecta y espera mensajes
            si no fue creada, presenta error en la salida correspondiente
    \author Luis Mora
    \date 02-05-2020
    \param [in] void
    \param [out]
    \return 0 si hay exito, 1 si hay error creando la cola o la llave;
*/
int obtencola( char* keypath, char key  ){
	int id;
	umask(0);
	generaref( keypath );
	key_t fkey = creallave( keypath,key );
	if ( ( id = msgget( fkey,IPC_CREAT|S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH ) )<=0 ){
		perror("ERROR OBTENIENDO COLA");
		exit(1);
	}
	return id;
}

