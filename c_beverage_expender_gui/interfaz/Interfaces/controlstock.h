#ifndef PANELCONTROL_H
#define PANELCONTROL_H

#include <QWidget>
#include <QLabel>
#include <QVBoxLayout>
#include <QDebug>
#include <Tablas/tablastock.h>

#define INDICE_PANEL_CONTROL    1

class ControlStock
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QVBoxLayout* interfaz;
        TablaStock* tablaStock;
        ModeloStock* modeloStock;
        QTabWidget* tabContainer;
        bool habilitar;

    public:
        ControlStock(
            QTabWidget* parent = nullptr,
            ModeloStock* _modeloStock = nullptr
        );
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void rehacerConsulta();
        ~ControlStock();

    public slots:
        void toggleHabilitar( QString,QString );

};

#endif // PANELCONTROL_H
