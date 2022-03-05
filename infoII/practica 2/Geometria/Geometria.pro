TEMPLATE = app
CONFIG += console c++11
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += \
        Poligono.cpp \
        Punto.cpp \
        main.cpp

HEADERS += \
    Poligono.h \
    Punto.h

LIBS += \
    -lm
