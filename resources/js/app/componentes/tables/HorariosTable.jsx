
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function UbicacionesTable(props){
    const columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Foto",
                accessor: "foto",
                headerClassName: 'bold highlight-title text-left',
                maxWidth:75,
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Descripción",
                accessor: "descripcion",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Capacidad Máxima",
                accessor: "capacidad",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Máximo reservas",
                accessor: "maximo",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "visible",
                headerClassName: 'visible bold highlight-title text-right',
                Filter: ({ filter, onChange }) =><></>
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={true}/>
    );
}
