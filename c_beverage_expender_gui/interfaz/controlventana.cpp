#include "interfazventana.h"
#include "ui_mainwindow.h"

/*
    Miembros
    QWidget* cuerpoVentana;
    EstadoPlaca* estadoPlaca;
    QWidget* widgetEstadoPlaca;
    QTabWidget* widgetSecciones;
    QVBoxLayout* interfaz;
    QScrollArea* scrollPanelControl;
    QScrollArea* scrollControlUsuarios;
    SeleccionBebidas* seleccionBebidas;
    PanelControl* panelControl;
    ControlUsuarios* controlUsuarios;
    InterfazLogin* interfazLogin;
*/
InterfazVentana::InterfazVentana(QWidget *parent) :
    ControlSenales{parent}
{
    inicializarInterfaz();
    inicializarComponentes();
    inicializarSecciones();
    construirInterfaz();
    conectarHandlers();
}

InterfazVentana::~InterfazVentana()
{
    delete cuerpoVentana;
    delete puertoSerie;
    delete estadoPlaca;
    delete widgetEstadoPlaca;
    delete widgetSecciones;
    delete interfaz;
    delete scrollControlStock;
    delete scrollControlUsuarios;
    delete seleccionBebidas;
    delete controlStock;
    delete controlUsuarios;
    delete interfazLogin;
}

void InterfazVentana::inicializarInterfaz(){
    cuerpoVentana = new QWidget(this);
    interfaz = new QVBoxLayout(cuerpoVentana);
    widgetSecciones = new QTabWidget(cuerpoVentana);
    scrollControlStock = new QScrollArea;
    scrollControlUsuarios = new QScrollArea;
    scrollControlBotones = new QScrollArea;
}

void InterfazVentana::inicializarComponentes(){
    seleccionBebidas = new SeleccionBebidas(widgetSecciones,modeloStock,barraProgreso,listadoOpciones);
    controlStock = new ControlStock(widgetSecciones,modeloStock);
    controlUsuarios = new ControlUsuarios(widgetSecciones,modeloUsuario);
    controlBotones = new ControlBotones(widgetSecciones,modeloBoton);
    interfazLogin = new InterfazLogin(cuerpoVentana,modeloUsuario);
    estadoPlaca = new EstadoPlaca(cuerpoVentana,rtc,temperatura,puertoSerie);
}

void InterfazVentana::inicializarSecciones(){
    scrollControlStock->setWidget(controlStock);
    scrollControlUsuarios->setWidget(controlUsuarios);
    scrollControlBotones->setWidget(controlBotones);
    scrollControlStock->setWidgetResizable(true);
    scrollControlUsuarios->setWidgetResizable(true);
    scrollControlBotones->setWidgetResizable(true);
    widgetSecciones->addTab( seleccionBebidas,"Seleccion bebidas" );
    widgetSecciones->addTab( scrollControlStock,"Control stock" );
    widgetSecciones->addTab( scrollControlBotones,"Control botones" );
    widgetSecciones->addTab( scrollControlUsuarios,"Control usuarios" );
}


void InterfazVentana::construirInterfaz(){
    setFixedWidth(600);
    setFixedHeight(650);
    cuerpoVentana->setFixedWidth(600);
    cuerpoVentana->setFixedHeight(650);
    interfaz->addWidget(estadoPlaca);
    interfaz->addWidget(interfazLogin);
    interfaz->addWidget(widgetSecciones);
}

void InterfazVentana::conectarHandlers(){
    connect(widgetSecciones,SIGNAL(currentChanged(int)),this,SLOT(cambioTab(int)));
}

void InterfazVentana::cambioTab( int index ){
    qInfo()<<index;
    switch(index){
        case INDICE_CONTROL_BOTONES: controlBotones->rehacerConsulta();
        break;
        case INDICE_CONTROL_USUARIOS: controlUsuarios->rehacerConsulta();
        break;
        case INDICE_PANEL_CONTROL: controlStock->rehacerConsulta();
        break;
        case INDICE_SELECCION_BEBIDAS: seleccionBebidas->rehacerConsulta();
        break;
        default: break;
    }
}

