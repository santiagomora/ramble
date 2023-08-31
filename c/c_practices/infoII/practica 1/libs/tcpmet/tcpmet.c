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

#include "tcpmet.h"

/**
    \fn     creasocket
    \brief  Crea el socket que sera usado por el CLIENTE
    \author Luis Mora
    \date   06-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
int creasockettcp( ){
	int sockfd;
	if ( ( sockfd = socket( AF_INET,SOCK_STREAM,0 ) )<0 ){
		perror("ERROR AL CREAR SOCKET");
		exit(1);
	}
	return sockfd;
}

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
int direcciontcp( struct sockaddr_in* adr, unsigned int prt, char* adrname ){
	struct in_addr uidir;
	if ( inet_aton( adrname,&uidir )!=1 ){
		perror( "DIRECCION CON FORMATO INVALIDO" );
		exit(1);
	}
	adr->sin_family = AF_INET;
	adr->sin_port = htons( prt );
	adr->sin_addr = uidir;
	return 0;
}
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
int aceptartcp( int sock, socklen_t* len, struct sockaddr_in* cliadr ){
	int clisock;
	if ( ( clisock = accept( sock,( struct sockaddr* ) cliadr,len ) )<0 ){
		perror("ERROR SOCKET NO PUEDE ACEPTAR CONEXIONES");
		exit(1);
	}
        return clisock;
}

/**
    \fn     escuchar
    \brief  definir socket pasivo
    \author Luis Mora
    \date   06-05-2020
    \param [in] int sock el socket donde escucharemos
    \param [in] int back numero de conexiones simultaneas MAXCONN
    \return 0 si hay exito, 1 si hay un error;
*/
int escuchartcp( int sock, int back, char* dir ){
	if ( listen( sock,back ) != 0 ){
		perror("ERROR SOCKET NO PUEDE ESCUCHAR");
		exit(1);
	}
	return 0;
}
/**
    \fn     nombrar
    \brief  Asocia direccion al socket
    \author Luis Mora
    \date   06-05-2020
    \param [in] int sock el socket que asociaremos a la direccion
    \param [out] struct sockaddr_in adr guarda la direccion aqui
    \return 0 si hay exito, 1 si hay un error al asociar;
*/
int nombrartcp( int sock, int prt, struct sockaddr_in *adr,char *dir ){
	direcciontcp( adr,prt,dir );
	if ( bind( sock,( struct sockaddr* )adr,sizeof( struct sockaddr_in ) )<0 ){
		perror("ERROR AL ASIGNAR DIRECCION");
		exit(1);
	}
	return 0;
}

/**
    \fn     cerrartcp
    \brief  cierra el socket 
    \author Luis Mora
    \date   06-05-2020
    \param [in] int sock el socket a cerrar
    \return 0 si hay exito, 1 si hay un error al asociar;
*/
int cerrartcp ( int sock ){
	if ( close( sock ) ){
		perror("ERROR AL CERRAR CONEXION");
		exit(1);
	}
	return 0;
}

/**
    \fn     conectartcp
    \brief  Conecta al socket tcp
    \author Luis Mora
    \date   06-05-2020
    \return 0 si hay exito, 1 si hay un error;
*/
int conectartcp( int sock,struct sockaddr_in* seradr,size_t size ){
    if ( connect( sock,( struct sockaddr* )seradr,size )!=0 ){
        perror("ERROR ESTABLECIENDO CONEXION");
        exit(1);
    }
    return 0;
}

