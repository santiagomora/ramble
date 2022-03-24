head=headers.h
src=$(wildcard *.c)
res=sort
flags=-Wl,-rpath,../libs/common/ver -L../libs -lcommon 

main: $(src) $(head)
	gcc  -o $(res) $(src) $(flags)

.PHONY: clean

clean:
	rm sort

