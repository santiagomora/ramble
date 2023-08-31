import React, {
    Component,
    useState,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';

import {
    compareDates
} from '../../../app/utils/Helper';

export const generateListByLocationCapacity = (m) => {
    const l = [...Array(m + 1).keys()];
    l.shift();
    return l;
};

export function checkValid({date,min,horarios,feriados}){
    const   resDate = compareDates(date,min,{d:'<',m:'=',y:'='})
                ? new Date(min)
                : new Date(date);
    while (
        horarios[resDate.getDay()+1].estado === 'no_laboral'
        || (feriados[resDate.getDate()]||{}).estado==='no_laboral'
        && resDate.getMonth() === date.getMonth()
    )
        resDate.setDate(resDate.getDate()+1);
    return resDate;
}

export const generateHourArray = (
    h,
    i,
    hA,
    s
) => {
    let sH = h.apertura.reserva.hora,
        sM = h.apertura.reserva.minuto,
        eH = h.cierre.reserva.hora === 0 ? 24 : h.cierre.reserva.hora,
        eM = h.cierre.reserva.minuto,
        hP = s.hora,
        mP = s.minuto,
        hL = {};

    hA[hP] = {};
    hL[hP] = hP;

    while (hP !== eH || (hP === eH && mP <= eM)) {
        if (mP >= 60) {
            hP++;
            hA[hP] = {};
            hL[hP] = hP;
            mP = 0;
        }
        hA[hP][mP] = mP;
        mP += i;
    }
    return { hourArray:hA, hList: hL };
}

export const calculateOffset = (
    a,
    dt,
    d
) => {
    const o = { dias: parseInt(a / 24), horas: a % 24 },
        cH = parseInt(d.cierre.reserva.hora),
        cM = parseInt(d.cierre.reserva.minuto);

    dt.setDate(dt.getDate() + o.dias);
    dt.setHours(dt.getHours() + o.horas, dt.getMinutes(), 0, 0);

    if (dt.getHours() > cH || (dt.getHours() === cH && dt.getMinutes() > cM)) {
        dt.setDate(dt.getDate() + 1);
        dt.setHours(0, 0, 0, 0);
    }
    return dt;
};

export const generateAcceptedHours = ({
    a,
    g,
    i,
    f,
    m
}) => {
    const   nw = new Date(),
            sH = (m.getDate() === f.getDate() && m.getMonth() === f.getMonth() && m.getFullYear() === f.getFullYear()) && m.getHours()>nw.getHours()
                ? g.apertura.reserva.hora + a
                : g.apertura.reserva.hora,
            sM = g.apertura.reserva.minuto;

    return generateHourArray(
        g,
        i,
        {},
        { hora: sH, minuto: sM }
    );
}
