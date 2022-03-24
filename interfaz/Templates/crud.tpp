#ifndef CRUD_H
#define CRUD_H

#include <QFile>
#include <QSqlRecord>
#include <QDateTime>
#include <QModelIndexList>
#include <QTableView>
#include <QSqlError>
#include <QWidget>
#include <QPushButton>
#include <QLabel>

#include <Modelos/modelostock.h>
#include <Modelos/modelousuario.h>

template <class T>
class CRUD
    : public QWidget
{

    protected:
        std::unique_ptr<QTableView> *tabla;
        QPushButton* guardarCambios;
        QPushButton* cancelarCambios;
        QPushButton* botonEliminar;
        QPushButton* botonAgregar;
        QSqlRecord filaDefecto;
        QString textoConsulta;
        QTableView* vista;
        QLabel* estadoConsulta;
        T* modelo;

    private:
        void inicializarComponentes(){
            tabla = new std::unique_ptr<QTableView>{ new QTableView };
            textoConsulta = "Estado consulta: esperando consulta";
            estadoConsulta = new QLabel(textoConsulta);
            guardarCambios = new QPushButton("GUARDAR");
            cancelarCambios = new QPushButton("CANCELAR");
            botonEliminar= new QPushButton("ELIMINAR");
            botonAgregar = new QPushButton("AGREGAR");
            vista = tabla->get();
        }
        virtual void despuesCancelar(){};
        void conectarBotones(){
            connect(guardarCambios,&QPushButton::clicked,this,&CRUD<T>::guardarOperacion);
            connect(cancelarCambios,&QPushButton::clicked,this,&CRUD<T>::cancelarOperacion);
            connect(botonAgregar,&QPushButton::clicked,this,&CRUD<T>::agregarItem);
            connect(botonEliminar,&QPushButton::clicked,this,&CRUD<T>::eliminarItem);
        }
        void agregarItem(){
            textoConsulta = modelo->insertRecord( -1,QSqlRecord{filaDefecto});
        }
        void eliminarItem(){
            QModelIndexList seleccion = vista->selectionModel()->selectedRows();
            for(int i=0;i<seleccion.length();i++)
                modelo->removeRow( seleccion.at(i).row() );
        }
        QString edicionExitosa(){
            modelo->database().commit();
            return "Estado consulta: consulta OK";
        }
        QString edicionFallida(){
            modelo->database().rollback();
            return QString{"Estado consulta: error: "}+modelo->lastError().databaseText();
        };

    public:
        CRUD(T* _modelo = nullptr)
            :   modelo{_modelo}
        {
            inicializarComponentes();
            conectarBotones();
        }
        ~CRUD(){};

    public slots:
        void cancelarOperacion(){
            modelo->revertAll();
            modelo->database().rollback();
            modelo->database().transaction();
            estadoConsulta->setText("Estado consulta: esperando consulta.");
            despuesCancelar();
        }
        void guardarOperacion(){
            textoConsulta = modelo->submitAll()
                ? edicionExitosa()
                : edicionFallida();
            estadoConsulta->setText(textoConsulta);
            modelo->database().transaction();
        }
};
#endif // CRUD_H
