#include "controlusuarios.h"

/*
    QLabel* tituloSeccion;
    QLabel* tituloFecha;
    QLabel* tituloTabla;
    QWidget* widgetTitulo;
    QGridLayout* interfaz;
    TablaUsuarios* tablaUsuarios;
    FechaDispositivo* fechaDispositivo;
    DB* db;
*/
ControlUsuarios::ControlUsuarios(
    QTabWidget* parent,
    ModeloUsuario* _modeloUsuario
)
    :   QWidget{parent},
        tabContainer{parent},
        modeloUsuario{_modeloUsuario}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfaz();
}

ControlUsuarios::~ControlUsuarios(){
    delete interfaz;
    delete tablaUsuarios;
}

void ControlUsuarios::inicializarInterfaz(){
    scroll = new QScrollArea;
    interfaz = new QVBoxLayout(this);
}

void ControlUsuarios::inicializarComponentes(){
    habilitar = false;
    tablaUsuarios = new TablaUsuarios(this,modeloUsuario);
//    setEnabled(habilitar);
}


void ControlUsuarios::construirInterfaz(){
    interfaz->addWidget(tablaUsuarios);
    interfaz->setSizeConstraint(QLayout::SetMinimumSize);
}

void ControlUsuarios::toggleHabilitar( QString rol,QString adminId ){
    habilitar = rol == "SuperAdministrador";
    tabContainer->setTabEnabled( INDICE_CONTROL_USUARIOS,habilitar );
    tabContainer->setCurrentIndex(0);
    setEnabled(habilitar);
    emit tablaUsuarios->cambiarResultadosUsuario(rol,adminId);
}

void ControlUsuarios::rehacerConsulta(){
    tablaUsuarios->prepararVista();
}
