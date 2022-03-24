import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Redirect,
    Link
} from 'react-router-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import {
    assignHorarios
} from '../../../app/utils/Helper';
import {
    CommaList
} from '../../../app/componentes/basic/CommaList';
import EventosTable from '../../../app/componentes/tables/EventosTable';

const generateList = (list) => {
    const eventos = Object.values(list).map(
        (e,i) => {
            const horarios = assignHorarios(e.horarios.list)[0];
            return {
                ...e,
                nombre:(
                    <Link to={`/eventos/${e.id}`}>
                        <span className="text">
                            {e.nombre}
                        </span>
                    </Link>
                ),
                horarios:(
                    <CommaList  list={horarios}
                                route='horarios'/>
                )
            }
        }
    );
    return eventos;
};
export default function VerPromocion (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const   eventos = generateList(props.data.eventos.data),
            data = {...props.data,eventos};
    return (
        <>
            <Titulo title={data.nombre}
                links={props.nav.links}
                buttons ={props.nav.buttons}
                changeView={props.changeView}/>
            <div className="container-fluid">
                <div className="row h-padding">
                    <div className="mid-title">
                        Eventos
                    </div>
                    <EventosTable data={data.eventos}/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="light-danger m-font">
                            Descripción:
                        </div>
                        <div>
                            {data.descripcion}
                        </div>
                        <h6 className="highlight m-font top-padding">
                            Descuento:
                        </h6>
                        <div>
                        {
                            data.descuento
                            ? (
                                <>{data.descuento}<span className="bold side-margin">%</span></>
                            )
                            : "Sin descuento"
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
