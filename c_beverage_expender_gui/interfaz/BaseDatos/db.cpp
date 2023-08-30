#include "db.h"
#include <QDebug>
#include <QSqlError>
/*
    Miembros
    QString pathBase{"/DB/"};
    QString nombreBase{"dispenser.db"};
    QString tipoConexion{"QSQLITE"};
    QSqlDatabase db;
*/
DB::DB(){
    inicializarBaseDatos();
}

DB::~DB(){
    db->close();
    db->removeDatabase( pathBase+nombreBase );
    delete db;
}

void DB::inicializarBaseDatos(){
    if ( QSqlDatabase::isDriverAvailable(tipoConexion) ){
        db = new QSqlDatabase( QSqlDatabase::addDatabase( tipoConexion ) );
        db->setDatabaseName( pathBase+nombreBase );
    }
}

QSqlDatabase* DB::abrir(){
    if ( db->open() )
        return db;
    return crearBase();
}

QSqlDatabase* DB::crearBase(){
    return db;
}

bool DB::estado(){
    return db->isOpen();
}
