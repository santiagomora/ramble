#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QImageReader>
#include <QPicture>
#include <QFileDialog>


MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    Port = NULL;    //indica que el objeto puerto no esta creado;
    Portname = "";
    EnumerarPuertos();
    ui->dateTimeEdit->setDisabled(true);
    ui->tableWidget->setDisabled(true);
    ui->pushButton_CREAR->setDisabled(true);
    ui->pushButton_AGREGAR->setDisabled(true);
    ui->pushButton_BORRAR->setDisabled(true);
    ui->pushButton_GUARDAR->setDisabled(true);
    ui->labelMsJ->setText(" ingrese nombre y contraseña para acceder ");

}

MainWindow::~MainWindow()
{
    delete ui;
    delete Port;            //libero port
}

void MainWindow::EnumerarPuertos() //agregado
{
    ui->comboBoxPort->clear();

    QList<QSerialPortInfo> ports = QSerialPortInfo::availablePorts();

    for (int i = 0; i < ports.size(); i++)
    {
        ui->comboBoxPort->addItem(ports.at(i).portName(), ports.at(i).portName());
    }
}


void MainWindow::on_radioButton_4_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/Coca-Cola.png");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(100, 100, Qt::IgnoreAspectRatio, Qt::FastTransformation));
        //ui->Imagen2->setPixmap(s);             //se inserta la imagen en imagen2 pero no respeta la relacion de espacio que disponemos.
        //ui->Imagen2->setScaledContents(true);  //esta linea de codigo tambien es posible pero la calidad de la imagen no es tomado en cuenta
                                                 // pero la relacion de espacio si se toma en cuenta.

    }
    else
    {
        ui->Imagen2->clear();
    }

}

void MainWindow::on_radioButton_5_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/Pepsi.png");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(140, 110, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_6_toggled(bool checked)     // problemas para mostrar la imagen
{
    QPixmap s ("../interfaz/QtImagen/Fanta.png");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(140, 110, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_7_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/manaos.png");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(140, 100, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_8_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/QUILMES.jpg");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(140, 140, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_9_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/Speed.png");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(100, 100, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_10_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/FERNET.jpg");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(140, 110, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_11_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/DRLemon.jpg");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(100, 100, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_radioButton_12_toggled(bool checked)
{
    QPixmap s ("../interfaz/QtImagen/7up.png");

    if(checked == true)
    {
        ui->Imagen2->setPixmap(s.scaled(100, 100, Qt::IgnoreAspectRatio, Qt::FastTransformation));
    }
    else
    {
        ui->Imagen2->clear();
    }
}

void MainWindow::on_pushButtonCONECTAR_clicked()
{
    if (!Port)
    {
        Port = new QSerialPort(Portname);
        Port->setBaudRate(QSerialPort::Baud9600);
        Port->setFlowControl(QSerialPort::NoFlowControl);
        Port->setParity(QSerialPort::NoParity);
        Port->setDataBits(QSerialPort::Data8);
        Port->setStopBits(QSerialPort::OneStop);
        if(!Port->open(QIODevice::ReadWrite))
        {
            QMessageBox::critical(this,"Error","No se puede abrir el puerto "+Port->portName());
            delete Port;
            Port = NULL;
        }
        else
        {
            ui->labelEstado->setText("CONECTADO A LA PLACA");

            //agregar codigo para enviar informacion.
        }
    }
    else
    {
        delete Port;
        Port = NULL;
        ui->labelEstado->setText("Conectar");
    }
}

void MainWindow::on_actionLogin_triggered()
{

}

void MainWindow::on_pushButtonINGRESAR_clicked()
{
        QString nombre,clave,cla_nom,cla_pass;
        nombre = ui->lineEdit_NOMBRE->text();
        clave = ui->lineEdit_PASSWORD->text();
        cla_nom = "info2";
        cla_pass = "r2054";
        if( nombre == cla_nom )
        {
            if( clave == cla_pass)
            {
                ui->labelMsJ->setText(" Bienbenido!!.. ");
                ui->dateTimeEdit->setEnabled(true);
                ui->tableWidget->setEnabled(true);
                ui->pushButton_CREAR->setEnabled(true);
                ui->pushButton_AGREGAR->setEnabled(true);
                ui->pushButton_BORRAR->setEnabled(true);
                ui->pushButton_GUARDAR->setEnabled(true);
            }
        }
        else
        {
            ui->labelMsJ->setText(" nombre o contraseña INCORRECTO!.. ");
        }
}

void MainWindow::on_pushButton_SALIR_clicked()
{
        ui->dateTimeEdit->setDisabled(true);
        ui->tableWidget->setDisabled(true);
        ui->pushButton_CREAR->setDisabled(true);
        ui->pushButton_AGREGAR->setDisabled(true);
        ui->pushButton_BORRAR->setDisabled(true);
        ui->pushButton_GUARDAR->setDisabled(true);
        ui->labelMsJ->setText(" ingrese nombre y contraseña para acceder ");
        ui->lineEdit_NOMBRE->clear();
        ui->lineEdit_PASSWORD->clear();
}

void MainWindow::on_pushButton_CREAR_clicked()
{
    QString DBStock;
    DBStock.append("DataBaseStock");
    db = QSqlDatabase::addDatabase("QSQLITE");
    db.setDatabaseName(DBStock);
    if(!db.open())
    {  QMessageBox::critical(NULL, "Stock", "Error en la creacion de la base de datos del Stock!");
       exit(1);
    }
    else
    {
       DBStock.append("CREATE TABLE IF NOT EXISTS stock("
                            "id VARCHAR(50) PRIMARY KEY,"
                            "mar1 '+ui->Imagen2->clear()',"
                            "cant1 INTEGER (50)"
                            "mar2 VARCHAR(50),"
                            "cant2 VARCHAR(50)"
                            "mar3 VARCHAR(50),"
                            "cant3 VARCHAR(50)"
                            "mar4 VARCHAR(50),"
                            "cant4 VARCHAR(50)"
                            "mar5 VARCHAR(50),"
                            "cant5 VARCHAR(50)"
                            "mar6 VARCHAR(50),"
                            "cant6 VARCHAR(50)"
                            "mar7 VARCHAR(50),"
                            "cant7 VARCHAR(50)"
                            "mar8 VARCHAR(50),"
                            "cant8 VARCHAR(50)"
                            "mar9 VARCHAR(50),"
                            "cant9 VARCHAR(50)"
                            ");");
       QSqlQuery tabla(db);
       tabla.prepare(DBStock);
       if (!tabla.exec())
       {   exit(1);
       }
       QMessageBox::information(NULL, "Base de Datos", "Tabla de notas creada");

    }

}


/*
 *        if(!tabla.prepare(DBStock))
       {
           QMessageBox::critical(NULL, "Base de Datos", "No se pudo preparar la consulta de la Tabla de Stock");
       }

       if(!tabla.prepare(DBStock))
       {
          QMessageBox::critical(NULL, "Base de Datos", "No se pudo preparar la consulta de la Tabla de Stock");
       }
*/
