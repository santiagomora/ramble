#ifndef ESTADOPLACA_H
#define ESTADOPLACA_H

#include <QWidget>
#include <QSqlDatabase>

#include <Componentes/rtc.h>
#include <Componentes/temperatura.h>
#include <Componentes/interfazpuertoserie.h>

class EstadoPlaca
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT

    private:
        QGridLayout* grid;
        InterfazPuertoSerie* interfazPuertoSerie;
        RTC* rtc;
        Temperatura* temperatura;
        Serial* puertoSerie;

    public:
        EstadoPlaca(
            QWidget *parent = nullptr,
            RTC* _rtc = nullptr,
            Temperatura* _temperatura = nullptr,
            Serial* _puertoSerie = nullptr
        );
        ~EstadoPlaca();
        void inicializarInterfaz();
        void inicializarComponentes();
        void construirInterfaz();

};

#endif // ESTADOPLACA_H
