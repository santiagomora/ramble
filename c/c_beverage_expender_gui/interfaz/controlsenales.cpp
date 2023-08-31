#include "controlsenales.h"
#include "ui_mainwindow.h"

const char* setTramasRecepcion[CANT_CODIGOS_RECEPCION] = {
    "$COD:%*d,ALM:%*d,LEC:%d#",   //COD_RP_CONEXION_ESTABLECIDA
    "$COD:%*d,ALM:%*d,LEC:%d#",   //COD_RP_LECTURA_TEMPERATURA
    "$COD:%*d,ALM:%*d,LEC:%s#",   //COD_RP_LECTURA_RTC
    "$COD:%d,ALM:%d,LEC:%s#",     //COD_RP_LOGS_RECIBIDOS
    "$COD:%*d,ALM:%*d,LEC:%d#",   //COD_RP_PROGRESO_ENTREGA
    "$COD:%*d,ALM:%d,LEC:%*d#",   //COD_RP_ESTADO_ALARMA
    "$COD:%*d,ALM:%*d,LEC:%d#",   //COD_RP_SOLICITUD_STOCK
    "$COD:%*d,ALM:%*d,LEC:%d#",   //COD_RP_BEBIDA_ENTREGADA
    "$COD:%*d,ALM:%*d,LEC:%d#"    //COD_RP_BOTON_PRESIONADO
};

const char* setTramasEnvio[CANT_CODIGOS_ENVIO] = {
    "$COD:0,ALM:%d,LEC:%d#",     //COD_EV_ESTADO_CONEXION
    "$COD:1,ALM:%d,LEC:%s#",     //COD_EV_ESTADO_STOCK
    "$COD:2,ALM:%d,LEC:%s#",     //COD_EV_SET_RTC
    "$COD:3,ALM:%d,LEC:%d#",     //COD_EV_ENVIAR_LOGS
    "$COD:4,ALM:%d,LEC:%d#",     //COD_EV_PEDIDO_BEBIDA
    "$COD:5,ALM:%d,LEC:%d#",     //COD_EV_INGRESO_ADMIN
    "$COD:6,ALM:%d,LEC:%d#",     //COD_EV_CIERRE_PUERTO
};

ControlSenales::ControlSenales(
    QWidget *parent
)
    :   QMainWindow{parent},
        ui{new Ui::MainWindow}
{
    inicializarVentana();
    inicializarComponentes();
    conectarEnvioTramas();
    conectarRecepcionTramas();
    inicializarManejoTramas();
}

ControlSenales::~ControlSenales(){
    delete db;
    delete instanciaDB;
    delete modeloStock;
    delete modeloUsuario;
    delete rtc;
    delete temperatura;
    delete puertoSerie;
}

void ControlSenales::inicializarVentana(){
    db = new DB();
    cuerpoVentana = new QWidget(this);
}

void ControlSenales::inicializarComponentes(){
    instanciaDB = db->abrir();
    modeloStock = new ModeloStock(cuerpoVentana,instanciaDB);
    modeloUsuario = new ModeloUsuario(cuerpoVentana,instanciaDB);
    modeloBoton = new ModeloBoton(cuerpoVentana,instanciaDB);
    temperatura = new Temperatura();
    puertoSerie = new Serial("name",this);
    barraProgreso = new BarraProgreso();
    listadoOpciones = new ListadoOpciones(modeloStock);
    rtc = new RTC();
}

void ControlSenales::inicializarManejoTramas(){
    tramaRecepcion = new Tramas(setTramasRecepcion);
    tramaEnvio = new Tramas(setTramasEnvio);
}

void ControlSenales::conectarRecepcionTramas(){
    connect(puertoSerie,&Serial::enviarTramaComponente,this,&ControlSenales::procesarRecepcionTramaSerial);
    connect(listadoOpciones,&ListadoOpciones::pedirBebida,this,&ControlSenales::procesarRecepcionTramaSerial);
}

