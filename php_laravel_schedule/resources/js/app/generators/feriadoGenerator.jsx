import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getMonthLength} from '../utils/Helper';
import {GenerateActions} from '../acciones/GenerateActions';
import {DAYS,MONTHS} from '../constantes/DaysMonths';
import {CommaList} from '../componentes/basic/CommaList';
import { CLASSBYSTATE } from '../constantes/CardObject';
import {Link} from 'react-router-dom';
import {ExpandableComponent} from '../hocs/ExpandableComponent';
import Actions from '../componentes/basic/Actions';

const FeriadoMonthByState = {
    laboral: (
        renderActions,
        sectionData,
        date,
        isSelectedDate
    ) => ({
        content:
            <>
                <div className="mid-title light-danger">
                    {date.getDate()}
                </div>
                <div className="smaller-text hide-overflow black-border" style={{height:"40px"}}>
                    {sectionData.nombre}
                </div>
                <div>
                    <Actions links={renderActions.links}
                        buttons={renderActions.buttons}
                        overlay/>
                </div>
            </>
        ,
        class: "same-width text-center box-padding relative black-overlay fix-height"
    }),
    no_laboral: (
        renderActions,
        sectionData,
        date,
        isSelectedDate
    ) => ({
        content: (
            <>
                <div className="mid-title light-danger">
                    {date.getDate()}
                </div>
                <div className="smaller-text hide-overflow black-border" style={{height:"40px"}}>
                    {sectionData.nombre}
                </div>
                <div className="flex-row">
                    <Actions links={renderActions.links}
                        buttons={renderActions.buttons}
                        overlay/>
                </div>
            </>
        ),
        class: "same-width text-center box-padding fix-height relative black-overlay background-border "
    }),
    no_data: (
        date,
        current
    ) => ({
        content:(
            <div className="content mid-title ">
                {date.getDate()}
            </div>
        ),
        class: date.getMonth() === current.getMonth()
            ? "same-width text-center box-padding fix-height"
            : "background-border same-width text-center box-padding fix-height"
    })
}

