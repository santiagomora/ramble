QT       += core gui sql

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

QT += serialport
CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    Interfaces/controlbotones.cpp \
    controlsenales.cpp \
    controlventana.cpp \
    interfazventana.cpp \
    main.cpp \
    BaseDatos/db.cpp \
    Componentes/interfazlogin.cpp \
    Componentes/rtc.cpp \
    Componentes/serial.cpp \
    Componentes/temperatura.cpp \
    Componentes/barraprogreso.cpp \
    Componentes/listadoopciones.cpp \
    Componentes/interfazpuertoserie.cpp \
    Modelos/modelostock.cpp \
    Modelos/modelousuario.cpp \
    Modelos/modeloboton.cpp \
    Tablas/tablastock.cpp \
    Tablas/tablabotones.cpp \
    Tablas/tablausuarios.cpp \
    Tablas/delegacionestablastock.cpp \
    Interfaces/estadoplaca.cpp \
    Interfaces/controlstock.cpp \
    Interfaces/seleccionbebidas.cpp \
    Interfaces/controlusuarios.cpp \

HEADERS += \
    Interfaces/controlbotones.h \
    controlsenales.h \
    BaseDatos/db.h \
    Componentes/rtc.h \
    Componentes/serial.h \
    Componentes/temperatura.h \
    Componentes/listadoopciones.h \
    Componentes/barraprogreso.h \
    Componentes/interfazlogin.h \
    Componentes/interfazpuertoserie.h \
    Tablas/delegacionestablastock.h \
    Tablas/tablastock.h \
    Tablas/tablabotones.h \
    Tablas/tablausuarios.h \
    Modelos/modelostock.h \
    Modelos/modelousuario.h \
    Modelos/modeloboton.h \
    Templates/crud.tpp \
    Templates/tramas.h \
    Interfaces/estadoplaca.h \
    Interfaces/controlstock.h \
    Interfaces/seleccionbebidas.h \
    Interfaces/controlusuarios.h \ \
    controlventana.h \
    interfazventana.h

FORMS += \
    controlventana.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

RESOURCES += \
    Recursos.qrc

DISTFILES += \
    DB/dispenser.db

