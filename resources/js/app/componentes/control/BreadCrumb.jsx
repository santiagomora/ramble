/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

const map = {
    escritorio:   () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-tachometer-alt inline-box side-margin" />
                <span className={`text ${weight}`}>Escritorio</span>
            </>
    ),
    perfil:   () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-user inline-box side-margin" />
                <span className={`text ${weight}`}>Perfil</span>
            </>
    ),
    reservas: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-book inline-box side-margin" />
                <span className={`text ${weight}`}>Reservaciones</span>
            </>
    ),
    horarios: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-calendar-week inline-box side-margin" />
                <span className={`text ${weight}`}>Horarios</span>
            </>
    ),
    ubicaciones: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-store-alt inline-box side-margin" />
                <span className={`text ${weight}`}>Ubicaciones</span>
            </>
    ),
    eventos: () => (
        (weight) =>
            <>
              <i className="margin-box fas fa-glass-cheers inline-box side-margin" />
              <span className={`text ${weight}`}>Eventos</span>
            </>
    ),
    configuracion: () => (
        (weight) =>
            <>
              <i className="margin-box fas fa-cog inline-box side-margin" />
              <span className={`text ${weight}`}>Configuración</span>
            </>
    ),
    franquicias: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-tag inline-box side-margin" />
                <span className={`text ${weight}`}>Franquicias</span>
            </>
    ),
    feriados: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-calendar-day inline-box side-margin" />
                <span className={`text ${weight}`}>Feriados</span>
            </>
    ),
    locales: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-store inline-box side-margin" />
                <span className={`text ${weight}`}>Locales</span>
            </>
    ),
    promociones: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-percentage inline-box side-margin" />
                <span className={`text ${weight}`}>Promociones</span>
            </>
    ),
    editar: (nombre) => (
        (weight) =>
            <>
                <i className="margin-box fas fa-pen inline-box side-margin" />
                <span className={`text ${weight}`}>{"Editar "+nombre||''}</span>
            </>
    ),
    usuario: (nombre) => (
        (weight) =>
            <>
                <i className="margin-box fas fa-user inline-box side-margin" />
                <span className={`text ${weight}`}>{nombre}</span>
            </>
    ),
    agregar: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-plus-circle inline-box side-margin" />
                <span className={`text ${weight}`}>Agregar</span>
            </>
    ),
    establecimiento: () => (
        (weight) =>
            <>
                <i className="margin-box fas fa-store inline-box side-margin" />
                <span className={`text ${weight}`}>Establecimiento</span>
            </>
    ),
    ver:(nombre) => (
        (weight) =>
            <>
                <i className="margin-box fas fa-eye inline-box side-margin" />
                <span className={`text ${weight}`}>{nombre}</span>
            </>
    )
};


function trim(route,str){
    return (route||"").replace(str,"");
}

const externalRoutes = ['escritorio','horarios']

export default class BreadCrumb extends Component {
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(pp,ns){
        return pp.url !== this.props.url || pp.nombre !== this.props.nombre;
    }

    render (){
        let stored = '',
            display = null;
        const props = this.props,
            items = this.props.url.split('/');
        return (
            <div className="col-md-12 d-none d-md-block"
                 style={{
                     zIndex:5,
                     height:"6vh",
                     marginTop:"6px",
                     backgroundColor:'rgba(255,255,255,0.95)'
                 }} >
                <div className="row small-v-padding">
                    <ul className="sticky-top flex-row nav-list no-padding">
                        {
                            items.map(
                                (e,i) => {
                                    stored = i!=0
                                        ? `${trim(stored,"usuario/escritorio/")}/${e}`
                                        : "";

                                    display = map[e]
                                        ? map[e](i===0 ? props.usuario : props.nombre)
                                        : map.ver(props.nombre);

                                    if (items[i-1] === 'editar')
                                        display = () => false;

                                    return (
                                        <li key={i} className="margin-box ">
                                            {
                                                i === items.length-1 || e === 'editar' || e === 'agregar'
                                                ?
                                                    <div className="smaller-text inline-block line-v-middle margin-box">
                                                        {display()}
                                                    </div>
                                                :
                                                    <>
                                                        <Link to={ e === "usuario" ? "/escritorio/configuracion" : stored }>
                                                            <span className="smaller-text margin-box decorate-blue-hover ms-font text inline-block line-v-middle"
                                                                style={{fontWeight:"bold !important"}}>
                                                                {display('bold')}
                                                            </span>
                                                        </Link>
                                                        <i className={"h-padding inline-block margin-box line-v-middle highlight m-font fas fa-angle-right"}/>
                                                    </>
                                            }
                                        </li>
                                    );
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    };
}
