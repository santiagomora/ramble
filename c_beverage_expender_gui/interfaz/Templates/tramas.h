#ifndef TRAMAS_H
#define TRAMAS_H

#include <QObject>
#include <QDebug>

#define CANT_ALARMAS                    3
#define ALARMA                          1

#define ALM_STOCK                       0
#define ALM_MAX_TEMP                    1
#define ALM_MIN_TEMP                    2

#define COD_RP_CONEXION_ESTABLECIDA     0
#define COD_RP_LECTURA_TEMPERATURA      1
#define COD_RP_LECTURA_RTC              2
#define COD_RP_LOGS_RECIBIDOS           3
#define COD_RP_PROGRESO_ENTREGA         4
#define COD_RP_ESTADO_ALARMA            5
#define COD_RP_SOLICITUD_STOCK          6
#define COD_RP_BEBIDA_ENTREGADA         7
#define COD_RP_BOTON_PRESIONADO         8

#define COD_EV_CONEXION_ESTABLECIDA     0
#define COD_EV_ESTADO_STOCK             1
#define COD_EV_SET_RTC                  2
#define COD_EV_ENVIAR_LOGS              3
#define COD_EV_PEDIR_BEBIDA             4
#define COD_EV_INGRESO_ADMIN            5
#define COD_EV_CIERRE_PUERTO            6

#define CANT_CODIGOS_RECEPCION          9
#define CANT_CODIGOS_ENVIO              7

#define BUFF_LEN                        100
#define DEFAULT_ESTADO_ALARMA           -1

class Tramas
    : public QObject{

    Q_OBJECT

    private:
        const char** setTramas;
        char buffer_trama[BUFF_LEN];

    public:
        Tramas(const char** _setTramas)
            :   setTramas{_setTramas}
        {};
        ~Tramas(){};
        template<class T,typename L>
        void procesarTramaRecepcion( int codigo,const char*trama,void (T::*handlerSenal)(L*), T* obj, L* lectura ){
            sscanf(trama,setTramas[codigo],lectura);
            emit (obj->*handlerSenal)(lectura);
        }
        template<class T,typename L>
        void procesarTramaEnvio( int codigo,L escritura, T* obj,void (T::*handlerSenal)(const char*), int estadoAlarma ){
            int bufLen;
            if ( (bufLen=sprintf(buffer_trama,setTramas[codigo],estadoAlarma,escritura))>0 ){
                buffer_trama[bufLen] = '\0';
                emit (obj->*handlerSenal)(buffer_trama);
            }
        }
};

#endif // TRAMAS_H
