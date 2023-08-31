
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';
import {Link} from 'react-router-dom';
import {GenerateActions} from '../../acciones/GenerateActions';
import {Toggle} from '../input/Toggle';

export default function UbicacionesTable(props){
    const actions = props.actions,
        columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi')),
                Cell: (props) =>
                        <Link to={`/escritorio/ubicaciones/${props.original.id}`}>
                            <span className="m-font bold">{props.original.nombre}</span>
                        </Link>
            },
            {
                Header: "Foto",
                accessor: "foto",
                headerClassName: 'bold highlight-title text-left',
                maxWidth:75,
                Filter: ({ filter, onChange }) =><></>,
                Cell: (props) => {
                    return (
                        <img src={props.original.foto} alt="ubicacion foto" width="50px" height="50px"/>
                    )
                }
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
                Header: "Estado",
                accessor: "scope",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>,
                Cell:(props) => {
                    const side = props.original.estado==="Activo" ? 1 : 2;
                    return (
                        <Toggle rightTitle={"activo"}
                            leftTitle={"inactivo"}
                            side={side}
                            changeSide={()=>false}/>
                    )
                }
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "visible text-right",
                headerClassName: 'visible bold highlight-title text-right',
                Filter: ({ filter, onChange }) =><></>,
                Cell: (props) =>
                    GenerateActions.ubicaciones(
                        props.original.id,
                        actions
                    )
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={true}/>
    );
}
