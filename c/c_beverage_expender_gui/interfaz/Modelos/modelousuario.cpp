#include "modelousuario.h"
#include <QDebug>

/*
 *  Miembros
    QString nombreTabla{"Users"};
    QString usr_name;
    QString usr_email;
    int usr_rol;
    int usr_id;
*/

ModeloUsuario::ModeloUsuario(
    QWidget* parent,
    QSqlDatabase* db
)
    :   QSqlRelationalTableModel{parent,*db}
{
    inicializarModelo();
}

ModeloUsuario::~ModeloUsuario(){
    eliminarUsuario();
}

void ModeloUsuario::inicializarModelo(){
    setTable(nombreTabla);
    setEditStrategy( QSqlTableModel::OnManualSubmit );
    setRelation( ESTADO_USUARIO, QSqlRelation( "UserStatus", "ust_id", "ust_description" ) );
    setRelation( ROL_USUARIO, QSqlRelation( "UserType", "uty_id", "uty_description" ) );
    setRelation( GRUPO_USUARIO, QSqlRelation( "Groups", "grp_id", "grp_description" ) );
}

bool ModeloUsuario::login( QString username, QString password ){
    setFilter("usr_username='"+username+"' and usr_password='"+password+"' and ust_description='Activo'");
    select();
    return ( activo = rowCount() == 1 )
        ? instanciarUsuario()
        : activo;
}

bool ModeloUsuario::logout(){
    return activo
        ? eliminarUsuario()
        : activo;
}

bool ModeloUsuario::estadoSesion(){
    return activo;
}

QVariant ModeloUsuario::getOriginalId( QSqlRecord record,int col ){
    QSqlQueryModel query;
    QString relTabla = relation(col).tableName();
    QString fieldName = record.fieldName(col);
    QString value = record.value(fieldName).toString();
    query.setQuery(QString("SELECT * from %1 WHERE %2='%3'").arg(relTabla,fieldName,value));
    return query.record(0).value(relation(col).indexColumn());
}

bool ModeloUsuario::instanciarUsuario(){
    activo = true;
    usr_rol_id = new int(getOriginalId(record(0), ROL_USUARIO).toInt());
    usr_name = new QString( record(0).value("usr_name").toString() );
    usr_username = new QString( record(0).value("usr_username").toString() );
    usr_rol = new QString( record(0).value("uty_description").toString() );
    usr_id = new int( record(0).value("usr_id").toInt() );
    emit cambioSesion(*usr_rol_id,true);
    return activo;
}

QString ModeloUsuario::getRol(){
    return *usr_rol;
}

int ModeloUsuario::getId(){
    return *usr_id;
}

QString ModeloUsuario::getName(){
    return *usr_name;
}

bool ModeloUsuario::eliminarUsuario(){
    emit cambioSesion(*usr_rol_id,false);
    activo = false;
    delete usr_name;
    delete usr_username;
    delete usr_rol;
    delete usr_rol_id;
    delete usr_id;
    return activo;
}

int ModeloUsuario::getAdminId(){
    return *usr_id;
}

void ModeloUsuario::cambiarResultadosUsuarios(QString,int){

}

