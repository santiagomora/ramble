#ifndef LOGIN_H
#define LOGIN_H

#include <QWidget>
#include <QLabel>
#include <QGridLayout>
#include <QVBoxLayout>
#include <QSqlDatabase>
#include <QPushButton>
#include <QLineEdit>

#include <Tablas/tablausuarios.h>
#include <Interfaces/seleccionbebidas.h>

class InterfazLogin
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QPushButton* botonLogin;
        QPushButton* botonLogout;
        QLineEdit* inputUsuario;
        QLineEdit* inputContrasena;
        QGridLayout* interfaz;
        QGridLayout* interfazTexto;
        QVBoxLayout* interfazBotones;
        QVBoxLayout* interfazTitulo;
        QWidget* widgetBotones;
        QWidget* widgetTexto;
        QWidget* widgetTitulo;
        QLabel* textoUsuario;
        QLabel* textoContrasena;
        QLabel* titulo;
        QLabel* mensajeLogin;
        ModeloUsuario* modeloUsuario;

    public:
        InterfazLogin(
            QWidget* parent = nullptr,
            ModeloUsuario* _modeloUsuario = nullptr
        );
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();
        void conectarSecciones();
        void emitirSenales(QString,int);
        ~InterfazLogin();

    signals:
        void generarToggle(bool);

    public slots:
        void toggleElementos( bool );
        void iniciarSesion();
        void finalizarSesion();
};

#endif // LOGIN_H
