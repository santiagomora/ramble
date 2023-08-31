import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import Titulo from '../../../app/componentes/basic/Titulo';
import {
    Calendario
} from '../../../app/form/Calendario';
import {
    CommaList
} from '../../../app/componentes/basic/CommaList';
import EventosTable from '../../../app/componentes/tables/EventosTable';

export default function VerFeriado (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data,
        date= new Date(data.data.fecha),
        estado = data.data.estado.replace('_',' '),
        eventos = Object.values(data.data.eventos.data).map(
            e => ({
                ...e,
                nombre:(
                    <Link to={`/eventos/${e.id}`}>
                        <span className="text">
                            {e.nombre}
                        </span>
                    </Link>
                ),
                promociones:(
                    <CommaList  list={e.promociones.list}
                                route='promociones'/>
                )
            })
        );

    return (
        <>
            <Titulo title={data.data.nombre}
                links={props.nav.links}
                buttons ={props.nav.buttons}
                changeView={props.changeView}/>
            <div className="container-fluid v-padding">
                <div className="row v-padding">
                    <div className="col-md-6 no-padding">
                        <Calendario editar={true}
                            date={date}
                            data={data.data}/>
                    </div>
                    <div className="col-md-6 container">
                        <div className="sub-title bold row v-padding">
                            {`${DAYS[date.getDay()]} ${date.getDate()} de ${MONTHS[date.getMonth()]} del ${date.getFullYear()}`}
                        </div>
                        <div className="row sub-title full-width">
                            {`feriado ${estado}`}
                        </div>
                        <div className="m-font top-padding row light-danger">
                            Horario de atención:
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <span className="bold side-margin">
                                    Apertura:
                                </span>
                                <span className="side-margin">
                                    { `${data.data.apertura.atencion.hora}:${data.data.apertura.atencion.minuto} hs` }
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="bold side-margin">
                                    Cierre:
                                </span>
                                <span className="side-margin">
                                    {`${data.data.cierre.atencion.hora}:${data.data.cierre.atencion.minuto} hs`}
                                </span>
                            </div>
                        </div>
                        <div className="row m-font light-danger top-padding">
                            Horario de reservas:
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <span className="bold side-margin">
                                    Apertura:
                                </span>
                                <span className="side-margin">
                                {
                                    data.data.apertura.reserva.hora + ":" +
                                    data.data.apertura.reserva.minuto +"hs"
                                }
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="bold side-margin">
                                    Cierre:
                                </span>
                                <span className="side-margin">
                                    {`${data.data.cierre.reserva.hora}:${data.data.cierre.reserva.minuto} hs`}
                                </span>
                            </div>
                        </div>
                        <div className="row top-padding">
                            <div className="m-font light-danger">
                                Descripción:
                            </div>
                            <div>
                                {data.data.descripcion}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row h-padding sub-title">
                    Eventos
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        {
                            eventos.length>0
                            ?
                                <EventosTable data={eventos}
                                    showPromociones ={true}/>
                            : "No hay eventos asociados"
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
