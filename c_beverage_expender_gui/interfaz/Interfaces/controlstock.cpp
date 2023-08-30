#include "controlstock.h"

/*
    QLabel* tituloSeccion;
    QLabel* tituloFecha;
    QLabel* tituloTabla;
    QWidget* widgetTitulo;
    QGridLayout* interfaz;
    TablaStock* tablaStock;
    InterfazLogin* interfazLogin;
    FechaDispositivo* fechaDispositivo;
    DB* db;
*/
ControlStock::ControlStock(
    QTabWidget* parent,
    ModeloStock* _modeloStock
)
    :   QWidget{parent},
        modeloStock{_modeloStock},
        tabContainer{parent}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfaz();
}

ControlStock::~ControlStock(){
    delete interfaz;
}

void ControlStock::inicializarInterfaz(){
    interfaz = new QVBoxLayout(this);
}

void ControlStock::inicializarComponentes(){
    habilitar = false;
    tablaStock = new TablaStock(this,modeloStock);
//    setEnabled(habilitar);
}


void ControlStock::construirInterfaz(){
    interfaz->setSizeConstraint(QLayout::SetMaximumSize);
    interfaz->addWidget(tablaStock);
}

void ControlStock::toggleHabilitar( QString rol, QString adminId ){
    habilitar = rol == "Administrador" || rol == "SuperAdministrador";
    tabContainer->setTabEnabled(INDICE_PANEL_CONTROL,habilitar);
    tabContainer->setCurrentIndex(0);
    setEnabled(habilitar);
    emit tablaStock->cambiarResultadosStock( rol,adminId );
}

void ControlStock::rehacerConsulta(){
    tablaStock->prepararVista();
}
