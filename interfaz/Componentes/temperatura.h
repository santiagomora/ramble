#ifndef TEMPERATURA_H
#define TEMPERATURA_H

#include <QWidget>
#include <QLCDNumber>
#include <QLabel>
#include <QDebug>
#include <QVBoxLayout>
#include <stdio.h>
#include <stdlib.h>

#define TEMP_LENGTH 4

class Temperatura
    : public QWidget
{
    using QWidget::QWidget;

    Q_OBJECT
    private:
        int temperatura;
        QLCDNumber* display;
        QVBoxLayout* interfaz;
        QLabel* tempTexto;

    public:
        Temperatura(QWidget* parent = nullptr);
        ~Temperatura();
        void inicializarInterfaz();
        void inicializarComponentes();

    public slots:
        void tramaTemperaturaRecibida(int*);
};

#endif // TEMPERATURA_H
