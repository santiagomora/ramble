#include "controlventana.h"

const char* mensajesAlarma[CANT_ALARMAS] = {
    "No hay stock del item seleccionado",
    "Temperatura maxima alcanzada",
    "Temperatura minima alcanzada"
};

ControlVentana::ControlVentana()
    : InterfazVentana()
{
    inicializarEstadoSecciones();
    conectarComponentes();
}

ControlVentana::~ControlVentana() {

}

void ControlVentana::cambioSesionUsuario(bool isLogin){
    widgetSecciones->setTabEnabled(INDICE_SELECCION_BEBIDAS,isLogin);
    widgetSecciones->setTabEnabled(INDICE_PANEL_CONTROL,false);
    widgetSecciones->setTabEnabled(INDICE_CONTROL_BOTONES,false);
    widgetSecciones->setTabEnabled(INDICE_CONTROL_USUARIOS,false);
    widgetSecciones->setCurrentIndex(INDICE_SELECCION_BEBIDAS);
}

void ControlVentana::cambioSesionAdministrador(bool isLogin){
    widgetSecciones->setTabEnabled(INDICE_SELECCION_BEBIDAS,!isLogin);
    widgetSecciones->setTabEnabled(INDICE_PANEL_CONTROL,isLogin);
    widgetSecciones->setTabEnabled(INDICE_CONTROL_BOTONES,isLogin);
    widgetSecciones->setTabEnabled(INDICE_CONTROL_USUARIOS,false);
    widgetSecciones->setCurrentIndex( isLogin ? INDICE_PANEL_CONTROL : INDICE_SELECCION_BEBIDAS );
    emit loginAdministrador(COD_EV_INGRESO_ADMIN,isLogin ? 1 : 0,DEFAULT_ESTADO_ALARMA);
}

void ControlVentana::cambioSesionSuperAdministrador(bool isLogin){
    widgetSecciones->setTabEnabled(INDICE_SELECCION_BEBIDAS,!isLogin);
    widgetSecciones->setTabEnabled(INDICE_PANEL_CONTROL,isLogin);
    widgetSecciones->setTabEnabled(INDICE_CONTROL_USUARIOS,isLogin);
    widgetSecciones->setTabEnabled(INDICE_CONTROL_BOTONES,isLogin);
    widgetSecciones->setCurrentIndex( isLogin ? INDICE_PANEL_CONTROL : INDICE_SELECCION_BEBIDAS );
    emit loginAdministrador(COD_EV_INGRESO_ADMIN,isLogin ? 1 : 0,DEFAULT_ESTADO_ALARMA);
}

void (ControlVentana::*handlerRolLoginOut[CANT_ROLES])(bool) = {
    &ControlVentana::cambioSesionSuperAdministrador,
    &ControlVentana::cambioSesionAdministrador,
    &ControlVentana::cambioSesionUsuario
};

void ControlVentana::handleCambioSesion( int rol,bool isLogin ){
    (this->*handlerRolLoginOut[rol-1])(isLogin);
    emit interfazLogin->generarToggle(isLogin);
}

void ControlVentana::conectarComponentes(){
    connect(modeloUsuario,&ModeloUsuario::cambioSesion,this,&ControlVentana::handleCambioSesion);
}

void ControlVentana::evaluarConexionEstablecida(int* _estadoConexion){
    bool activo;
    estadoConexion = *_estadoConexion;
    activo = estadoConexion==CONEXION_ESTABLECIDA;
    widgetSecciones->setEnabled(activo);
    interfazLogin->setEnabled(activo);
    rtc->setEnabled(activo);
    temperatura->setEnabled(activo);
    emit emitirConexionEstablecida(COD_EV_CONEXION_ESTABLECIDA,1,DEFAULT_ESTADO_ALARMA);
    delete _estadoConexion;
}

void ControlVentana::codigoAlarmaRecibido(int *_codigoAlarma){
//    qInfo()<<mensajesAlarma[codigoAlarma];
    interfazLogin->setEnabled(true);
    seleccionBebidas->setEnabled(false);
    widgetSecciones->setTabEnabled(INDICE_SELECCION_BEBIDAS,false);
    widgetSecciones->setCurrentIndex(INDICE_PANEL_CONTROL);
    estadoAlarma = *_codigoAlarma;
    delete _codigoAlarma;
}

void ControlVentana::inicializarEstadoSecciones(){
    widgetSecciones->setTabEnabled( INDICE_SELECCION_BEBIDAS,true );
    widgetSecciones->setTabEnabled( INDICE_PANEL_CONTROL,false);
    widgetSecciones->setTabEnabled( INDICE_CONTROL_USUARIOS,false );
    widgetSecciones->setTabEnabled( INDICE_CONTROL_BOTONES,false );
    widgetSecciones->setEnabled(false);
    interfazLogin->setEnabled(false);
}


