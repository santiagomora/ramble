#include "interfazpuertoserie.h"

/*
    Miembros
        QVBoxLayout* lcol1;
        QVBoxLayout* lcol2;
        QGridLayout* grid;
        QWidget* conexion;
        QWidget* temperatura;
        QLabel* estadoPuerto;
        Serial* puertoSerie; //se crea cuando conectamos
        Button* conectarPuerto;
        Button* desconectarPuerto;
        Select* listadoPuertos;
        RTC* rtc;
        Temperatura* temp;
*/
int velocidadesSerie[CANT_VELOCIDADES_SERIE] = {
    QSerialPort::Baud9600,
    QSerialPort::Baud115200
};

InterfazPuertoSerie::InterfazPuertoSerie(
    QWidget *parent,
    Serial* _puertoSerie
)
    :   QWidget{parent},
        puertoSerie{_puertoSerie}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfazConexion();
    conectarComponentes();
}

InterfazPuertoSerie::~InterfazPuertoSerie(){
    delete estadoPuerto;
    delete conectarPuerto;
    delete desconectarPuerto;
    limpiarBotones();
}

void InterfazPuertoSerie::toggleVelocidades( bool estado ){
    for( int i=0; i<CANT_VELOCIDADES_SERIE; i++ )
        velocidades[i]->setEnabled(estado);
}

void InterfazPuertoSerie::limpiarBotones(){
    for( int i=0; i<CANT_VELOCIDADES_SERIE; i++ ){
        if (velocidades[i]!=nullptr)
            delete velocidades[i];
    }
}

void InterfazPuertoSerie::inicializarInterfaz(){
    interfaz= new QGridLayout(this);
}

void InterfazPuertoSerie::inicializarComponentes(){
    estadoPuerto = new QLabel("DESCONECTADO DE LA PLACA");
    conectarPuerto = new QPushButton("CONECTAR",this);
    desconectarPuerto = new QPushButton("DESCONECTAR",this);
    simularRecepcion = new QPushButton("SIMULAR RECEPCION",this);
    buscarPuertos = new QPushButton("BUSCAR",this);
    listarPuertos();
    simularPuertoSerie();
    puertoSerie->setVelocidad(velocidadesSerie[velocidadSeleccionada]);
    simularRecepcion = new QPushButton("SIMULAR RECEPCION",this);
}

void InterfazPuertoSerie::conectarComponentes(){
    connect( conectarPuerto,&QPushButton::clicked,this,&InterfazPuertoSerie::conectarPuertoSerie );
    connect( desconectarPuerto,&QPushButton::clicked,this,&InterfazPuertoSerie::desconectarPuertoSerie );
    connect( buscarPuertos,&QPushButton::clicked,this,&InterfazPuertoSerie::listarPuertos );

    connect( simularRecepcion,&QPushButton::clicked,this,&InterfazPuertoSerie::enviarTramaPrueba );
    connect( puertoPrueba,&Serial::readyRead,this,&InterfazPuertoSerie::recibirTramaPrueba);
}

void InterfazPuertoSerie::construirInterfazConexion(){
    interfaz->addWidget(estadoPuerto,1,1,1,-1);
    interfaz->addWidget(listadoPuertos,2,1,1,1);
    interfaz->addWidget(buscarPuertos,2,2,1,1);
    interfaz->addWidget(conectarPuerto,4,1,1,-1);
    interfaz->addWidget(desconectarPuerto,5,1,1,-1);
    interfaz->addWidget(simularRecepcion,6,1,1,-1);
    listarVelocidades(3);
    habilitarBotones(false);
}

void InterfazPuertoSerie::conectarPuertoSerie(){
    bool habilitar = puertoSerie->conectarPuerto( listadoPuertos->currentText() );
    if( habilitar )
        estadoPuerto->setText("CONECTADO A LA PLACA");
    habilitarBotones(habilitar);
}

void InterfazPuertoSerie::desconectarPuertoSerie(){
    puertoSerie->desconectarPuerto();
    estadoPuerto->setText("DESCONECTADO DE LA PLACA");
    habilitarBotones(false);
}

void InterfazPuertoSerie::listarPuertos(){
    listadoPuertos = Serial::enumerarPuertos( new QComboBox(this) );
}

void InterfazPuertoSerie::habilitarBotones( bool estado ){
    conectarPuerto->setEnabled(!estado);
    desconectarPuerto->setEnabled(estado);
    buscarPuertos->setEnabled(!estado);
    listadoPuertos->setEnabled(!estado);
    toggleVelocidades(!estado);
}

void InterfazPuertoSerie::listarVelocidades(int fila){
    for( int i=0; i<CANT_VELOCIDADES_SERIE; i++ ){
        velocidades[i] = new QRadioButton(QString::number(velocidadesSerie[i])+" baudios",this);
        connect( velocidades[i],SIGNAL(clicked(bool)),this,SLOT(cambioSeleccion(bool)) );
        interfaz->addWidget( velocidades[i],fila,i+1,1,1 );
        velocidades[i]->setChecked( i == velocidadSeleccionada );
    }
}


int InterfazPuertoSerie::encontrarPresionado(){
    int defecto = -1;
    for(int i=0; i<CANT_VELOCIDADES_SERIE; i++)
        defecto = ( velocidades[i]->isChecked() )
            ? i
            : defecto;
    return defecto;
}

void InterfazPuertoSerie::cambioSeleccion(bool checked){
    velocidadSeleccionada = encontrarPresionado();
    puertoSerie->setVelocidad(velocidadesSerie[velocidadSeleccionada]);
}

void InterfazPuertoSerie::simularPuertoSerie(){
    QString nombrePrueba{"tnt2"};
    puertoPrueba = new QSerialPort(this);
    QSerialPortInfo* infoPuerto = new QSerialPortInfo( nombrePrueba );
    if ( !infoPuerto->isNull() ){
        puertoPrueba->setPort(*infoPuerto);
        if( !puertoPrueba->open(QIODevice::ReadWrite) ){
            qInfo()<<"error al abrir";
        } else {
            puertoPrueba->setBaudRate(9600);
            puertoPrueba->setFlowControl( QSerialPort::NoFlowControl );
            puertoPrueba->setParity( QSerialPort::NoParity );
            puertoPrueba->setDataBits( QSerialPort::Data8 );
            puertoPrueba->setStopBits( QSerialPort::OneStop );
        }
    }

}

void InterfazPuertoSerie::enviarTramaPrueba(){
    char trama[] = "$COD:0,ALM:-1,LEC:1#";
    qint64 size = strlen(trama)*sizeof(char);
    qInfo()<<puertoSerie->portName()<<"trama enviada:"<<trama;
    qint64 bytesEscritos = puertoPrueba->write(trama,size);
}

void InterfazPuertoSerie::recibirTramaPrueba(){
    int bufSize = puertoPrueba->bytesAvailable()*sizeof(char);
    char* bufferLectura = new char[bufSize];
    qint64 bytesLeidos = puertoPrueba->read(bufferLectura,bufSize);
    qInfo()<<puertoPrueba->portName()<<"trama recibida:"<<bufferLectura;
    delete[] bufferLectura;
}
