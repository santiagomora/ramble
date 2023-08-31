import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';

export default function VerUbicacion (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data;
    return (
        <div className="container-fluid no-padding">
            < Titulo title={data.nombre}
                links={props.nav.links}
                buttons ={props.nav.buttons}
                changeView={props.changeView}/>
            <div className="row full-width">
                <div className="col-md-4 text-center" >
                    <div className="sidebar-box">
                        <img className="img-responsive" src={data.foto} alt="ubicacion foto" style={{maxHeight:"300px",maxWidth:"300px"}}/>
                    </div>
                </div>
                <div className="col-md-8 container h-padding">
                    <div className="row m-font highlight top-padding">
                        Descripcion:
                    </div>
                    <div className="row">
                        {data.descripcion}
                    </div>
                    <div className="row v-padding m-font highlight top-padding">
                        Máximo por mesa
                    </div>
                    <div className="row">
                        {data.maximo+" personas"}
                    </div>
                    <div className="row m-font highlight top-padding">
                        Capacidad máxima
                    </div>
                    <div className="row">
                        {data.capacidad+" personas"}
                    </div>
                </div>
            </div>
        </div>
    )
}
