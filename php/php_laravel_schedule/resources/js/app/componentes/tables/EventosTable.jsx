
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';
import {Toggle} from '../input/Toggle';
import {Link} from 'react-router-dom';
import {CommaList} from '../basic/CommaList';
import {assignHorarios} from '../../utils/Helper';
import {GenerateActions} from '../../acciones/GenerateActions';

export default function EventosTable(props){
    const actions = props.actions,
        columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left",
                minWidth:120,
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi')),
                Cell: (props) =>
                    <Link to={`/escritorio/eventos/${props.original.id}`}>
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
                Header: "Estado",
                accessor: "estado",
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
    if (props.showHorarios)
        columns.push({
            Header: "Horarios",
            accessor: "horarios",
            className: "visible",
            minWidth:120,
            headerClassName: 'bold highlight-title text-left',
            Filter: ({ filter, onChange }) =><></>,
            Cell: (props) => {
                return (
                    <CommaList list={assignHorarios(props.original.horarios.list)[0]} route="horarios"/>
                )
            }
        });
    if (props.showPromociones)
        columns.push({
            Header: "Promociones",
            accessor: "promociones",
            className: "visible",
            minWidth:120,
            headerClassName: 'bold highlight-title text-left',
            Filter: ({ filter, onChange }) =><></>,
            Cell: (props) => {
                return (
                    <CommaList list={props.original.promociones.list} route="promociones"/>
                )
            }
        });
    if (props.showActions)
        columns.push({
            Header: "Acciones",
            accessor: "acciones",
            className: "visible text-right",
            headerClassName: 'bold highlight-title text-right',
            Filter: ({ filter, onChange }) =><></>,
            Cell: (props) => {
                return GenerateActions.eventos(
                    props.original.id,
                    actions
                )
            }
        });
    return (
        <BaseTable data={props.data} columns={columns} filterable={props.filter}/>
    );
}
