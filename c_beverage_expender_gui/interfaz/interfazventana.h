#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QScrollArea>
#include <QTabWidget>

#include <Interfaces/estadoplaca.h>
#include <Interfaces/seleccionbebidas.h>
#include <Interfaces/controlstock.h>
#include <Interfaces/controlusuarios.h>
#include <Interfaces/controlbotones.h>

#include <Componentes/interfazlogin.h>

#include "controlsenales.h"

#define CANT_ROLES           3

class InterfazVentana
    : public ControlSenales
{
    private:
        QWidget* cuerpoVentana;
        QWidget* widgetEstadoPlaca;
        QVBoxLayout* interfaz;
        QScrollArea* scrollControlStock;
        QScrollArea* scrollControlUsuarios;
        QScrollArea* scrollControlBotones;

    protected:
        QTabWidget* widgetSecciones;
        EstadoPlaca* estadoPlaca;
        SeleccionBebidas* seleccionBebidas;
        ControlStock* controlStock;
        ControlBotones* controlBotones;
        ControlUsuarios* controlUsuarios;
        InterfazLogin* interfazLogin;

    private:
        void inicializarSecciones();
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void conectarHandlers();

    public:
        InterfazVentana(QWidget *parent = nullptr);
        ~InterfazVentana();

    public slots:
        void cambioTab(int);

};
#endif // MAINWINDOW_H