const FeriadoWeekByState = {
    laboral:(
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    )=>
        {
            const date = new Date(sectionData.fecha),
                eventosLength = Object.values(sectionData.eventos.list).length,
                side = sectionData.estado === 'laboral' ? 1 : 2;
            return {
                content:() =>
                    <ExpandableComponent links = {renderActions.links}
                        buttons = {renderActions.buttons}
                        title = {
                            <Link to={`/feriados/${sectionData.id}`}>
                                <span className="mid-title light-danger">
                                    {date.getDate() + " "}
                                </span>
                                <span className="sub-title side-margin" style={{color:'var(--text-color)'}}>
                                    {DAYS[date.getDay()]}
                                </span>
                                <span className="side-margin m-font"
                                    style={{color:"var(--text-color)"}}>
                                    {sectionData.nombre}
                                </span>
                            </Link>
                        }
                        changeView={{
                            right:"no laboral",
                            left:"laboral",
                            change:() => false,
                            side:side
                        }}>
                        <div className="row top-padding">
                            <div className="col-md-8 container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="light-danger m-font">
                                            Horarios de atención
                                        </div>
                                        <div >
                                            <span className="bold">
                                                Reservas:
                                            </span>
                                            {` ${sectionData.apertura.reserva.hora}:${sectionData.apertura.reserva.minuto} hs. - ${sectionData.cierre.reserva.hora}:${sectionData.apertura.reserva.minuto}hs.`}
                                        </div>
                                        <div>
                                            <span className="bold">
                                                Atencion:
                                            </span>
                                            {` ${sectionData.apertura.atencion.hora}:${sectionData.apertura.atencion.minuto}hs. - ${sectionData.cierre.atencion.hora}:${sectionData.cierre.atencion.minuto}hs.`}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="light-danger m-font">
                                            Eventos
                                        </div>
                                        {
                                            eventosLength > 0
                                            ?
                                                <CommaList  list={sectionData.eventos.list}
                                                            route="eventos"/>
                                            :
                                                "No hay eventos que mostrar."
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-right bold m-font">
                                    Día laboral
                                </div>
                                <div className="light-danger m-font">
                                    Descripción:
                                </div>
                                <div>
                                    {sectionData.descripcion.substring(0, 50) + "..."}
                                </div>
                                <div className="border-top small-v-padding" />
                                <div className="smaller-text">
                                    mostrando sólo los primeros 50 caracteres
                                </div>
                            </div>
                        </div>
                    </ExpandableComponent>,
            class: "v-padding"
        }
    },
    no_laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        {
            const date = new Date(sectionData.fecha),
                side = sectionData.estado === 'laboral' ? 1 : 2;
            return {
                content: () =>
                    <ExpandableComponent links = {renderActions.links}
                        buttons = {renderActions.buttons}
                        title = {
                            <Link to={`/feriados/${sectionData.id}`}>
                                <span className="light-danger mid-title side-margin">
                                    {date.getDate() + " "}
                                </span>
                                <span className="side-margin subrayado sub-title text">
                                    {DAYS[date.getDay()] + " "}
                                </span>
                                <span className="m-font text">
                                    {sectionData.nombre}
                                </span>
                            </Link>
                        }
                        changeView={{
                            right:"no laboral",
                            left:"laboral",
                            change:() => false,
                            side:side
                        }}>
                        <div className="row h-padding">
                            <div className="col-md-6 light-danger mid-font">
                                Sin apertura
                            </div>
                            <div className="col-md-6">
                                <div className="text-right bold m-font">
                                    Día no laboral
                                </div>
                                <div className="light-danger mid-font">
                                    Descripción:
                                </div>
                                <div>
                                    {`${sectionData.descripcion.substring(0, 50)} ...`}
                                </div>
                                <div className="border-top small-v-padding" />
                                <div className="smaller-text" style={{paddingBottom:"10px"}}>
                                    mostrando sólo los primeros 50 caracteres
                                </div>
                            </div>
                        </div>
                    </ExpandableComponent>,
                class: "background-border v-padding"
            }
        }
}


function evalFirstWeek (date){
    let day = date.getDay(),
        evalDate = new Date(date),
        res = [];
    evalDate.setDate(evalDate.getDate()-day);
    while(evalDate.getMonth()!==date.getMonth()){
        res.push(
            FeriadoMonthByState.no_data(
                new Date(evalDate),
                date
            )
        );
        evalDate = new Date(evalDate);
        evalDate.setDate(evalDate.getDate()+1);
    }
    return res;
}

function evalLastWeek(date){
    let day = date.getDay(),
        evalDate = new Date(date),
        res = [];
    evalDate.setDate(evalDate.getDate() + 6 - day);
    while (evalDate.getMonth() !== date.getMonth()) {
        res.push(
            FeriadoMonthByState.no_data(
                new Date(evalDate),
                date
            )
        );
        evalDate = new Date(evalDate);
        evalDate.setDate(evalDate.getDate() - 1);
    }
    return (res||[]).reverse();
}

export function generateMonth (date,data,actions) {
    let monthLength = getMonthLength(
            date.getMonth()+1,
            date.getFullYear()
        ),
        datePtr = new Date(date),
        month = [],
        week = [],
        monthEnd=null,
        elem = {};
    datePtr.setDate(datePtr.getDate() - datePtr.getDate() + 1);
    let dateStr = datePtr.getDate();

    for (let ptr = 0; ptr<monthLength; ptr++){
        let weekCtr = datePtr.getDay(),
            elem = {};
        if (ptr===0){
            week = evalFirstWeek(datePtr);
        }
        if(ptr===monthLength-1){
            monthEnd = evalLastWeek(datePtr);
            weekCtr = 6;
        }
        elem = data[dateStr]
            ?
                FeriadoMonthByState[data[dateStr].estado](
                    GenerateActions.feriados(
                        data[dateStr],
                        actions,
                        data[dateStr].id,
                        'month',
                        new Date(datePtr)
                    ),
                    data[dateStr],
                    new Date(datePtr),
                    date
                )
            :
                FeriadoMonthByState.no_data(
                    new Date(datePtr),
                    date
                );

        week.push(elem);

        if (weekCtr === 6) {
            weekCtr = 0;
            month.push(
                monthEnd === null
                    ? week
                    : week.concat(monthEnd)
            );
            week = [];
        } else weekCtr++;

        datePtr = new Date(datePtr);
        datePtr.setDate(datePtr.getDate() + 1);
        dateStr = datePtr.getDate();
    }
    return month;
}

export function generateWeek (date,data,actions){
    const init = new Date(date),
          cursor = new Date(init);
    let ctr = 1,
        res=[],
        week = [],
        end,
        current,
        index;
    while (cursor.getMonth() === date.getMonth()){
        init.setDate(ctr);
        cursor.setDate(ctr+1);
        current = data[init.getDate()];
        index = (current||{}).id;
        if (index)
            res.push(
                FeriadoWeekByState[current.estado](
                    GenerateActions.feriados(
                        current,
                        actions,
                        index,
                        'week',
                        init
                    ),
                    current,
                    index,
                    actions
                )
            );
        if (init.getDay() === 0 || init.getDate() === 1){
            end = new Date(init);
            end.setDate(end.getDate() + 6-init.getDay());
            if(init.getMonth() !== end.getMonth()){
                end.setDate(end.getDate()-end.getDate());
            }
            week.push({
                week:res,
                between:{
                    i:{
                        date:`${init.getDate()}/${init.getMonth()+1}`,
                        day:DAYS[init.getDay()]
                    },
                    e:{
                        date:`${end.getDate()}/${end.getMonth()+1}`,
                        day:DAYS[end.getDay()]
                    }
                }
            });
            res = [];
        }
        ctr+=1;
    }
    return week;
}
