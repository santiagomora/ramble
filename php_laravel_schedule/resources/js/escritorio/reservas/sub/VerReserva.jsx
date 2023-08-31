/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import {
    Calendario
} from '../../../app/form/Calendario';
import {
    MONTHS
} from '../../../app/constantes/DaysMonths';
import Titulo from '../../../app/componentes/basic/Titulo';
import {
    ReservasActions
} from '../../../app/acciones/ReservasActions';

export default class VerReserva extends Component {
    constructor(props){
        super(props);
        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
        };

    }

    revertirReserva() {
        console.log('revertir');
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        const   data = this.props.data,
                actions = ReservasActions.day[data.estado](this.actions,data.estado),
                date = new Date(`${data.fechaReserva} 00:00`),
                ElemByState = {
                    Aprobada: ()=>(
                        <div className="bold text-right full-width" style={{position:'absolute',bottom:0,right:'10px'}}>
                            <i className="fas fa-check-circle inline-box side-margin"/>
                            Aprobada
                        </div>
                    ),
                    Rechazada: ()=>(
                        <div className="bold text-right full-width" style={{position:'absolute',bottom:0,right:'10px'}}>
                            <i className="fas fa-times-circle inline-box side-margin"/>
                            Rechazada
                        </div>
                    ),
                    Pendiente: ()=>(
                        <div className="bold text-right full-width" style={{position:'absolute',bottom:0,right:'10px'}}>
                            <i className="fas fa-history inline-box side-margin"/>
                            Pendiente
                        </div>
                    )
                };
        return (
            <>
                <Titulo title={`Reserva de ${data.nombre} ${data.apellido}`}
                    links={[this.props.nav.links[0]]}
                    buttons ={actions.buttons}/>
                <div className="container-fluid">
                    <div className="m-font light-danger row">
                        {
                            data.DNI
                            ? (
                                <>
                                    <span className="bold">
                                        DNI
                                    </span>
                                    <span className="text">
                                        {data.dni}
                                    </span>
                                </>
                            )
                            : (
                                <span className="bold">Sin DNI</span>
                            )
                        }

                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6 container-fluid">
                            <div className="row">
                                <Calendario editar={true}
                                    date={date}
                                    data={data}/>
                            </div>
                        </div>
                        <div className="col-md-6 container">
                            <div className="row">
                                <div className="col-md-8 no-padding">
                                    <div className="mid-title">
                                        {`${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`}
                                    </div>
                                    <div className="c-title">
                                        {`${data.hora_reserva} horas`}
                                    </div>
                                    <div className="mid-font">
                                        {ElemByState[data.estado]()}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="m-font light-danger row">
                                        Correo
                                    </div>
                                    <div className="row">
                                        {data.email}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row top-padding top-padding m-font light-danger">
                                        Telefono
                                    </div>
                                    <div className="row">
                                        {data.telefono}
                                    </div>
                                </div>
                            </div>
                            <div className="row top-padding">
                                <div className="col-md-6 no-padding">
                                    <div className="m-font light-danger">
                                        Evento:
                                        <Link to={`/eventos/${data.evento.id}`}>
                                            <span className="side-margin">
                                                {data.evento.nombre}
                                            </span>
                                        </Link>
                                    </div>
                                    {data.evento.descripcion||"sin definir"}
                                </div>
                                <div className="col-md-6 no-padding">
                                    <div className="m-font light-danger">
                                        Promoción:
                                        <Link to={`/promociones/${data.promocion.id}`}>
                                            <span className="side-margin">
                                                {data.promocion.nombre||"sin definir"}
                                            </span>
                                        </Link>
                                    </div>
                                    {data.promocion.descripcion||"sin definir"}
                                    <div className="small-v-padding bold">
                                        {`${data.promocion.descuento}% descuento`||'sin definir'}
                                    </div>
                                </div>
                            </div>
                            <div className="row top-padding">
                                <div className="col-md-6 no-padding">
                                    <span className="light-danger side-margin m-font ">
                                        Ubicación:
                                    </span>
                                    <Link to={`/ubicaciones/${data.ubicacion.id}`}>
                                        <span className="side-margin">
                                            {data.ubicacion.nombre||"sin definir"}
                                        </span>
                                    </Link>
                                    <div>
                                        {data.ubicacion.descripcion||"sin definir"}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-font light-danger row">
                                        Cantidad de personas
                                    </div>
                                    <div className="row">
                                        <span className="m-font bold side-margin inline-block">
                                            {data.personas}
                                        </span>
                                        personas
                                    </div>
                                </div>
                            </div>
                            <div className="row highlight m-font top-padding">
                                Observaciones:
                            </div>
                            <div className="row">
                                {data.descripcion}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
