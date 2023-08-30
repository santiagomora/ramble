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
	return ctr;
}

int partition ( int *target, int len, int *posrep  ) {
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
	*posrep += repctr>0 ? addrepeated( target,rep,repctr,i ) : 0;
	return i;
}

int randomselect ( int *target,int order,int len ) {
	int pv,posrep=0;
	if ( len>1 && target ) {
		pv = partition( target,len,&posrep );

		if ( order==pv-1 )
			return target[pv-1];
		else if ( order<pv-1 )
			return randomselect( target,order,pv );
		pv+=posrep;
		if ( order>pv-1 )
			return randomselect( target+pv,order-pv,len-pv );
	}
}
