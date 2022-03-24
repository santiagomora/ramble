#ifndef DELEGACIONESTABLASTOCK_H
#define DELEGACIONESTABLASTOCK_H

#include <QSqlRelationalDelegate>
#include <QTableView>
#include <QPainter>
#include <QFileDialog>

#include <Modelos/modelostock.h>

class DelegacionesTablaStock
    : public QSqlRelationalDelegate
{
    using QSqlRelationalDelegate::QSqlRelationalDelegate;

    private:
        QTableView* view;

    public:
        DelegacionesTablaStock( QTableView* view = nullptr )
            :   QSqlRelationalDelegate{view},
                view{view}
        {};
        ~DelegacionesTablaStock();

        void pintarVisorFotos(QPainter*,const QStyleOptionViewItem&,const QModelIndex&) const;
        QFileDialog* construirEditorFotos(QWidget*,const QStyleOptionViewItem&,const QModelIndex&) const;
        void guardarFotoEnModelo(QFile&,QAbstractItemModel*,const QModelIndex &) const;
        void fotoProductoSeleccionada( const QString &file );

        QSize sizeHint( const QStyleOptionViewItem &option, const QModelIndex &index) const override;
        void paint(QPainter *painter,const QStyleOptionViewItem &option,const QModelIndex &index) const override;
        QWidget *createEditor(QWidget *parent, const QStyleOptionViewItem &option,const QModelIndex &index) const override;
        void setModelData(QWidget *, QAbstractItemModel *, const QModelIndex &) const override;
};


#endif // DELEGACIONESTABLASTOCK_H
