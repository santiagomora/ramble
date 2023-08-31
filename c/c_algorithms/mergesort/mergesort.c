#include "headers.h"

struct array joinpart (
	struct array p1,
	struct array p2
) {
	int i=0, j=0, k=0, len=p1.size+p2.size;
	struct array join;
	if ( p1.elems != p2.elems ) {
		join.elems = malloc( sizeof( int )*len );
		join.size = len;
		while ( k<len && j<p2.size && i<p1.size ) {
			if ( p1.elems[i]<p2.elems[j] ) 
				join.elems[k] = p1.elems[i++];	
			else if ( p1.elems[i]>p2.elems[j] ) 
				join.elems[k] = p2.elems[j++];
			else {
				join.elems[k++] = p2.elems[j++];
				join.elems[k] = p1.elems[i++];
			}
			k++;
		}
		
		if ( j==p2.size )
			memcpy( join.elems+k, p1.elems+i, sizeof(int)*(p1.size-i) );
		else if ( i==p1.size ) 
			memcpy( join.elems+k, p2.elems+j, sizeof(int)*(p2.size-j) );
		return join;
	}
	return p1;	
}

struct array mergesort ( 
	struct array part 
) {
	int len = part.size/2;
	if ( part.size>1 ) {
		return joinpart (
			mergesort ( ( struct array ) { .elems=part.elems, .size=len }  ),
			mergesort ( ( struct array ) { .elems=part.elems+len, .size= part.size-len } )	
		);
	}
	return part;
}
