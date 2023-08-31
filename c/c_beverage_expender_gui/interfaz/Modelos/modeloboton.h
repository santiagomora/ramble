#ifndef MODELOBOTON_H
#define MODELOBOTON_H

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
#define     DESCRIPCION             1
#define     GRUPO                   2

#define     CANT_CAMPOS_BOTON       3

class ModeloBoton
    : public QSqlRelationalTableModel
{
    using QSqlRelationalTableModel::QSqlRelationalTableModel;
    private:
        QString nombreTabla{"Buttons"};

    public:
        ModeloBoton(
            QWidget* parent = nullptr,
            QSqlDatabase* db = nullptr
        );
        int grupoId();
        void inicializarModelo();
        ~ModeloBoton();
};

#endif // MODELOBOTON_H
