# base directories
#
objdir=obj
libdest=..
verloc=ver
header=../header/common.h
# output names
#
out=libcommon.so

# result build flags
#
shflags=-shared -Wl,-soname,$(out).1 -o $(verloc)/$(out).1.0 -Wall
obflags=-fpic -Wall

# c and h files for shared object
#
cge:=$(wildcard ./*.c)
oge:=$(patsubst ./%.c,$(objdir)/%.o,$(cge))

# static and shared build output
#
shbuild=$(libdest)/$(out)

buildtree:
	mkdir -v $(objdir)
	mkdir -v $(verloc)

$(objdir)/%.o: ./%.c $(header)
	gcc -c -o $@ $<	$(obflags)

# compile shared object
#
$(shbuild): $(oge)
	@echo CONSTRUYENDO COMMON
	gcc $(shflags) $^
	sudo ldconfig -n ./$(verloc)
	ln -s common/$(verloc)/$(out).1 $(shbuild)

all:    buildtree $(shbuild)

# avoid build of false target clean 
#
.PHONY: clean

# clean all directory tree
#
clean: 
	@echo DESTRUYENDO COMMON
	rm -r $(objdir)
	rm -r $(verloc)
	@echo DESTRUYENDO SO 
	rm $(shbuild)


