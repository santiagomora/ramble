#ifndef BARRAPROGRESO_H
#define BARRAPROGRESO_H

#include <QWidget>
#include <QProgressBar>

class BarraProgreso
    : public QProgressBar
{
    private:
        int progreso;

    public:
        BarraProgreso(QWidget* parent = nullptr);

    public slots:
        void progresoEntregaBebida(int*);
};

#endif // BARRAPROGRESO_H
