import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Text} from '../componentes/input/Text';
import {FormularioUbicacion} from './FormularioUbicacion';

export const FormularioEstablecimiento = (props) => {
    const data = props.data,
        userType = props.userType;
    return (
        <>
            <div className="row v-padding">
                <div className="col-md-4">
                    <Text rows={1}
                        titulo='Nombre'
                        name="nombre"
                        holder={`Nombre de ${userType} hasta 100 caracteres`}
                        errors={props.errors.nombre}
                        value={props.fields.nombre}
                        changeHandler={props.change}/>
                </div>
                <div className="col-md-4">
                    <Text rows={1}
                        titulo='Correo'
                        name="correo_contacto"
                        holder={`Correo de contacto de ${userType} hasta 100 caracteres`}
                        errors={props.errors.correo_contacto}
                        value={props.fields.correo_contacto}
                        changeHandler={props.change}/>
                </div>
                <div className="col-md-4">
                    <Text rows={1}
                        titulo="Telefono"
                        name="telefono_contacto"
                        holder={`Teléfono de contacto de ${userType} hasta 100 caracteres`}
                        errors={props.errors.telefono_contacto}
                        value={props.fields.telefono_contacto}
                        changeHandler={props.change}/>
                </div>
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <Text rows={1}
                        titulo="Razón Social"
                        name="razon_social"
                        holder="Razón social hasta 100 caracteres"
                        errors={props.errors.razon_social}
                        value={props.fields.razon_social}
                        changeHandler={props.change}/>
                </div>
                <div className="col-md-6">
                    <Text rows={1}
                        titulo="CUIT / CUIL"
                        name="cuit_cuil"
                        holder="CUIT / CUIL hasta 11 caracteres"
                        errors={props.errors.cuit_cuil}
                        value={props.fields.cuit_cuil}
                        changeHandler={props.change}/>
                </div>
            </div>
            {
                props.isFranquicia
                ?
                    <></>
                :
                    <>
                        <div className="row mid-title v-padding">
                            Información del encargado
                        </div>
                        <div className="row v-padding ">
                            <div className="col-md-4">
                                <Text rows={1}
                                    titulo="Nombre del encargado"
                                    name="nombre_adm"
                                    holder="Nombre del encargado hasta 100 caracteres"
                                    errors={props.errors.nombre_adm}
                                    value={props.fields.nombre_adm}
                                    changeHandler={props.change}/>
                            </div>
                            <div className="col-md-4">
                                <Text rows={1}
                                    titulo="Teléfono del encargado"
                                    name="telefono_adm"
                                    holder="Teléfono del encargado hasta 20 caracteres"
                                    errors={props.errors.telefono_adm}
                                    value={props.fields.telefono_adm}
                                    changeHandler={props.change}/>
                            </div>
                            <div className="col-md-4">
                                <Text rows={1}
                                    titulo="Correo del encargado"
                                    name="correo_adm"
                                    holder="Correo del encargado hasta 100 caracteres"
                                    errors={props.errors.correo_adm}
                                    value={props.fields.correo_adm}
                                    changeHandler={props.change}/>
                            </div>
                        </div>
                        <div className="row mid-title top-padding">
                            {`Ubicación de ${userType}`}
                        </div>
                        <FormularioUbicacion data={data}
                            errors={props.errors}
                            fields={props.fields}
                            change={props.change}/>
                    </>
            }

        </>
    );
}
