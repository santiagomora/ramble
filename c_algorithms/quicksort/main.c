#include "headers.h"
#define MAXSZ 10000

int main () {
	int size, *target = malloc( sizeof( int )*MAXSZ );
	char filename[] = "QuickSort.txt";
	readArray( target,&size,filename );
	printArray( quicksort( target,size ),size );
}
