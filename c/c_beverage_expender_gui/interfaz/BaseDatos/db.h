#ifndef DB_H
#define DB_H

#include <QSqlDatabase>
#include <QSqlDriver>
#include <QSqlQuery>
#include <QSqlError>

class DB
{
    private:
        //cambiar aca y colocar el path absoluto en su maquina
        QString pathBase{"/home/santiagomora/Documents/Repos/UTN/TPO-infoII/expendedoraBebidas/interfaz/DB/"};
        QString nombreBase{"dispenser.db"};
        QString tipoConexion{"QSQLITE"};
        QString nombreDriver{"SQLITE"};
        QSqlDatabase* db;

    public:
        DB();

        void inicializarBaseDatos();

        QSqlDatabase* crearBase();

        QSqlDatabase* abrir();

        bool estado();

        ~DB();

};

#endif // DB_H
