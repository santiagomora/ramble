#ifndef CONTROLBOTONES_H
#define CONTROLBOTONES_H

#include <QWidget>
#include <QLabel>
#include <QVBoxLayout>
#include <QDebug>

#include <Tablas/tablabotones.h>
#include <BaseDatos/db.h>

#define INDICE_CONTROL_BOTONES    2

class ControlBotones
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QVBoxLayout* interfaz;
        TablaBotones* tablaBotones;
        ModeloBoton* modeloBoton;
        QTabWidget* tabContainer;
        bool habilitar;

    public:
        ControlBotones(
            QTabWidget* parent = nullptr,
            ModeloBoton* _modeloBoton = nullptr
        );
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void rehacerConsulta();
        ~ControlBotones();

    public slots:
        void toggleHabilitar( QString,QString );

};

#endif // CONTROLBOTONES_H
