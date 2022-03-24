head=headers.h
src=$(wildcard *.c) ../libs/common/common.c
res=select
flags=-Wl,-rpath,../libs/sort/ver -L../libs -lsort 

main: $(src) $(head)
	gcc  -o $(res) $(src) $(flags)
.PHONY: clean
clean:
	rm $(res)
