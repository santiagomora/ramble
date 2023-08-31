#include "temperatura.h"

Temperatura::Temperatura(
    QWidget* parent
)
    :   QWidget{parent}
{
    inicializarInterfaz();
    inicializarComponentes();
    setEnabled(false);
}

Temperatura::~Temperatura(){
    delete interfaz;
    delete display;
    delete tempTexto;
}

void Temperatura::inicializarInterfaz(){
    interfaz = new QVBoxLayout(this);
}

void Temperatura::inicializarComponentes(){
    display = new QLCDNumber(TEMP_LENGTH,this);
    tempTexto = new QLabel("Temperatura.",this);
    display->display("-°C");
    interfaz->addWidget( display );
    interfaz->addWidget( tempTexto );
}

void Temperatura::tramaTemperaturaRecibida( int* _temperatura ){
    temperatura = *_temperatura;
//    if(isEnabled())
        display->display(QString::number(temperatura)+"°C");
    delete _temperatura;
}
