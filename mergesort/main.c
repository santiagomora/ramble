#include "headers.h"
#define MAXSZ 100000

int main () {
	struct array target;
	char filename[] = "IntegerArray.txt";
       	target.elems=malloc( sizeof( int )*MAXSZ );
	target.size= 0;	
	readArray( target.elems,&target.size,filename );
	target = mergesort( target );
	printArray( target.elems,target.size );
}
