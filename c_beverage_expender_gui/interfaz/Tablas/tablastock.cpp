#include "tablastock.h"
/*
    Miembros
    Stock* modeloStock;
    QTableView* tablaStock;
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

TablaStock::TablaStock(
    QWidget* parent,
    ModeloStock* _modeloStock
)
    :   CRUD<ModeloStock>{_modeloStock}
{
    setParent(parent);
    inicializarInterfaz();
    inicializarComponentes();
    inicializarFilaPorDefecto();
    construirInterfaz();
    conectarComponentes();
};

TablaStock::~TablaStock(){
    delete interfaz;
    delete interfazBotones;
    delete interfazTabla;
    delete widgetTabla;
    delete widgetBotones;
    delete tituloTabla;
}

void TablaStock::inicializarInterfaz(){
    interfaz = new QGridLayout(this);
    widgetBotones = new QWidget(this);
    interfazBotones = new QHBoxLayout(widgetBotones);
}

void TablaStock::inicializarComponentes(){
    guardarCambios->setParent(widgetBotones);
    cancelarCambios->setParent(widgetBotones);
    botonEliminar->setParent(widgetBotones);
    botonAgregar->setParent(widgetBotones);
    tituloTabla = new QLabel("Control de Stock");
}

void TablaStock::inicializarFilaPorDefecto(){
    filaDefecto = modelo->record();
    filaDefecto.setValue("sto_admin",modelo->getAdminId());
    filaDefecto.setValue("sto_created_at",QDateTime::currentDateTime().toString("dd/MM/yyyy hh:mm:ss"));
    filaDefecto.setValue("sto_name","Producto nuevo");
    filaDefecto.setValue("sto_qty",0);
}

void TablaStock::construirInterfaz(){
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

void TablaStock::cambiarHeaders(){
    modelo->setHeaderData( ID, Qt::Horizontal, "ID" );
    modelo->setHeaderData( BEBIDA, Qt::Horizontal, "Bebida" );
    modelo->setHeaderData( ESTADO, Qt::Horizontal, "Estado" );
    modelo->setHeaderData( FECHA_INGRESO, Qt::Horizontal, "Fecha de ingreso" );
    modelo->setHeaderData( CANTIDAD, Qt::Horizontal, "Cantidad" );
    modelo->setHeaderData( TIPO_PRODUCTO, Qt::Horizontal, "Tipo de producto" );
    modelo->setHeaderData( FOTO, Qt::Horizontal, "Foto de producto" );
    modelo->setHeaderData( BOTON_PRODUCTO, Qt::Horizontal, "Boton asociado" );
}

void TablaStock::esconderCampos(){
    vista->hideColumn( ID );
    vista->hideColumn( ADMIN );
    vista->hideColumn( FOTO_EXTENSION );
}

void TablaStock::configurarVista(){
    vista->horizontalHeader()->setSectionResizeMode( QHeaderView::ResizeToContents );
    vista->horizontalHeader()->setStretchLastSection( true );
    vista->setItemDelegate( new DelegacionesTablaStock(vista) );
}

void TablaStock::prepararVista(){
    modelo->select();
    vista->setModel( modelo );
    cambiarHeaders();
    esconderCampos();
    configurarVista();
    vista->show();
}

void TablaStock::cambiarResultadosStock( QString rol,QString userId ){
    if( rol=="Administrador" )
        modelo->setFilter("sto_admin="+userId);
    modelo->select();
    modelo->revertAll();
    modelo->database().transaction();
}

void TablaStock::conectarComponentes(){
    connect(modelo,SIGNAL(rowsInserted(const QModelIndex&, int, int)),this,SLOT(verificarInsert(const QModelIndex&, int, int)));
}

void TablaStock::verificarMaxBotones(){
    bool pasoMax = false;
    QSqlQueryModel query;
    query.setQuery(QString("SELECT * from Groups WHERE grp_id=%1").arg(grupoId));
    pasoMax = modelo->rowCount()<=query.record(0).value("grp_max_stock").toInt();
    botonAgregar->setEnabled(pasoMax);
}

void TablaStock::verificarInsert(const QModelIndex& parent, int first, int last ){
    verificarMaxBotones();
}

void TablaStock::despuesCancelar(){
    verificarMaxBotones();
}

