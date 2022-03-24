#ifndef SELECTION_H
#define SELECTION_H

#include <QWidget>
#include <QGridLayout>
#include <QGroupBox>
#include <QScrollArea>
#include <QLayout>
#include <QSqlDatabase>
#include <QByteArray>
#include <QRadioButton>
#include <QLabel>
#include <QSqlQueryModel>

#include <Modelos/modelostock.h>

#define COD_EV_PEDIR_BEBIDA     4
#define DEFAULT_ALARMA          -1
#define COD_RP_SOLICITUD_STOCK  6

class ListadoOpciones
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QLabel* display;
        QVBoxLayout* lcol1;
        QVBoxLayout* lcol2;
        QGridLayout* grid;
        QGroupBox* group;
        QRadioButton** botones;
        QScrollArea* scroll;
        ModeloStock* modeloStock;
        QSqlDatabase* db;
        QSqlQueryModel* query;
        QLabel* estadoSeleccion;
        QString textoDefecto{"Selecciona una bebida para empezar"};
        QString textoSeleccion{textoDefecto};
        int lonBotones;
        int seleccionado{-1};
        void inicializarInterfaz();
        void construirInterfaz();
        void inicializarComponentes();
        int encontrarPresionado();
        void listarOpciones();
        void limpiarBotones();
        QString cambiarPixmap();
        QString revertirSeleccion();

    public:
        ListadoOpciones(
            ModeloStock* _modeloStock = nullptr
        );
        ~ListadoOpciones();
        void rehacerListado();

    signals:
        void pedirBebida(int,char*);
        void togglePedido(bool);

    public slots:
        void cambioSeleccion(bool);
        void hacerPedido();
        void cancelarPedido();

};

#endif // SELECTION_H
