#ifndef INTERFAZSELECCION_H
#define INTERFAZSELECCION_H

#include <QWidget>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QGridLayout>
#include <QSqlDatabase>
#include <QPushButton>

#include <Componentes/barraprogreso.h>
#include <Componentes/listadoopciones.h>
#include <Modelos/modelostock.h>

#define INDICE_SELECCION_BEBIDAS    0

class SeleccionBebidas
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QSqlDatabase* instanciaDB;
        ListadoOpciones* seleccionBebida;
        BarraProgreso* barraProgreso;
        QPushButton* pedirBebida;
        QPushButton* cancelarPedido;
        QWidget* widgetBotones;
        QHBoxLayout* botonesLayout;
        QGridLayout* grid;
        QLabel* tituloListado;
        QLabel* tituloProgreso;
        ModeloStock* modeloStock;

    public:
        SeleccionBebidas(
            QTabWidget* parent = nullptr,
            ModeloStock* _modeloStock = nullptr,
            BarraProgreso* _barraProgreso = nullptr,
            ListadoOpciones* _seleccionBebida = nullptr
        );
        void inicializarComponentes();
        void inicializarInterfaz();
        void conectarComponentes();
        void rehacerConsulta();
        ~SeleccionBebidas();

    public slots:
        void toggleHabilitar( QString,QString );
        void togglePedido(bool);

};

#endif // INTERFAZSELECCION_H
