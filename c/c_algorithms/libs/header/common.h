#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#ifndef ERRNO
        #define ERRNO
        int errno;
#endif

void printArray( int *target, int length );

int readArray ( int *target,int *size,char *filename );
