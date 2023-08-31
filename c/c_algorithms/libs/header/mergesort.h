#include "common.h"
#ifndef ARRAY
	#define ARRAY
		struct array {
			int* elems;
			int size;
		};
#endif

struct array mergesort( struct array target );
