dirs=./hilo ./cola ./fifo ./pipe ./proc ./semaf ./shmem ./tcpmet

all:
	mkdir common
	for d in $(dirs); 				\
	do 						\
		echo "COMPILANDO DIRECTORIO $$d";	\
		make lib -C $$d; 				\
	done
clean:
	for d in $(dirs); 				\
	do 						\
		echo "LIMPIANDO DIRECTORIO $$d";	\
		make clean -C $$d;			\
	done
	rm -r common
