dirs=./sort ./common

all:
	for d in $(dirs); 				\
	do 						\
		echo "COMPILANDO DIRECTORIO $$d";	\
		make all -C $$d; 				\
	done
clean:
	for d in $(dirs); 				\
	do 						\
		echo "LIMPIANDO DIRECTORIO $$d";	\
		make clean -C $$d;			\
	done
