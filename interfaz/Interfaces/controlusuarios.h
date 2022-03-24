#ifndef CONTROLUSUARIOS_H
#define CONTROLUSUARIOS_H

#include <QWidget>
#include <QLabel>
#include <QVBoxLayout>
#include <QVBoxLayout>
#include <QDate>
#include <QSqlDatabase>
#include <QScrollArea>

#include <Tablas/tablausuarios.h>

#define INDICE_CONTROL_USUARIOS    3

class ControlUsuarios
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QVBoxLayout* interfaz;
        TablaUsuarios* tablaUsuarios;
        QSqlDatabase* instanciaDB;
        QScrollArea* scroll;
        QTabWidget* tabContainer;
        ModeloUsuario* modeloUsuario;
        bool habilitar;

    public:
        ControlUsuarios(
            QTabWidget* parent,
            ModeloUsuario* _modeloUsuario
        );
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void rehacerConsulta();
        ~ControlUsuarios();

    public slots:
        void toggleHabilitar( QString,QString );

};

#endif // CONTROLUSUARIOS_H
