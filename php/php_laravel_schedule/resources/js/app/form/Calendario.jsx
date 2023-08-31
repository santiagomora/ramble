import React, {
    Component,
    useState,
    useEffect,
    useRef
} from 'react';
import {
    DAYS,
    MONTHS
} from '../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

function CalendarioMemo(props) {
    const   today = new Date(props.date),
            [dateEvent,changeDate]  = useState({event:null,dt:today}),
            frst = useRef(true),
            inputRef = useRef(null),
            changeDay = (date) => {
                changeDate({
                    event:  new Event('change',{
                                bubbles: true
                            }),
                    dt: date,
                    fetch:false
                });
            },
            tileDisabled = ({
                activeStartDate,
                date,
                view
            }) => {
                let disableByDate = false;
                if (props.editar)
                    disableByDate =
                        today.getDate() < date.getDate()
                        || today.getDate() > date.getDate();

                else
                    disableByDate = view === 'month'
                        ? props.data.feriados[date.getDate()]
                        : date.getMonth() < activeStartDate.getMonth()
                            || date.getFullYear() < activeStartDate.getFullYear();

                return disableByDate;
            },
            monthChange = (date) => {
                changeDate({
                    event:  new Event('change',{
                                bubbles: true
                            }),
                    dt: date,
                    fetch:true
                });
            },
            navChange = ({
                activeStartDate,
                view
            }) => {
                const tday = new Date(),
                    date = tday.getDate() > activeStartDate.getDate()
                    && tday.getMonth() === activeStartDate.getMonth()
                    && tday.getFullYear() === activeStartDate.getFullYear()
                        ? tday
                        : activeStartDate;
                changeDate({
                    event:  new Event('change',{
                                bubbles: true
                            }),
                    dt: date,
                    fetch:true
                });
            };

    useEffect(
        () => {
            if (!frst.current) {
                if (dateEvent.fetch)
                    props.fetch(
                        {date:dateEvent.dt},
                        () => inputRef.current.dispatchEvent(dateEvent.event)
                    )
                else
                    inputRef.current.dispatchEvent(dateEvent.event)
            } else
                frst.current = false;
        },
        [dateEvent]
    );
    return (
        <>
            <input readOnly
                type="date"
                value={dateEvent.dt}
                onChange={props.change}
                name="fecha_feriado"
                ref={inputRef}
                className="hidden" />
            <Calendar showNavigation={!props.editar}
                tileClassName='relative'
                showNeighboringMonth={false}
                value={
                    props.editar
                        ? today
                        : dateEvent.dt
                }
                minDate={props.editar ? null : new Date()}
                onClickDay={
                    props.editar
                        ? () => false
                        : (date) => changeDay(new Date(date))
                }
                onClickMonth={monthChange}
                tileDisabled={tileDisabled}
                onActiveDateChange={navChange} />
        </>
    );
}

export const Calendario = React.memo(CalendarioMemo)
