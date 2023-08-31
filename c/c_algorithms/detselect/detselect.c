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

int choosepivot ( int *target,int len ) {
	int size, 
	    *med = malloc( sizeof( int )*len/5 ),
	    j=0,
	    nu=0;
	struct array aux;
	for ( int k=0; k<len; k+=5 ) {
		aux.elems = target+k;
		aux.size = (k+5>len) ? len-k : 5;
		aux = mergesort( aux );
		med[j++] = aux.elems[aux.size/2];
	}
	return detselect( med,j/2,j,1 );
}

int detselect ( int *target,int order,int len,int ispv ) {
	int pv,posrep=0;
	if ( len>1 && target ) {
		swap( &target[0],&target[ choosepivot( target,len ) ] );
		pv = partition( target,len,&posrep );
		if ( order==pv-1 )
			return ispv ? pv-1 : target[pv-1];
		else if ( order<pv-1 )
			return detselect( target,order,pv,ispv );
		pv+=posrep;
		if ( order>pv-1 )
			return detselect( target+pv,order-pv,len-pv,ispv );
	}
}
