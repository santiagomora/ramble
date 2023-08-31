
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';
import {GenerateActions} from '../../acciones/GenerateActions';
import Actions from '../basic/Actions';
import {Toggle} from '../input/Toggle';
import {Link} from 'react-router-dom';
import {CommaList} from '../basic/CommaList';

export default function FeriadosTable(props) {
    const actions = props.actions,
        columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi')),
                Cell:(props) => {
                    return (
                        <Link to={`/escritorio/feriados/${props.original.id}`}>
                            <span className="m-font bold">{props.original.nombre}</span>
                        </Link>
                    )
                }
            },
            {
                Header: "Fecha",
                accessor: "fecha",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Eventos",
                accessor: "eventos",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>,
                Cell:(props) => {
                    return (
                        <CommaList list={props.original.eventos.list}
                            route="eventos"/>
                    )
                }
            },
            {
                Header: "Tipo",
                accessor: "estado",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>,
                Cell:(props) => {
                    const side = props.original.estado==="laboral" ? 1 : 2;
                    return (
                        <Toggle rightTitle={"no laboral"}
                            leftTitle={"laboral"}
                            side={side}
                            changeSide={()=>false}/>
                    )
                }
            },
            {
                Header: "Estado",
                accessor: "scope",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>,
                Cell:(props) => {
                    const side = props.original.scope==="Activo" ? 1 : 2;
                    return (
                        <Toggle rightTitle={"inactivo"}
                            leftTitle={"activo"}
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
                Cell: (props) => {
                    const acciones = GenerateActions.feriados(
                        props.original,
                        actions,
                        props.original.id,
                        "week",
                        new Date(props.original.fecha)
                    );
                    return (
                        <Actions links={acciones.links}
                            buttons={acciones.buttons}/>
                    )
                }
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={true}/>
    );
}
