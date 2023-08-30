#ifndef INTERFAZPUERTOSERIE_H
#define INTERFAZPUERTOSERIE_H

#include <QWidget>
#include <QLabel>
#include <QGridLayout>
#include <QVBoxLayout>
#include <QPushButton>
#include <QRadioButton>

#include <Componentes/serial.h>

#define CANT_VELOCIDADES_SERIE  2

class InterfazPuertoSerie
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QGridLayout* interfaz;
        QLabel* estadoPuerto;
        Serial* puertoSerie;
        QPushButton* conectarPuerto;
        QPushButton* desconectarPuerto;
        QPushButton* simularRecepcion;
        QRadioButton* velocidades[CANT_VELOCIDADES_SERIE];
        QComboBox* listadoPuertos;
        QPushButton* buscarPuertos;
        int velocidadSeleccionada{0};
        QSerialPort* puertoPrueba;

        void listarVelocidades(int);
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfazConexion();
        void construirInterfazTemperatura();
        void conectarComponentes();
        void limpiarBotones();
        int encontrarPresionado();
        void listarPuertos();
        void habilitarBotones( bool );
        void toggleVelocidades( bool );
        void simularPuertoSerie();
        void recibirTramaPrueba();

    public:
        InterfazPuertoSerie(
            QWidget *parent = nullptr,
            Serial* _puertoSerie = nullptr
        );
        ~InterfazPuertoSerie();

    public slots:
        void conectarPuertoSerie();
        void desconectarPuertoSerie();
        void cambioSeleccion(bool);
        void enviarTramaPrueba();
};

#endif // INTERFAZPUERTOSERIE_H
