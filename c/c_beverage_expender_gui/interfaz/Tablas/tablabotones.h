#ifndef TABLABOTONES_H
#define TABLABOTONES_H

#define CANT_COL   6

#include <Modelos/modeloboton.h>
#include <Templates/crud.tpp>

class TablaBotones
    : public CRUD<ModeloBoton>
{
    Q_OBJECT

    private:
        QGridLayout* interfaz;
        QHBoxLayout* interfazBotones;
        QVBoxLayout* interfazTabla;
        QWidget* widgetTabla;
        QWidget* widgetBotones;
        QLabel* tituloTabla;
        QLabel* labelMapa;
        int grupoId{1};
        int rowCount{0};
        void inicializarFilaPorDefecto();

    public:
        TablaBotones(
            QWidget* parent  = nullptr,
            ModeloBoton* _modeloBoton = nullptr
        );
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void esconderCampos();
        void cambiarHeaders();
        void prepararVista();
        void configurarVista();
        void verificarMaxBotones();
        void conectarComponentes();
        void despuesCancelar();
        ModeloBoton* getModeloStock();
        ~TablaBotones();

    public slots:
        void verificarInsert(const QModelIndex&, int, int);

};

#endif // TABLABOTONES_H
