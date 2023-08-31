/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Actions from '../componentes/basic/Actions';
import { ReservasActions } from './ReservasActions';
import { FeriadosActions } from './FeriadosActions';
import { HorariosActions } from './HorariosActions';
import { EventosActions } from './EventosActions';
import { UbicacionesActions } from './UbicacionesActions';
import { PromocionesActions } from './PromocionesActions';

export const GenerateActions = {
    reservas: (
        data,
        actions,
        key,
        type,
        fullDate
    ) => {
        let index = '';

        if (data)
            index = data.estado ? data.estado : 'data';
        else
            index = 'no_data';

        const acciones = ReservasActions[type][index](
            actions,
            key,
            fullDate
        );

        return (
            <Actions links={acciones.links}
                buttons={acciones.buttons}
                toggle={acciones.toggle}/>
        );
    },
    feriados: (
        data,
        actions,
        key,
        type,
        fullDate
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = FeriadosActions[type][index](
                key,
                actions
            );
        return acciones;
    },
    horarios: (
        data,
        actions,
        key
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = HorariosActions[index](
                key,
                actions
            );
        return acciones;
    },
    ubicaciones: (
        key,
        actions
    ) => {
        const acciones = UbicacionesActions(
            key,
            actions
        );
        return (
            <Actions links={acciones.links}
                buttons={acciones.buttons}
                toggle={acciones.toggle} />
        );
    },
    eventos: (
        key,
        actions
    ) => {
        const acciones = EventosActions(
            key,
            actions
        );
        return (
            <Actions links={acciones.links}
                buttons={acciones.buttons}
                toggle={acciones.toggle} />
        );
    },
    promociones: (
        key,
        actions
    ) => {
        const acciones = PromocionesActions(
            key,
            actions
        );
        return (
            <Actions links={acciones.links}
                buttons={acciones.buttons}
                toggle={acciones.toggle} />
        );
    }
};
