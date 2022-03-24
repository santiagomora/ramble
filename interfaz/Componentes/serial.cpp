#include "serial.h"


Serial::Serial(
    QObject *parent
)
    :   QSerialPort{parent}
{
    conectarSenales();
};

Serial::~Serial(){
}

void Serial::conectarSenales(){
    connect(this,&Serial::aboutToClose,this,&Serial::handleCierrePuerto);
}

void Serial::setVelocidad( int _baudRate ){
    baudRate = _baudRate;
}

void Serial::inicializarPuerto(){
    setBaudRate( baudRate );
    setFlowControl( QSerialPort::NoFlowControl );
    setParity( QSerialPort::NoParity );
    setDataBits( QSerialPort::Data8 );
    setStopBits( QSerialPort::OneStop );
}

void Serial::desconectarPuerto(){
    close();
}

void Serial::reportarError( QString mensaje ){
    QMessageBox::critical(nullptr,"Error",mensaje);
}

bool Serial::conectarPuerto( QString _nombrePuerto ){
    nombrePuerto = _nombrePuerto;
    infoPuerto = new QSerialPortInfo( nombrePuerto );
    if ( !infoPuerto->isNull() ){
        setPort(*infoPuerto);
        inicializarPuerto();
        if( open(QIODevice::ReadWrite) ){
            connect(this,&Serial::readyRead,this,&Serial::recibirTramaSerial);
            enviarTramaSerial("$COD:0,ALM-1,LEC:1#");
            return true;
        }
    }
    reportarError("No se puede abrir el puerto: "+nombrePuerto);
    return false;
}

QComboBox* Serial::enumerarPuertos( QComboBox* desplegable ){
    QList<QSerialPortInfo> portNames = QSerialPortInfo::availablePorts();
    desplegable->addItem("Selecciona el puerto serial.");
    for( int i = 0; i < portNames.size(); i++ ){
        desplegable->addItem(
            portNames.at(i).portName(),
            portNames.at(i).portName()
        );
    }
    return desplegable;
}

void Serial::procesarTrama(const char* trama){
    sscanf(trama,"$COD:%d,ALM:%d",&codigo,&alarma);
    codigo =  (alarma>=0)
            ? COD_RP_ESTADO_ALARMA
            : codigo;
    emit enviarTramaComponente(codigo,trama);
}

void Serial::recibirTramaSerial(){
    int bufSize = bytesAvailable()*sizeof(char);
    char* bufferLectura = new char[bufSize];
    qint64 bytesLeidos = read(bufferLectura,bufSize);
    if ( bytesLeidos>0 ){
        procesarTrama(bufferLectura);
    } else
        reportarError("Error al leer los datos del puerto serial: "+nombrePuerto);
    delete[] bufferLectura;
}

void Serial::enviarTramaSerial( const char* trama ){
    qint64 size = strlen(trama)*sizeof(char);
    qint64 bytesEscritos = write(trama,size);
    qInfo()<<"trama:"<<trama;
    if( bytesEscritos<0 )
        reportarError("Error al enviar los datos por puerto serial: "+nombrePuerto);
}

void Serial::recibirTramaComponente(const char* trama){
    enviarTramaSerial(trama);
}

void Serial::handleCierrePuerto(){
    enviarTramaSerial("$COD:6,ALM:-1,LEC:1#");
}
