#include "modeloboton.h"

ModeloBoton::ModeloBoton(
        QWidget* parent,
        QSqlDatabase* db
)
    :   QSqlRelationalTableModel{parent,*db}
{
    inicializarModelo();
}

ModeloBoton::~ModeloBoton(){
}

void ModeloBoton::inicializarModelo(){
    setEditStrategy( QSqlTableModel::OnManualSubmit );
    setTable(nombreTabla);
    setRelation( GRUPO, QSqlRelation( "Groups", "grp_id", "grp_description" ) );
}

int ModeloBoton::grupoId(){
    return 1;
}
