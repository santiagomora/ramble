#include "delegacionestablastock.h"

DelegacionesTablaStock::~DelegacionesTablaStock(){

};


void DelegacionesTablaStock::pintarVisorFotos(
    QPainter *painter,
    const QStyleOptionViewItem &option,
    const QModelIndex &index
) const {
    QPixmap map;
    QByteArray fotoProducto(index.data().toByteArray());
    map.loadFromData(fotoProducto);
    painter->drawPixmap(option.rect,map.scaledToWidth(option.rect.height(),Qt::SmoothTransformation));
    painter->setClipping(true);
}


QFileDialog* DelegacionesTablaStock::construirEditorFotos(
    QWidget *parent,
    const QStyleOptionViewItem &option,
    const QModelIndex &index
) const {
    QFileDialog* seleccionarFoto = new QFileDialog(
        parent,
        "Selecciona una foto",
        "/home/santiagomora/Downloads",
        "Images (*.png *.jpeg *.jpg *.gif)"
    );
    seleccionarFoto->setFileMode(QFileDialog::ExistingFile);
    return seleccionarFoto;
}

QSize DelegacionesTablaStock::sizeHint(
    const QStyleOptionViewItem &option,
    const QModelIndex &index
) const {
    QSize ans;
    switch(index.column()){
        case FECHA_INGRESO:
            ans = QSize{150,50};
            break;
        default:
            ans=QSize{100,50};
            break;
    }
    return ans;
}

QWidget* DelegacionesTablaStock::createEditor(
    QWidget *parent,
    const QStyleOptionViewItem &option,
    const QModelIndex &index
) const {
    switch(index.column()){
        case FOTO:
            return construirEditorFotos(parent,option,index);
            break;
        default:
            return QSqlRelationalDelegate::createEditor(parent,option,index);
            break;
    }
}

void DelegacionesTablaStock::paint(
    QPainter *painter,
    const QStyleOptionViewItem &option,
    const QModelIndex &index
) const {
    switch(index.column()){
        case FOTO:
            pintarVisorFotos(painter,option,index);
            break;
        default:
            QSqlRelationalDelegate::paint(painter,option,index);
            break;
    }
}

void DelegacionesTablaStock::guardarFotoEnModelo(
    QFile& imagen,
    QAbstractItemModel *model,
    const QModelIndex &index
) const{
    QFileInfo infoImagen{imagen};
    if ( imagen.open( QIODevice::ReadOnly ) ){
        model->setData(index, QVariant::fromValue(imagen.readAll()));
        model->setData(index.sibling(index.row(),FOTO_EXTENSION),QVariant::fromValue(infoImagen.suffix()));
        imagen.close();
    }
}

void DelegacionesTablaStock::setModelData(
    QWidget *editor,
    QAbstractItemModel *model,
    const QModelIndex &index
) const{
    switch(index.column()){
        case FOTO:{
            QFileDialog* editorImagen = qobject_cast<QFileDialog *>(editor);
            if( editorImagen->result()==QDialog::Accepted ){
                QString imageName{editorImagen->selectedFiles().first()};
                QFile imagen{imageName};
                guardarFotoEnModelo( imagen,model,index );
            }
            break;
        }
        default:
            QSqlRelationalDelegate::setModelData(editor,model,index);
            break;
    }
};
