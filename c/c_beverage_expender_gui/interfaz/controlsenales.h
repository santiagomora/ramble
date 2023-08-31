#ifndef CONTROLSENALES_H
#define CONTROLSENALES_H

#include <QMainWindow>
#include <QMainWindow>
#include <QMessageBox>
#include <QDateTime>
#include <QImageReader>
#include <QPicture>
#include <QFileDialog>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

#include <BaseDatos/db.h>
#include <Componentes/serial.h>
#include <Componentes/rtc.h>
#include <Componentes/temperatura.h>
#include <Componentes/barraprogreso.h>
#include <Componentes/listadoopciones.h>
#include <Modelos/modelostock.h>
#include <Modelos/modelousuario.h>
#include <Modelos/modeloboton.h>
#include <Templates/tramas.h>

#define CONEXION_ESTABLECIDA 1
#define CONEXION_PERDIDA     0

class ControlSenales
    : public QMainWindow
{
    Q_OBJECT

    private:
        Ui::MainWindow *ui;
        Tramas* tramaRecepcion;
        Tramas* tramaEnvio;
        void conectarRecepcionTramas();
        void conectarEnvioTramas();
        void inicializarVentana();
        void inicializarComponentes();

    protected:
        int estadoAlarma{DEFAULT_ESTADO_ALARMA};
        DB* db;
        QSqlDatabase* instanciaDB;
        Serial* puertoSerie;
        ModeloUsuario* modeloUsuario;
        ModeloStock* modeloStock;
        ModeloBoton* modeloBoton;
        Temperatura* temperatura;
        ListadoOpciones* listadoOpciones;
        RTC* rtc;
        QWidget* cuerpoVentana;
        BarraProgreso* barraProgreso;
        virtual void evaluarConexionEstablecida(int*);
        virtual void codigoAlarmaRecibido(int*);
        void inicializarManejoTramas();
        template<class T> void procesarTramaEnvio(int,T,int);

    public:
        ControlSenales(QWidget* parent);
        ~ControlSenales();

    signals:
        void emitirConexionEstablecida(int,int,int);
        void estadoAlarmaDetectado(int);
        void loginAdministrador(int,int,int);

    public slots:
        void procesarRecepcionTramaSerial(int,const char*);
        void procesarEnvioTramaSerial(int,int,int);
        void procesarEnvioTramaSerial(int,char*,int);
        virtual void cambioTab(int);

};

#endif // CONTROLSENALES_H
