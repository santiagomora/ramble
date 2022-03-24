#include "headers.h"
#define MAXRPT 1024

void swap (int *a, int *b) {
	int ax = *a;
	*a = *b;
	*b = ax;
}

int addrepeated ( int *dest,int *pos,int ctr,int pv ) {
	int k,j=pv;
	for ( k=0; k<ctr; k++ ){
		swap( &dest[j++],&dest[pos[k]] );
	}
	return pv+k;
}

int findpivot ( int *target, int len, int *posrep  ) {
	int i=1,
	    repctr=0,
	    pivot=target[0],
	    *rep=malloc( sizeof( int )*MAXRPT );
	for ( int k=i; k<len; k++ ) {
		if ( target[k]<pivot )
			swap( &target[k],&target[i++] );
		else if ( target[k]==pivot )
			rep[repctr++] = k;	
	}
	rep = realloc( rep,sizeof( int )*repctr );
	swap ( &target[i-1],&target[0] );
	*posrep = repctr>0 ? addrepeated( target,rep,repctr,i ) : repctr;
	return i;
}

int* quicksort ( int *target,int len ) {
	int pv,posrep;
	if ( len>1 && target ) {
		pv = findpivot( target,len,&posrep );
		quicksort( target,pv );
		pv = posrep>0 ? posrep : pv;
		quicksort( target+pv,len-pv );
	}
	return target;
}
