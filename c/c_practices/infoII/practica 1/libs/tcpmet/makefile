# base directories
#
src  = ./
vers = ../common
objs = $(src)objs
extr = ../iofd/iofd.c

# output names
#
shrd = libtcpmet.so

# result build flags
#
shflags = -shared -Wl,-soname,$(shrd).1 -o $(vers)/$(shrd).1.0.0 -Wall
obflags = -fpic -Wall

# c and h files for shared object and static lib
#
cge := $(wildcard $(src)/*.c)
hge := $(wildcard $(src)/*.h)
oge := $(subst $(src),$(objs),$(cge))
oge := $(patsubst %.c,%.o,$(oge) $(extr))

# static and shared build output
#
shbuild = $(vers)/$(shrd)

# assumes there exists 
# src storing generic c files
# shared storing shared lib c files
# static storing static lib c files
# head storing header files 
#
buildtree:
	mkdir -v $(objs)

$(objs)/%.o: $(src)/%.c $(hge)
	gcc -c -o $@ $<	$(flags)

# compile client and server from shared object
#
$(shbuild): $(oge)
	@echo CONSTRUYENDO BIBLIOTECA TCPMET.SO
	gcc $(shflags) $^
	sudo ldconfig -n $(vers)
	ln -s $(shrd).1 $(shbuild)

lib:    buildtree 	\
	$(shbuild)

# avoid build of false target clean 
#
.PHONY: clean

# clean all directory tree
#
clean: 
	@echo DESTRUYENDO BIBLIOTECA TCPMET
	for d in $(objs) $(vers)/$(shrd).1 $(vers)/$(shrd).1.0.0 $(vers)/$(shrd); 	\
		do rm -r $$d; 	\
	done 
