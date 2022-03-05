TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt
LIBS += -L../libs/common -lshmem -lsemaf

SOURCES += \
        funciones.c \
        main.c

HEADERS += \
    funciones.h
