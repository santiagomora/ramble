#include "../libs/header/common.h"
#include "../libs/header/mergesort.h"
#ifndef ARRAY
	#define ARRAY
		struct array {
			int* elems;
			int size;
		};
#endif

struct array mergesort( struct array target );
