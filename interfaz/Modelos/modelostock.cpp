#include "modelostock.h"

/*
 *  Miembros
    QString tableName{"ModeloModeloStock"};
    int adminId;
*/

ModeloStock::ModeloStock(
    QWidget* parent,
    QSqlDatabase* db,
    int id_admin
)
    :   QSqlRelationalTableModel{parent,*db},
        adminId{id_admin}
{
    inicializarModelo();
}

ModeloStock::~ModeloStock(){
}

void ModeloStock::inicializarModelo(){
    setEditStrategy( QSqlTableModel::OnManualSubmit );
    setTable(nombreTabla);
    setRelation( ESTADO, QSqlRelation( "StockStatus", "sst_id", "sst_description" ) );
    setRelation( TIPO_PRODUCTO, QSqlRelation( "StockType", "sty_id", "sty_description" ) );
    setRelation( BOTON_PRODUCTO, QSqlRelation( "Buttons", "but_id", "but_description" ) );
}

int ModeloStock::getAdminId(){
    return adminId;
}

QString& ModeloStock::getNombreTabla(){
    return nombreTabla;
}

void ModeloStock::descontarStock(int* stock_id){
    QSqlQueryModel query;
    query.setQuery(QString("UPDATE Stock SET sto_qty=sto_qty-1 WHERE sto_id=%1").arg(*stock_id));
    delete stock_id;
}

QSqlRecord ModeloStock::consultarStock(int stock_id){
    QSqlQueryModel query;
    query.setQuery(QString("SELECT * from Stock WHERE sto_id=%1").arg(stock_id));
    return query.record(0);
}

int ModeloStock::verificarAlarma( QVariant resConsulta ){
    return resConsulta.toInt()<=0
        ? STOCK_ALARMA
        : ALARMA_DEFAULT; // definir codigo para sin stock
}

void ModeloStock::pedidoBebida(int *stock_id){
    QSqlRecord consultaStock{consultarStock(*stock_id)};
    emit pedirBebida(COD_EV_PEDIR_BEBIDA,*stock_id,verificarAlarma( consultaStock.value("sto_qty") ));
}

void ModeloStock::handleConsultaStock(int* stock_id){
    QSqlRecord consultaStock{consultarStock(*stock_id)};
    QVariant resConsulta{consultaStock.value("sto_qty")};
    QString numStock{QString::number(*stock_id)};
    emit stockConsultado(COD_EV_ESTADO_STOCK,QString("%1_%2").arg(numStock,resConsulta.toString()).toLocal8Bit().data(),verificarAlarma( resConsulta ));
    delete stock_id;
}
