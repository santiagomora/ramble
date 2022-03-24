import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DAYS,MONTHS} from '../../constantes/DaysMonths';
import {ExpandableComponent} from '../../hocs/ExpandableComponent';
import {generateWeek,generateMonth} from '../../generators/feriadoGenerator';

function FeriadoMonthView(props) {
    let month = props.date.getMonth();
    let weeks = generateMonth(
        props.date,
        props.data,
        props.actions
    );
    return (
        <>
            <div className="container-fluid justify full-width flex-row nav-list ">
                {
                    DAYS.map(
                        (e, i) =>
                            <div key={i}
                                className="box-padding same-width box-transparent mid-font highlight-title text-center">
                                {e}
                            </div>
                    )
                }
            </div>
            <div className="container-fluid">
                {
                    weeks.map(
                        (e, i) =>
                            <div key={i}
                                className="row">
                                <ul className="justify no-padding full-width flex-row nav-list h-center">
                                    {
                                        e.map(
                                            (elem,index) =>
                                                <li key={index} className={elem.class}>{elem.content}</li>
                                        )
                                    }
                                </ul>
                            </div>
                    )
                }
            </div>
        </>
    );
}


function FeriadoWeekView(props) {
    const week = generateWeek(
        props.date,
        props.data,
        props.actions
    );
    return (
        <div className="container-fluid">
        {
            week.map(
                (e,i)=> {
                    const title = (
                            <div className="mid-title full-width bold">
                                {`Semana ${i+1}`}
                                <span className="text ms-font line-v-middle">
                                    <span className="margin-box">{`${e.week.length||""} entre el ${e.between.i.day}`}</span>
                                    <span className="bold margin-box highlight">{e.between.i.date}</span>
                                    <span className="margin-box">{`y el ${e.between.e.day}`}</span>
                                    <span className="bold margin-box highlight">{e.between.e.date}</span>
                                </span>
                            </div>
                        ),
                        side = e.estado === 'Laboral' ? 1 : 2;
                    return  (
                        <div className="row v-padding no-h-padding border-bottom col-md-12" key={i}>
                        {
                            e.week.length>0
                            ?
                                <ExpandableComponent title = {title}>
                                {
                                    e.week.map(
                                        (elem,index) =>
                                            <div key={index} className={`row ${elem.class}`}>
                                                <elem.content/>
                                            </div>
                                    )
                                }
                                </ExpandableComponent>
                            :
                                <div className="v-padding">
                                    {title}
                                </div>
                        }
                        </div>
                    )
                }
            )
        }
        </div>
    );
}


export default function FeriadoView (props) {
    const elems = {
        1: (props) => (
            <FeriadoMonthView actions={ props.actions}
                date={ props.data.date}
                data={ props.data.data}/>
        ),
        2: (props) => (
            <FeriadoWeekView date={ props.data.date}
                data={ props.data.data}
                actions={ props.actions}/>
        )
    };
    return elems[props.show](props);
}
