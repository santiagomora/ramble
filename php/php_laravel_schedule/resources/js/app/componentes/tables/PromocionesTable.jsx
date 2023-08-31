/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';
import {Link} from 'react-router-dom';
import {GenerateActions} from '../../acciones/GenerateActions';
import {CommaList} from '../basic/CommaList';
import {Toggle} from '../input/Toggle';

export default function PromocionesTable(props){
    const actions = props.actions,
        columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi')),
                Cell: (props) =>
                    <Link to={`/escritorio/promociones/${props.original.id}`}>
                        <span className="m-font bold">{props.original.nombre}</span>
                    </Link>
            },
            {
                Header: "Descripción",
                accessor: "descripcion",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Descuento",
                accessor: "descuento",
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
        ];
    if (props.showEventos)
        columns.push({
            Header: "Eventos",
            accessor: "eventos",
            className: "visible",
            headerClassName: 'bold highlight-title text-left',
            Filter: ({ filter, onChange }) =><></>,
            Cell: (props) => {
                return (
                    <CommaList list={props.original.eventos.list} route="eventos"/>
                );
            }
        });
    if (props.showActions)
        columns.push({
            Header: "Acciones",
            accessor: "acciones",
            className: "visible text-right",
            headerClassName: 'bold highlight-title text-right',
            Filter: ({ filter, onChange }) =><></>,
            Cell: (props) =>
                GenerateActions.promociones(
                    props.original.id,
                    actions
                )
        });
    return (
        <BaseTable data={props.data} columns={columns} filterable={props.filter}/>
    );
}
