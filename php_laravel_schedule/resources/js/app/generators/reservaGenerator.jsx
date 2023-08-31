import React, { Component, useContext,useRef } from 'react';
import ReactDOM from 'react-dom';
import {GenerateActions} from '../acciones/GenerateActions';
import { DAYS, MONTHS } from '../constantes/DaysMonths';
import { CLASSBYSTATE } from '../constantes/CardObject';

const ReservaByState = {
    data: (
        date,
        data,
        callback,
        current,
        isFirst
    ) => {
        return (
            <li className={
                    current.getDate() === date.getDate() && !isFirst
                        ? "text-center box-padding relative auto-flow square highlight-blue background-border pointer tile-selected"
                        : "text-center box-padding relative auto-flow square highlight-blue background-border pointer"
                }
                onClick={callback}
                value={date.getDate()}
                key={date.getDate()}>
                <div className="mid-title light-danger bold">{date.getDate()}</div>
                <div className="smaller-text bold">{`${Object.values(data).length} reservas`}</div>
            </li>
        );
    },
    no_data: (
        date,
        data,
        callback,
        current,
        isFirst
    ) => {
        return (
            <li className={
                    current.getDate() === date.getDate() && !isFirst
                    ? "text-center box-padding relative square tile-selected"
                    : "text-center box-padding relative square"
                }
                key={date.getDate()}>
                <div className="mid-title">{date.getDate()}</div>
                <i className="text-top fas fa-ellipsis-h highlight-title" style={{ marginTop: "-8px",opacity:0 }} />
            </li>
        );
    }
};

export const reservaGenerator = (
    date,
    data,
    callback,
    isFirst
) => {
    const init = new Date(date),
          cursor = new Date(init),
          res = [];
    let ctr = 1,
        ind = "";
    while (cursor.getMonth() === date.getMonth()){
        init.setDate(ctr);
        cursor.setDate(ctr+1);
        ind = data[init.getDate()] ? 'data' : 'no_data';
        res.push(
            ReservaByState[ind](
                init,
                data[init.getDate()],
                callback,
                date,
                isFirst
            )
        )
        ctr+=1;
    }
    return res;
}
