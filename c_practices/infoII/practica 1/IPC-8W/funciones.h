#ifndef FUNCIONES_H
#define FUNCIONES_H
// FUNCIONES_H

/*********************************************************************************************************************************
 *
 * @file		funciones.h
 * @brief		Breve descripción del objetivo del Módulo
 * @date		02-05-2020
 * @author		Luis Mora
 *
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** MODULO
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** INCLUDES GLOBALES
 **********************************************************************************************************************************/
#include "../libs/cola/cola.h"
/***********************************************************************************************************************************
 *** DEFINES GLOBALES
 **********************************************************************************************************************************/
#define BUFSIZE 102
#ifndef MSJ
#define MSJ
    struct msj {
        long mtype;
        char mtext[BUFSIZE];
    };
#endif
/***********************************************************************************************************************************
 *** MACROS GLOBALES
 **********************************************************************************************************************************/
#define KEYFILE "../shared/colaKEY8"
#define PRKEY 'a'
#define CANTMSJ 5
/***********************************************************************************************************************************
 *** TIPO DE DATOS GLOBALES
 **********************************************************************************************************************************/

/***********************************************************************************************************************************
 *** VARIABLES GLOBALES
 **********************************************************************************************************************************/
// extern tipo nombreVariable;

/***********************************************************************************************************************************
 *** PROTOTIPOS DE FUNCIONES GLOBALES
 **********************************************************************************************************************************/
int escribir( char* text );

#endif // FUNCIONES_H