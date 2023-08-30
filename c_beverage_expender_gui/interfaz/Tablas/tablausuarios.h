#ifndef TABLAUSUARIOS_H
#define TABLAUSUARIOS_H

#include <Templates/crud.tpp>
#include <Modelos/modelousuario.h>

class TablaUsuarios
    : public CRUD<ModeloUsuario>
{
    Q_OBJECT

    private:
        QGridLayout* interfaz;
        QHBoxLayout* interfazBotones;
        QVBoxLayout* interfazTabla;
        QWidget* widgetTabla;
        QWidget* widgetBotones;
        QLabel* tituloTabla;

        public:
            TablaUsuarios(
                QWidget* parent = nullptr,
                ModeloUsuario* _modeloUsuario = nullptr
            );
            void inicializarInterfaz();
            void inicializarComponentes();
            void construirInterfaz();
            void esconderCampos();
            void cambiarHeaders();
            void prepararVista();
            void inicializarFilaPorDefecto();
            void despuesCancelar();
            ModeloUsuario* getModeloUsuario();
            ~TablaUsuarios();

        public slots:
            void cambiarResultadosUsuario( QString,QString );
};

#endif // TABLAUSUARIOS_H
