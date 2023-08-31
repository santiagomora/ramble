#include "controlbotones.h"

/*
    QLabel* tituloSeccion;
    QLabel* tituloFecha;
    QLabel* tituloTabla;
    QWidget* widgetTitulo;
    QGridLayout* interfaz;
    TablaBotones* tablaBotones;
    InterfazLogin* interfazLogin;
    FechaDispositivo* fechaDispositivo;
    DB* db;
*/
ControlBotones::ControlBotones(
    QTabWidget* parent,
    ModeloBoton* _modeloBoton
)
    :   QWidget{parent},
        modeloBoton{_modeloBoton},
        tabContainer{parent}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfaz();
}

ControlBotones::~ControlBotones(){
    delete interfaz;
}

void ControlBotones::inicializarInterfaz(){
    interfaz = new QVBoxLayout(this);
}

void ControlBotones::inicializarComponentes(){
    habilitar = false;
    tablaBotones = new TablaBotones(this,modeloBoton);
//    setEnabled(habilitar);
}


void ControlBotones::construirInterfaz(){
    interfaz->setSizeConstraint(QLayout::SetMaximumSize);
    interfaz->addWidget(tablaBotones);
}

void ControlBotones::toggleHabilitar( QString rol, QString adminId ){
    habilitar = rol == "Administrador" || rol == "SuperAdministrador";
    tabContainer->setTabEnabled(INDICE_CONTROL_BOTONES,habilitar);
    tabContainer->setCurrentIndex(0);
    setEnabled(habilitar);
}

void ControlBotones::rehacerConsulta(){
    tablaBotones->prepararVista();
}
