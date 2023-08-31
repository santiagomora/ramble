
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function LocalesTable(props){
    const columns = [
            {
                Header: "Franquicia",
                accessor: "franquicia",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Teléfono",
                accessor: "telefonoContacto",
                headerClassName: 'bold highlight-title text-left'
            },
            {
                Header: "Correo",
                accessor: "correoContacto",
                headerClassName: 'bold highlight-title text-left'
            },
            {
                Header: "Administrador",
                accessor: "admNombre",
                headerClassName: 'bold highlight-title text-left'
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right visible",
                minWidth:120,
                headerClassName: 'bold highlight-title text-left',
                fixed: "right"
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={props.filter}/>
    );
}
