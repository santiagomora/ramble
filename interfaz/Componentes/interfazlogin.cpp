#include "interfazlogin.h"
#include <QDebug>
/*
    Miembros
    Button* botonLogin;
    Button* botonLogout;
    Text* inputUsuario;
    Text* inputContrasena;
    QGridLayout* interfaz;
    QGridLayout* interfazTexto;
    QVBoxLayout* interfazBotones;
    QVBoxLayout* interfazTitulo;
    QWidget* widgetBotones;
    QWidget* widgetTexto;
    QWidget* widgetTitulo;
    QLabel* textoUsuario;
    QLabel* textoContrasena;
    QLabel* titulo;
    DB* db;
*/
InterfazLogin::InterfazLogin(
    QWidget* parent,
    ModeloUsuario* _modeloUsuario
)
    :   QWidget{parent},
        modeloUsuario{_modeloUsuario}
{
    inicializarInterfaz();
    inicializarComponentes();
    conectarSecciones();
    construirInterfaz();
}

InterfazLogin::~InterfazLogin(){
    delete inputUsuario;
    delete inputContrasena;
    delete botonLogin;
    delete botonLogout;
    delete textoUsuario;
    delete textoContrasena;
    delete titulo;
    delete interfazTexto;
    delete interfazBotones;
    delete interfazTitulo;
    delete interfaz;
    delete widgetTexto;
    delete widgetTitulo;
    delete widgetBotones;
}

void InterfazLogin::inicializarInterfaz(){
    interfaz = new QGridLayout(this);
    widgetBotones = new QWidget(this);
    widgetTexto = new QWidget(this);
    widgetTitulo = new QWidget(this);
    interfazTexto = new QGridLayout(widgetTexto);
    interfazBotones = new QVBoxLayout(widgetBotones);
    interfazTitulo = new QVBoxLayout(widgetTitulo);
}

void InterfazLogin::inicializarComponentes(){
    inputUsuario = new QLineEdit(this);
    inputContrasena = new QLineEdit(this);
    mensajeLogin = new QLabel("Comienza ingresando tus credenciales");
    botonLogin = new QPushButton("Ingresar",widgetBotones);
    botonLogout = new QPushButton("Salir",widgetBotones);
    textoUsuario = new QLabel("Usuario",widgetTexto);
    textoContrasena = new QLabel("Contraseña",widgetTexto);
    titulo = new QLabel("Ingrese sus credenciales para acceder al modo administrador.",widgetTitulo);
    inputUsuario->setText("santiago");
    inputContrasena->setText("password");
    toggleElementos(false);
}

void InterfazLogin::conectarSecciones(){
    connect( botonLogin,&QPushButton::clicked,this,&InterfazLogin::iniciarSesion );
    connect( botonLogout,&QPushButton::clicked,this,&InterfazLogin::finalizarSesion );
    connect( this,&InterfazLogin::generarToggle,this,&InterfazLogin::toggleElementos );
}

void InterfazLogin::construirInterfaz(){
    interfazTitulo->addWidget(titulo);
    interfazBotones->addWidget(botonLogin);
    interfazBotones->addWidget(botonLogout);
    interfazTexto->addWidget(textoUsuario,1,1);
    interfazTexto->addWidget(inputUsuario,1,2);
    interfazTexto->addWidget(textoContrasena,2,1);
    interfazTexto->addWidget(inputContrasena,2,2);
    interfaz->addWidget(widgetTitulo,1,1);
    interfaz->addWidget(widgetTexto,2,1);
    interfaz->addWidget(widgetBotones,2,2);
    interfaz->addWidget(mensajeLogin,3,1,1,-1);
}

void InterfazLogin::iniciarSesion(){
    QString usernameUsuario{inputUsuario->text()};
    QString passUsuario{inputContrasena->text()};
    if ( modeloUsuario->login( usernameUsuario,passUsuario ) ){
        inputUsuario->clear();
        inputContrasena->clear();
        mensajeLogin->setText("Bienvenido, "+modeloUsuario->getName()+". Has ingresado en modo: "+modeloUsuario->getRol());
    }
    else
        mensajeLogin->setText("Usuario o contraseña incorrectos.");
}

void InterfazLogin::finalizarSesion(){
    if( modeloUsuario->estadoSesion() ){
        modeloUsuario->logout();
        mensajeLogin->setText("Comienza ingresando tus credenciales");
    }
}

void InterfazLogin::toggleElementos( bool isLogin ){
    botonLogout->setEnabled(isLogin);
    botonLogin->setEnabled(!isLogin);
    textoUsuario->setEnabled(!isLogin);
    inputUsuario->setEnabled(!isLogin);
    textoContrasena->setEnabled(!isLogin);
    inputContrasena->setEnabled(!isLogin);
}
