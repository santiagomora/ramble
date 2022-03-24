#include "tablabotones.h"
/*
    Miembros
    ModeloBoton* modeloBoton;
    QTableView* tablaBoton;
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

TablaBotones::TablaBotones(
    QWidget* parent,
    ModeloBoton* _modeloBoton
)
    :   CRUD<ModeloBoton>{_modeloBoton}
{
    setParent(parent);
    inicializarInterfaz();
    inicializarComponentes();
    inicializarFilaPorDefecto();
    construirInterfaz();
    conectarComponentes();
};

TablaBotones::~TablaBotones(){
    delete interfaz;
    delete interfazBotones;
    delete interfazTabla;
    delete widgetTabla;
    delete widgetBotones;
    delete tituloTabla;
}

void TablaBotones::inicializarInterfaz(){
    interfaz = new QGridLayout(this);
    widgetBotones = new QWidget(this);
    interfazBotones = new QHBoxLayout(widgetBotones);
    labelMapa = new QLabel(this);
    labelMapa->setPixmap(QPixmap{":/QtImagen/mapa-botones.png"});
}

void TablaBotones::inicializarComponentes(){
    guardarCambios->setParent(widgetBotones);
    cancelarCambios->setParent(widgetBotones);
    botonEliminar->setParent(widgetBotones);
    botonAgregar->setParent(widgetBotones);
    botonEliminar->hide();
    tituloTabla = new QLabel("Control de Botones");
    labelMapa->setScaledContents(true);
    labelMapa->setFixedSize(QSize{150,200});
}

void TablaBotones::inicializarFilaPorDefecto(){
    filaDefecto = modelo->record();
    filaDefecto.setValue("but_description","Nombre del boton");
    filaDefecto.setValue("but_group",modelo->grupoId());
}

void TablaBotones::construirInterfaz(){
    prepararVista();
    interfazBotones->addWidget(cancelarCambios);
    interfazBotones->addWidget(botonEliminar);
    interfazBotones->addWidget(botonAgregar);
    interfazBotones->addWidget(guardarCambios);
    interfaz->addWidget(tituloTabla,1,1);
    interfaz->addWidget(labelMapa,1,2,-1,1);
    interfaz->addWidget(vista,2,1);
    interfaz->addWidget(estadoConsulta,3,1);
    interfaz->addWidget(widgetBotones,4,1);
}

void TablaBotones::cambiarHeaders(){
    modelo->setHeaderData( DESCRIPCION, Qt::Horizontal, "Mapeo Boton" );
    modelo->setHeaderData( ID, Qt::Horizontal, "ID Boton" );
}

void TablaBotones::esconderCampos(){
    vista->hideColumn( GRUPO );
}

void TablaBotones::configurarVista(){
    vista->horizontalHeader()->setSectionResizeMode( QHeaderView::ResizeToContents );
    vista->horizontalHeader()->setStretchLastSection( true );
}

void TablaBotones::prepararVista(){
    modelo->select();
    vista->setModel( modelo );
    cambiarHeaders();
    esconderCampos();
    configurarVista();
    vista->show();
}

void TablaBotones::conectarComponentes(){
    connect(modelo,SIGNAL(rowsInserted(const QModelIndex&, int, int)),this,SLOT(verificarInsert(const QModelIndex&, int, int)));
}

void TablaBotones::verificarMaxBotones(){
    bool pasoMax = false;
    QSqlQueryModel query;
    query.setQuery(QString("SELECT * from Groups WHERE grp_id=%1").arg(grupoId));
    pasoMax = modelo->rowCount()<=query.record(0).value("grp_max_stock").toInt();
    qInfo()<<modelo->rowCount();
    qInfo()<<query.record(0).value("grp_max_stock").toInt();
    botonAgregar->setEnabled(pasoMax);
}

void TablaBotones::verificarInsert(const QModelIndex& parent, int first, int last ){
    verificarMaxBotones();
}

void TablaBotones::despuesCancelar(){
    verificarMaxBotones();
}
