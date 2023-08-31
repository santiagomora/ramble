#ifndef TABLASTOCK_H
#define TABLASTOCK_H

#define CANT_COL   6

#include <Tablas/delegacionestablastock.h>
#include <Modelos/modelostock.h>
#include <Templates/crud.tpp>

class TablaStock
    : public CRUD<ModeloStock>
{
    Q_OBJECT

    private:
        QGridLayout* interfaz;
        QHBoxLayout* interfazBotones;
        QVBoxLayout* interfazTabla;
        QWidget* widgetTabla;
        QWidget* widgetBotones;
        QLabel* tituloTabla;
        QSqlRelationalDelegate* relationDelegate;
        int rowCount{0};
        int grupoId{1};
        void inicializarFilaPorDefecto();
    
    public:
        TablaStock(
            QWidget* parent,
            ModeloStock* _modeloStock
        );
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void esconderCampos();
        void cambiarHeaders();
        void prepararVista();
        void configurarVista();
        void conectarComponentes();
        void verificarMaxBotones();
        void despuesCancelar();
        ModeloStock* getModeloStock();
        ~TablaStock();

    public slots:
        void cambiarResultadosStock( QString,QString );
        void verificarInsert(const QModelIndex&, int, int);

};

#endif // TABLASTOCK_H
