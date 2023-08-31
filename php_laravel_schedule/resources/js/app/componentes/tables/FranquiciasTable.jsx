
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function FranquiciasTable(props){
    const columns = [
            {
                Header: "Administrador",
                accessor: "administrador",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'mid-font bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Teléfono",
                accessor: "admTelefono",
                headerClassName: 'mid-font bold highlight-title text-left'
            },
            {
                Header: "Correo",
                accessor: "admEmail",
                headerClassName: 'mid-font bold highlight-title text-left'
            },
            {
                Header: "Razón Social",
                accessor: "razonSocial",
                headerClassName: 'mid-font bold highlight-title text-left'
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right visible",
                minWidth: 120,
                headerClassName: 'mid-font bold highlight-title text-left',
                fixed: "right"
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={props.filter}/>
    );
}
