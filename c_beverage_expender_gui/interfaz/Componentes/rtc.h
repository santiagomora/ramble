#ifndef RTC_H
#define RTC_H

#include <QWidget>
#include <QDateTime>
#include <QLCDNumber>
#include <QVBoxLayout>
#include <QLabel>
#include <QDebug>
#include <QPushButton>
#include <QDateTimeEdit>
#include <string.h>

#define DATE_LENGTH     20
#define COD_EV_SET_RTC  2
#define DEFAULT_ALARMA  -1

class RTC
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QLabel* tituloFecha;
        QDateTimeEdit* editarFecha;
        QPushButton* guardarFecha;
        QVBoxLayout* interfaz;
        QLabel* fechaTexto;
        QLCDNumber* display;
        bool habilitar;
        char nuevaFecha[DATE_LENGTH];

    public:
        RTC( QWidget* parent = nullptr );
        ~RTC();
        void inicializarInterfaz();
        void inicializarComponentes();
        void inicializarTimer();
        void construirInterfaz();
        void inicializarEdicionFecha();
        void conectarComponentes();

    signals:
        void enviarCambioFechaRTC(int,char*,int);

    public slots:
        void tramaFechaRecibida( char* );
        void toggleHabilitar();
        void cambiarFechaRTC();

};

#endif // RTC_H
