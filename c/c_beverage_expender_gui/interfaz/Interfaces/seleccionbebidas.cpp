#include "seleccionbebidas.h"

/*
  Miembros
        QSqlDatabase* instanciaDB;
        ListadoOpciones* seleccionBebida;
        BarraProgreso* barraProgreso;
        Button* pedirBebida;
        Button* cancelarPedido;
        QWidget* widgetBotones;
        QHBoxLayout* botonesLayout;
        QGridLayout* grid;
        QLabel* tituloListado;
        QLabel* tituloProgreso;
*/

SeleccionBebidas::SeleccionBebidas(
    QTabWidget* parent,
    ModeloStock* _modeloStock,
    BarraProgreso* _barraProgreso,
    ListadoOpciones* _seleccionBebida
)
    :   QWidget{parent},
        seleccionBebida{_seleccionBebida},
        barraProgreso{_barraProgreso},
        modeloStock{_modeloStock}
{
    inicializarComponentes();
    inicializarInterfaz();
    conectarComponentes();
}

SeleccionBebidas::~SeleccionBebidas(){
    delete seleccionBebida;
    delete widgetBotones;
    delete grid;
    delete pedirBebida;
    delete cancelarPedido;
    delete tituloListado;
    delete tituloProgreso;
}

void SeleccionBebidas::inicializarComponentes(){
    seleccionBebida->setParent(this);
    barraProgreso->setParent(this);
    widgetBotones = new QWidget(this);
    grid = new QGridLayout(this);
    pedirBebida = new QPushButton("Pedir Bebida",widgetBotones);
    cancelarPedido = new QPushButton("Cancelar Pedido",widgetBotones);
    pedirBebida->setEnabled(false);
}

void SeleccionBebidas::inicializarInterfaz(){
    tituloListado = new QLabel("Seleccion de bebida");
    tituloProgreso = new QLabel("Progreso de entrega");
    botonesLayout = new QHBoxLayout(widgetBotones);
    botonesLayout->addWidget(barraProgreso);
    botonesLayout->addWidget(cancelarPedido);
    botonesLayout->addWidget(pedirBebida);
    grid->addWidget(tituloListado,1,1);
    grid->addWidget(seleccionBebida,2,1);
    grid->addWidget(tituloProgreso,3,1);
    grid->addWidget(widgetBotones,4,1);
}

void SeleccionBebidas::conectarComponentes(){
    connect(pedirBebida,&QPushButton::clicked,seleccionBebida,&ListadoOpciones::hacerPedido);
    connect(cancelarPedido,&QPushButton::clicked,seleccionBebida,&ListadoOpciones::cancelarPedido);
    connect(seleccionBebida,SIGNAL(togglePedido(bool)),this,SLOT(togglePedido(bool)));
}

void SeleccionBebidas::togglePedido(bool type){
    pedirBebida->setEnabled(type);
}

void SeleccionBebidas::toggleHabilitar( QString rol,QString userId ){

}

void SeleccionBebidas::rehacerConsulta(){
    seleccionBebida->rehacerListado();
}
