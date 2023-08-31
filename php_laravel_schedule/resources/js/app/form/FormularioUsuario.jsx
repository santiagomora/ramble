/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elem
 */
import { Text } from '../componentes/input/Text';

export const FormularioUsuario = (props) => {
    const data = props.data;
    return (
        <>
            <div className="row mid-title">
                Información del Usuario
            </div>
            <div className="row v-padding">
                <div className="col-md-4">
                    <Text   rows={1}
                        titulo="Username"
                        name="username"
                        holder="Nombre de Usuario hasta 100 caracteres"
                        errors={props.errors.username}
                        value={props.fields.username}
                        changeHandler={props.change}/>
                </div>
                <div className="col-md-4">
                <Text   rows={1}
                    titulo="Email de usuario"
                    name="email"
                    holder="Email de Usuario hasta 100 caracteres"
                    errors={props.errors.email}
                    value={props.fields.email}
                    changeHandler={props.change}/>
                </div>
                <div className="col-md-4">
                    <Text   rows={1}
                        titulo="Contraseña"
                        name="password"
                        holder="Nueva contraseña"
                        errors={props.errors.password}
                        value={props.fields.password}
                        changeHandler={props.change}/>
                    <span className="smaller-text">
                        Ingresa un nuevo valor para cambiarla
                    </span>
                </div>
            </div>
        </>
    );
}
