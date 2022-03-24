#ifndef SERIAL_H
#define SERIAL_H

#include <QSerialPort>
#include <QSerialPortInfo>
#include <QIODevice>
#include <QMessageBox>
#include <QLabel>
#include <QDebug>
#include <QDir>

//para pruebas
#include <QTimer>
#include <QDateTime>
#include <stdio.h>
#include <QComboBox>

#include <Templates/tramas.h>

#define TAMANO_BUFFER       200

class Serial
    : public QSerialPort
{
    using QSerialPort::QSerialPort;

    Q_OBJECT

    private:
        QString nombrePuerto;
        QSerialPortInfo* infoPuerto;
        int codigo;
        int alarma;
        int baudRate;
        const char* formatoTrama;
        void inicializarPuerto( );
        void procesarTrama(const char*);
        void escribirEnBuffer( char* );
        void conectarSenales();

    public:
        Serial(
            QObject *parent = nullptr
        );
        ~Serial();
        void desconectarPuerto( );
        bool conectarPuerto( QString );
        void reportarError( QString );
        void setVelocidad( int );
        static QComboBox* enumerarPuertos( QComboBox* );
        //aqui por pruebas
        void enviarTramaSerial( const char*);
        void recibirTramaSerial();

    signals:
        void enviarTramaComponente(int,const char*);

    //para simular pruebas
    public slots:
        void recibirTramaComponente(const char*);
        void handleCierrePuerto();
};

#endif // SERIAL_H
