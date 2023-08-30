#include "barraprogreso.h"

BarraProgreso::BarraProgreso(
    QWidget* parent
)
    : QProgressBar{parent}
{};

void BarraProgreso::progresoEntregaBebida( int* _progreso ){
    progreso = *_progreso;
    if (parentWidget()->isEnabled())
        setValue(progreso);
    delete _progreso;
}
