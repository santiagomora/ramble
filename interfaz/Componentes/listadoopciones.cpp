#include "listadoopciones.h"

ListadoOpciones::ListadoOpciones(
    ModeloStock* _modeloStock
)
    :   modeloStock{_modeloStock}
{
    inicializarInterfaz();
    inicializarComponentes();
    construirInterfaz();
};


ListadoOpciones::~ListadoOpciones(){
    delete display;
    delete lcol1;
    delete lcol2;
    delete grid;
    delete group;
    delete scroll;
    limpiarBotones();
}

void ListadoOpciones::inicializarInterfaz(){
    grid = new QGridLayout(this);
    scroll = new QScrollArea;
    lcol1 = new QVBoxLayout;
    lcol2 = new QVBoxLayout;
}

void ListadoOpciones::inicializarComponentes(){
    lonBotones = 0;
    group = new QGroupBox("Bebidas almacenadas en la base de datos");
    display = new QLabel("",this);
    query = new QSqlQueryModel();
    estadoSeleccion = new QLabel(textoSeleccion);
    query->setQuery(QString("SELECT * FROM Stock"));
}

void ListadoOpciones::construirInterfaz(){
    listarOpciones();
    group->setLayout(lcol1);
    scroll->setFixedHeight(100);
    scroll->setWidgetResizable(true);
    scroll->setWidget(group);
    display->setFixedWidth(100);
    display->setLayout(lcol2);
    grid->addWidget(scroll,1,1);
    grid->addWidget(display,1,2);
    grid->addWidget(estadoSeleccion,2,1,1,-1);
    lcol1->setMargin(0);
    display->show();
}

void ListadoOpciones::limpiarBotones(){
    if (lonBotones>0)
        for( int i=0; i<lonBotones; i++ ){
            delete botones[i];
        }
}

int ListadoOpciones::encontrarPresionado(){
    int defecto = -1;
    for(int i=0; i<lonBotones; i++)
        defecto = ( botones[i]->isChecked() )
            ? i
            : defecto;
    return defecto;
}

QString ListadoOpciones::cambiarPixmap(){
    QPixmap map;
    QSqlRecord recordSel;
    QString nombre;
    QString cantidad;
    QByteArray foto;
    recordSel = query->record(seleccionado);
    foto = QByteArray{recordSel.value("sto_pic").toByteArray()};
    map.loadFromData(foto);
    display->setPixmap(map.scaled(50,50,Qt::IgnoreAspectRatio,Qt::FastTransformation));
    emit togglePedido(true);
    return QString("Hay %1 unidades disponibles de %2").arg(recordSel.value("sto_qty").toString(),recordSel.value("sto_name").toString());
}

QString ListadoOpciones::revertirSeleccion(){
    display->setPixmap(QPixmap{});
    botones[seleccionado]->setAutoExclusive(false);
    botones[seleccionado]->setChecked(false);
    botones[seleccionado]->setAutoExclusive(true);
    emit togglePedido(false);
    seleccionado=-1;
    return textoDefecto;
}

void ListadoOpciones::cambioSeleccion(bool checked){
    int prev = seleccionado;
    seleccionado = encontrarPresionado();
    textoSeleccion = ( prev != seleccionado )
        ? cambiarPixmap()
        : revertirSeleccion();
    estadoSeleccion->setText(textoSeleccion);
}

void ListadoOpciones::listarOpciones(){
    if ( ( lonBotones = query->rowCount() )>0 ){
        botones = new QRadioButton*[lonBotones];
        for( int i=0; i<lonBotones; i++ ){
            botones[i] = new QRadioButton(query->record(i).value("sto_name").toString(),this);
            connect( botones[i],SIGNAL(clicked(bool)),this,SLOT(cambioSeleccion(bool)) );
            lcol1->addWidget( botones[i] );
        }
    }
}

void ListadoOpciones::hacerPedido(){
    QSqlRecord recordSel{query->record(seleccionado)};
    QString codigo{QString::number(COD_RP_SOLICITUD_STOCK)};
    if(recordSel.value("sto_qty").toInt()>0)
        emit pedirBebida(COD_RP_SOLICITUD_STOCK,QString("$COD:%1,ALM:-1,LEC:%2#").arg(codigo,recordSel.value("sto_id").toString()).toLocal8Bit().data());
}


void ListadoOpciones::cancelarPedido(){
    if(seleccionado>=0){
        emit botones[seleccionado]->clicked(false);
        seleccionado=-1;
    }
}

void ListadoOpciones::rehacerListado(){
    limpiarBotones();
    listarOpciones();
}
