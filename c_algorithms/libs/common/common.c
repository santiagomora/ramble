#include "../header/common.h"

void printArray( int *target, int length ) {
	for ( int i=0; i<length; i++ )
		printf("%d,",target [i]);
	puts("");
}

int readArray ( int *target,int *size,char *filename ) {
        int k=0;
        FILE *fp = fopen( filename,"r" );
        if ( fp ){
                while ( !feof( fp ) )
                        fscanf( fp,"%d\n",&target[k++] );
                target = realloc( target,sizeof( int )*k );
                *size = k;
                fclose( fp );
                return 0;
        }
        printf("ERROR:%s\n",strerror(errno));
        exit(1);
}

