#ifndef TCPMET_H
#define TCPMET_H // TCPMET_H
/*********************************************************************************************************************************
 *
 * @file		tcpmet.h
 * @brief		Breve descripción del objetivo del Módulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/signal.h>
#include <sys/wait.h>
#include <time.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include "../iofd/iofd.h"

#ifndef ERRNO
#define ERRNO
    int errno;
#endif
/**********************************************************************************************************************************
 *
 * @file		tcpmet.c
 * @brief		Descripcion del modulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDE
 **********************************************************************************************************************************/

/**
    \fn     creasocket
    \brief  Crea el socket que sera usado
    \author Luis Mora
    \date   06-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
	int creasockettcp( );

/**
    \fn     direccion
    \brief  inicializar struct sockaddr_in
    \author Luis Mora
    \date   06-05-2020
    \param [in] adrname la direccion IP: DIRECCION.
    \param [in] prt el numero de puerto: PUERTO
    \param [out] struct sockaddr_in* adr guardaremos la estructura que
                asociaremos al socket para escuchar.
    \return 0 si hay exito, 1 si hay un error;
*/
	int direcciontcp( struct sockaddr_in* adr, unsigned int prt, char* adrname );

/**
    \fn     aceptar
    \brief  aceptar conexiones
    \author Luis Mora
    \date   06-05-2020
    \param [in] sock el socket que asociaremos a la direccion
    \param [in] socklen_t* donde guardaremos el tamaño del socket cliente
    \param [out] struct sockaddr_in cliadr guarda la direccion de cliente aqui
    \return 0 si hay exito, 1 si hay un error;
*/
	int aceptartcp( int sock, socklen_t* len, struct sockaddr_in* cliadr );

/**
    \fn     escuchar
    \brief  definir socket pasivo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int sock el socket donde escucharemos
    \param [in] int back numero de conexiones simultaneas MAXCONN
    \return 0 si hay exito, 1 si hay un error;
*/
	int escuchartcp( int sock, int back, char* dir );

/**
    \fn     nombrar
    \brief  Asocia direccion al socket
    \author Luis Mora
    \date   06-05-2020
    \param [in] int sock el socket que asociaremos a la direccion
    \param [out] struct sockaddr_in adr guarda la direccion aqui
    \return 0 si hay exito, 1 si hay un error al asociar;
*/
	int nombrartcp( int sock, int prt, struct sockaddr_in *adr,char *dir );

/**
    \fn     cerrartcp
    \brief  cierra el socket 
    \author Luis Mora
    \date   06-05-2020
    \param [in] int sock el socket a cerrar
    \return 0 si hay exito, 1 si hay un error al asociar;
*/
	int cerrartcp ( int sock );
/**
    \fn     conectartcp
    \brief  Conecta al socket tcp
    \author Luis Mora
    \date   06-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
	int conectartcp( int sock,struct sockaddr_in* seradr,size_t size );

#endif // TCPMET_H

