#ifndef STOCK_H
#define STOCK_H

#include <QSqlRelationalTableModel>
#include <QTableView>
#include <QVBoxLayout>
#include <QGroupBox>
#include <QString>
#include <QSqlRecord>
#include <QSqlRelation>
#include <QSqlRelationalDelegate>
#include <QHeaderView>
#include <QDebug>
#include <QItemDelegate>

#define     ID                      0
#define     BEBIDA                  1
#define     ESTADO                  2
#define     FECHA_INGRESO           3
#define     CANTIDAD                4
#define     TIPO_PRODUCTO           5
#define     FOTO                    6
#define     ADMIN                   7
#define     FOTO_EXTENSION          8
#define     BOTON_PRODUCTO          9

#define     CANT_CAMPOS_STOCK       10
#define     STOCK_ALARMA            1
#define     ALARMA_DEFAULT          -1

#define     COD_EV_ESTADO_STOCK     1
#define     COD_EV_PEDIR_BEBIDA     4

class ModeloStock
    : public QSqlRelationalTableModel
{
    using QSqlRelationalTableModel::QSqlRelationalTableModel;

    Q_OBJECT

    private:
        QString nombreTabla{"Stock"};
        QTableView* view;
        int adminId;

    public:
        ModeloStock(
            QWidget* parent = nullptr,
            QSqlDatabase* db = nullptr,
            int id_admin = 2
        );
        void inicializarModelo();
        ~ModeloStock();
        int getAdminId();
        QString& getNombreTabla();
        QSqlRecord consultarStock(int stock_id);
        int verificarAlarma( QVariant );
        void pedidoBebida(int *);

    signals:
        void stockConsultado(int,char*,int);
        void pedirBebida(int,int,int);

    public slots:
        void handleConsultaStock(int*);
        void descontarStock(int*);
};

#endif // STOCK_H
