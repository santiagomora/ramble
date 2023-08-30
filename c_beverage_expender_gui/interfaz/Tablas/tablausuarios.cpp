#include "tablausuarios.h"

/*
    Miembros
    modelo* modelo;
    QTableView* tablaUsuarios;
    QGridLayout* interfaz;
    QVBoxLayout* interfazBotones;
    QVBoxLayout* interfazTabla;
    QWidget* widgetTabla;
    QWidget* widgetBotones;
    Button* guardarBoton;
    Button* cancelarBoton;
    DB* db;
    QLabel* tituloTabla;
*/

TablaUsuarios::TablaUsuarios(
    QWidget* parent,
    ModeloUsuario* _modeloUsuario
)
    :   CRUD<ModeloUsuario>{_modeloUsuario}
{
    setParent(parent);
    inicializarInterfaz();
    inicializarComponentes();
    inicializarFilaPorDefecto();
    construirInterfaz();
};

TablaUsuarios::~TablaUsuarios(){
    delete interfaz;
    delete interfazBotones;
    delete interfazTabla;
    delete widgetTabla;
    delete widgetBotones;
}

void TablaUsuarios::inicializarInterfaz(){
    interfaz = new QGridLayout(this);
    widgetBotones = new QWidget(this);
    interfazBotones = new QHBoxLayout(widgetBotones);
}

void TablaUsuarios::inicializarFilaPorDefecto(){
    filaDefecto = modelo->record();
//    filaDefecto.setValue("sto_admin",modelo->getAdminId());
//    filaDefecto.setValue("sto_created_at",QDateTime::currentDateTime().toString("dd/MM/yyyy hh:mm:ss"));
//    filaDefecto.setValue("sto_name","Producto nuevo");
//    filaDefecto.setValue("sto_qty",0);
}

void TablaUsuarios::inicializarComponentes(){
    guardarCambios->setParent(widgetBotones);
    cancelarCambios->setParent(widgetBotones);
    botonEliminar->setParent(widgetBotones);
    botonAgregar->setParent(widgetBotones);
    tituloTabla = new QLabel("Control de Usuarios");
}

void TablaUsuarios::construirInterfaz(){
    prepararVista();
    interfazBotones->addWidget(cancelarCambios);
    interfazBotones->addWidget(botonEliminar);
    interfazBotones->addWidget(botonAgregar);
    interfazBotones->addWidget(guardarCambios);
    interfaz->addWidget(tituloTabla,1,1);
    interfaz->addWidget(vista,2,1,1,-1);
    interfaz->addWidget(estadoConsulta,3,1,1,-1);
    interfaz->addWidget(widgetBotones,4,1);
}

void TablaUsuarios::cambiarHeaders(){
    modelo->setHeaderData( NOMBRE_USUARIO, Qt::Horizontal, "Nombre" );
    modelo->setHeaderData( FECHA_CREACION, Qt::Horizontal, "Fecha de creación" );
    modelo->setHeaderData( ULTIMO_INGRESO, Qt::Horizontal, "Último ingreso" );
    modelo->setHeaderData( ROL_USUARIO, Qt::Horizontal, "Rol" );
    modelo->setHeaderData( ESTADO_USUARIO, Qt::Horizontal, "Estado" );
    modelo->setHeaderData( USERNAME_USUARIO, Qt::Horizontal, "Username" );
    modelo->setHeaderData( PASSWORD_USUARIO, Qt::Horizontal, "Contraseña" );
    modelo->setHeaderData( ADMIN_USUARIO, Qt::Horizontal, "Administrador" );
    modelo->setHeaderData( GRUPO_USUARIO, Qt::Horizontal, "Empresa" );
}

void TablaUsuarios::esconderCampos(){
    vista->hideColumn(ID);
    vista->hideColumn(ADMIN_USUARIO);
}

void TablaUsuarios::prepararVista(){
    modelo->setFilter("uty_description='Administrador'");
    modelo->select();
    vista->setModel( modelo );
    cambiarHeaders();
    esconderCampos();
    vista->horizontalHeader()->setSectionResizeMode( QHeaderView::ResizeToContents );
    vista->horizontalHeader()->setStretchLastSection( true );
    vista->setItemDelegate( new QSqlRelationalDelegate( vista ) );
    vista->show();
}

void TablaUsuarios::cambiarResultadosUsuario( QString rol,QString userId ){
    if( rol=="SuperAdministrador" ){
        modelo->setFilter("usr_admin="+userId+" and usr_id<>"+userId);
        modelo->select();
        modelo->revertAll();
        modelo->database().transaction();
    }
}

ModeloUsuario* TablaUsuarios::getModeloUsuario(){
    return modelo;
}

void TablaUsuarios::despuesCancelar(){}
