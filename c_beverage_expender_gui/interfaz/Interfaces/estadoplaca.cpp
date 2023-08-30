#include "estadoplaca.h"

/*
    Miembros
        QGridLayout* grid;
        InterfazPuertoSerie* interfazPuertoSerie;
        InterfazRTC* interfazRTC;
        InterfazTemperatura* interfazTemperatura;
*/

EstadoPlaca::EstadoPlaca(
    QWidget *parent,
    RTC* _rtc,
    Temperatura* _temperatura,
    Serial* _puertoSerie
)
    :   QWidget{parent},
        rtc{_rtc},
        temperatura{_temperatura},
        puertoSerie{_puertoSerie}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfaz();
}

EstadoPlaca::~EstadoPlaca(){
    delete grid;
    delete interfazPuertoSerie;
}

void EstadoPlaca::inicializarInterfaz(){
    grid = new QGridLayout(this);
}

void EstadoPlaca::inicializarComponentes(){
    interfazPuertoSerie = new InterfazPuertoSerie(this,puertoSerie);
}

void EstadoPlaca::construirInterfaz(){
    grid->addWidget(interfazPuertoSerie,1,1,2,1);
    grid->addWidget(temperatura,1,2,2,1);
    grid->addWidget(rtc,1,3,2,1);
}