void ControlSenales::conectarEnvioTramas(){
    connect(modeloStock,SIGNAL(stockConsultado(int,char*,int)),this,SLOT(procesarEnvioTramaSerial(int,char*,int)));
    connect(this,SIGNAL(emitirConexionEstablecida(int,int,int)),this,SLOT(procesarEnvioTramaSerial(int,int,int)));
    connect(this,SIGNAL(emitirConexionEstablecida(int,int,int)),this,SLOT(procesarEnvioTramaSerial(int,int,int)));
    connect(rtc,SIGNAL(enviarCambioFechaRTC(int,char*,int)),this,SLOT(procesarEnvioTramaSerial(int,char*,int)));
    connect(this,SIGNAL(loginAdministrador(int,int,int)),this,SLOT(procesarEnvioTramaSerial(int,int,int)));
}

void ControlSenales::procesarRecepcionTramaSerial(
    int codigo,
    const char* trama
){
    switch( codigo ){
        case COD_RP_CONEXION_ESTABLECIDA:
            tramaRecepcion->procesarTramaRecepcion<ControlSenales,int>(codigo,trama,&ControlSenales::evaluarConexionEstablecida,this, new int);
            break;
        case COD_RP_ESTADO_ALARMA:
            tramaRecepcion->procesarTramaRecepcion<ControlSenales,int>(codigo,trama,&ControlSenales::codigoAlarmaRecibido,this, new int);
            break;
        case COD_RP_LECTURA_TEMPERATURA:
            tramaRecepcion->procesarTramaRecepcion<Temperatura,int>(codigo,trama,&Temperatura::tramaTemperaturaRecibida,temperatura, new int);
            break;
        case COD_RP_LECTURA_RTC:
            tramaRecepcion->procesarTramaRecepcion<RTC,char>(codigo,trama,&RTC::tramaFechaRecibida,rtc,new char[20]);
            break;
        case COD_RP_LOGS_RECIBIDOS:
            break;
        case COD_RP_PROGRESO_ENTREGA:
            tramaRecepcion->procesarTramaRecepcion<BarraProgreso,int>(codigo,trama,&BarraProgreso::progresoEntregaBebida,barraProgreso,new int);
            break;
        case COD_RP_SOLICITUD_STOCK:
            tramaRecepcion->procesarTramaRecepcion<ModeloStock,int>(codigo,trama,&ModeloStock::handleConsultaStock,modeloStock,new int);
            break;
        case COD_RP_BEBIDA_ENTREGADA:
            tramaRecepcion->procesarTramaRecepcion<ModeloStock,int>(codigo,trama,&ModeloStock::descontarStock,modeloStock,new int);
            break;
        case COD_RP_BOTON_PRESIONADO:
            tramaRecepcion->procesarTramaRecepcion<ModeloStock,int>(codigo,trama,&ModeloStock::handleConsultaStock,modeloStock,new int);
            break;
        default: break;
    }
}

template<typename T>
void ControlSenales::procesarTramaEnvio(int codigo,T escritura,int _estadoAlarma){
    estadoAlarma = _estadoAlarma;
    tramaEnvio->procesarTramaEnvio<Serial,T>(codigo,escritura,puertoSerie,&Serial::recibirTramaComponente,estadoAlarma);
}

void ControlSenales::procesarEnvioTramaSerial(int codigo,int escritura, int _estadoAlarma){
    procesarTramaEnvio<int>(codigo,escritura,_estadoAlarma);
}

void ControlSenales::procesarEnvioTramaSerial(int codigo,char* escritura,int _estadoAlarma){
    procesarTramaEnvio<char*>(codigo,escritura,_estadoAlarma);
}

void ControlSenales::evaluarConexionEstablecida(int*){}

void ControlSenales::codigoAlarmaRecibido(int*){}

void ControlSenales::cambioTab(int){}
