
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';
import {GenerateActions} from '../../acciones/GenerateActions';
import {Link} from 'react-router-dom';

export default function UbicacionesTable(props){
    const actions = props.actions,
        columns = [
            {
                id:"nombre",
                Header: "Nombre y apellido",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                minWidth: 150,
                Cell: (props) => {
                    const data = props.original;
                    return (
                        <Link to={`/escritorio/reservas/${data.id}`}>
                            <span className="m-font bold">{`${data.nombre} ${data.apellido}`}</span>
                        </Link>
                    )
                },
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "DNI",
                accessor: "dni",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Email",
                accessor: "email",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Teléfono",
                accessor: "telefono",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Fecha de reserva",
                accessor: "fechaReserva",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Ocasión",
                accessor: "evento.nombre",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Ubicación",
                accessor: "ubicacion.nombre",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Promoción",
                accessor: "promocion.nombre",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Estado",
                accessor: "estado",
                className:"bold",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) => <></>
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "visible text-right",
                headerClassName: 'visible bold highlight-title text-right',
                Filter: ({ filter, onChange }) => <></>,
                Cell: (props) =>
                    GenerateActions.reservas(
                        props.original,
                        actions,
                        props.original.id,
                        "day",
                        new Date(props.original.fecha_reserva)
                    )
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={true}/>
    );
}
