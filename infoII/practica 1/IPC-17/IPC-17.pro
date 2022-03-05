TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt
LIBS += -L/home/santiagomora/Documents/Repos/infoII/practica\ 1/libs/common -lhilo -lpthread

SOURCES += \
        funciones.c \
        main.c

HEADERS += \
    funciones.h
