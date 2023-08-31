import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Redirect
} from 'react-router-dom';

import {
    FormularioEstablecimiento
} from '../../../app/form/FormularioEstablecimiento';
import {
    FormularioUsuario
} from '../../../app/form/FormularioUsuario';
import {
    FormularioFranquicia
} from '../../../app/form/FormularioFranquicia';
import {
    FormularioUbicacion
} from '../../../app/form/FormularioUbicacion';

import Titulo from '../../../app/componentes/basic/Titulo';
import {
     Navegacion 
 } from '../../../app/acciones/ActionsByView';


export default function Formulario (props) {
    const data = props.data;
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    return (
        <>
            <Titulo title={
                props.editar
                    ? data.nombre
                    : "Agregar Local"
                }
                links={props.nav.links}
                buttons ={props.nav.buttons} />
            <div className="container">
                <FormularioFranquicia data={data}
                    type={props.type}
                    agregarLocal={!props.editar}
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
                <div className="v-padding">
                {
                    !props.editar
                    ?
                        <>
                            <div className="row mid-title top-padding">
                                Información del local
                            </div>
                            <FormularioEstablecimiento  userType="Local"
                                data={data}
                                fields={props.fields}
                                errors={props.errors}
                                change={props.change}
                                isFranquicia/>
                            <div className="sub-title top-padding">
                                Ubicación
                            </div>
                            <FormularioUbicacion  data={data}
                                fields={props.fields}
                                errors={props.errors}
                                change={props.change}/>
                        </>
                    :
                        <></>
                }
                </div>
                <div className="v-padding">
                    <FormularioUsuario  data={data}
                        fields={props.fields}
                        errors={props.errors}
                        change={props.change}/>
                </div>
            </div>
        </>
    );
}
