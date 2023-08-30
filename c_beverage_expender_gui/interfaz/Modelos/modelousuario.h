#ifndef MODELOUSUARIO_H
#define MODELOUSUARIO_H

#include <QSqlRelationalTableModel>
#include <QTableView>
#include <QSqlRecord>
#include <QHeaderView>
#include <QSqlRelationalDelegate>
#include <QSqlRelation>

#define ID                  0
#define NOMBRE_USUARIO      1
#define USERNAME_USUARIO    2
#define ROL_USUARIO         3
#define GRUPO_USUARIO       4
#define FECHA_CREACION      5
#define ULTIMO_INGRESO      6
#define PASSWORD_USUARIO    7
#define ADMIN_USUARIO       8
#define ESTADO_USUARIO      9

#define CANT_ROLES          3
#define CANT_COLUMNAS       10

class ModeloUsuario
    : public QSqlRelationalTableModel
{
    using QSqlRelationalTableModel::QSqlRelationalTableModel;

    Q_OBJECT

    private:
        QString nombreTabla{"Users"};
        QString* usr_name;
        QString* usr_username;
        QTableView* view;
        QString* usr_rol;
        int* usr_rol_id;
        int* usr_id;
        bool activo;

    public:
        ModeloUsuario(
            QWidget* parent = nullptr,
            QSqlDatabase* db = nullptr
        );
        ~ModeloUsuario();
        QString getRol();
        QString getName();
        bool instanciarUsuario();
        void inicializarModelo();
        bool login(QString,QString);
        bool logout();
        bool eliminarUsuario();
        bool estadoSesion();
        int getId();
        int getRolId( QString );
        int getAdminId();
        void prepararVista(std::unique_ptr<QTableView>*);
        QVariant getOriginalId( QSqlRecord,int );

    signals:
        void cambioSesion(int,bool);
        void loginAdministrador(int,int,int);

    public slots:
        void cambiarResultadosUsuarios(QString,int);
};

#endif // MODELOUSUARIO_H
