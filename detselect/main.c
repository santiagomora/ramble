#include "headers.h"
#define MAXSZ 10000

int main ( int arc,char *arv[] ) {
	int order,
	    size,
	    *target = malloc( sizeof( int )*MAXSZ ),
	    result;
	char filename[] = "DetSelect.txt";
	if ( arc>1 ) {
		readArray( target,&size,filename );
		order = atoi( arv[1] );
		if ( order<size && order>0 && ( result = detselect( target,order-1,size,0 ) )>=0 ) {
			printf("The %dth order statistic is:%d\n",order,result);
			exit(0);
		}
		puts("ERROR: order out of bound");
		exit(1);
	} 
	puts("ERROR: Not enough arguments. Pass ith order position");
	exit(1);
}

