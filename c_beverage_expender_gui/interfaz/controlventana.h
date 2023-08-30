#ifndef CONTROLVENTANA_H
#define CONTROLVENTANA_H

#include "interfazventana.h"

class ControlVentana
    : public InterfazVentana
{
    private:
        void evaluarConexionEstablecida(int*);
        void codigoAlarmaRecibido(int*);
        int estadoConexion;

    public:
        ControlVentana();
        ~ControlVentana();
        void conectarComponentes(bool);
        void cambioSesionUsuario(bool);
        void cambioSesionAdministrador(bool);
        void cambioSesionSuperAdministrador(bool);
        void conectarComponentes();
        void inicializarEstadoSecciones();

    public slots:
        void actualizarEstadoPlaca(bool);
        void handleCambioSesion( int,bool );
};

#endif // CONTROLVENTANA_H
