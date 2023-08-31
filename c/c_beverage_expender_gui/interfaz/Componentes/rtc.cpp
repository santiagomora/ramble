#include "rtc.h"


RTC::RTC(
    QWidget* parent
)
    :   QWidget{parent}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfaz();
    inicializarEdicionFecha();
    conectarComponentes();
};

RTC::~RTC(){
    delete interfaz;
    delete tituloFecha;
    delete display;
    delete guardarFecha;
    delete display;
    delete editarFecha;
}


void RTC::inicializarInterfaz(){
    interfaz = new QVBoxLayout( this );
}

void RTC::inicializarComponentes(){
    habilitar = false;
    display = new QLCDNumber(DATE_LENGTH,this);
    tituloFecha = new QLabel("Fecha y hora RTC",this);
    editarFecha = new QDateTimeEdit(QDate::currentDate(),this);
    guardarFecha = new QPushButton("GUARDAR",this);
    display->display("--/--/--/ --:--:--");
    setEnabled(habilitar);
}

void RTC::construirInterfaz(){
    interfaz->addWidget(display);
    interfaz->addWidget(tituloFecha);
    interfaz->addWidget(editarFecha);
    interfaz->addWidget(guardarFecha);
    setEnabled(habilitar);
}

void RTC::inicializarEdicionFecha(){
    editarFecha->setMinimumDate(QDate::currentDate().addDays(-365));
    editarFecha->setMaximumDate(QDate::currentDate().addDays(365));
    editarFecha->setTime( QTime::currentTime() );
    editarFecha->setDisplayFormat("dd/MM/yyyy_hh:mm:ss");
}

void RTC::conectarComponentes(){
    connect(guardarFecha,&QPushButton::clicked,this,&RTC::cambiarFechaRTC);
}

void RTC::cambiarFechaRTC(){
    QString fecha{editarFecha->text()};
    emit enviarCambioFechaRTC(COD_EV_SET_RTC,fecha.toLocal8Bit().data(),DEFAULT_ALARMA);
}

void RTC::tramaFechaRecibida( char* _nuevaFecha ){
    strcpy(nuevaFecha,_nuevaFecha);
    if(isEnabled())
        display->display(nuevaFecha);
    delete _nuevaFecha;
}

void RTC::toggleHabilitar(){
    habilitar = !habilitar;
    setEnabled( habilitar );
}
