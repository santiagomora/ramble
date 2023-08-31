import React, {
    Component,
    useState,
    useContext,
    useRef,
    useEffect
 } from 'react';
import {withRouter} from 'react-router';
import {MONTHS} from '../../constantes/DaysMonths';
import {Select} from '../input/Select';
import ButtonList from '../basic/ButtonList';
import Search from '../search/Search';

const generateYears = () => (
    Array.from(Array(100).keys()).reduce(
        (t,x) => {
            t[1970+x] = 1970+x;
            return t;
        },{}
    )
);

export default function Navigation (props){
    const month = {
            name: "month",
            selected: props.date.getMonth(),
            list: MONTHS
        },
        year = {
            name: "year",
            selected: props.date.getFullYear(),
            list:generateYears()
        };
    return (
        <div className="container-fluid no-padding">
            <div className="row">
                <div className="col-md-4">
                    <div className="inline-block margin-box text-super v-padding m-font ">
                        Mostrando
                    </div>
                    <div className="inline-block margin-box thirty">
                        <Select titulo="mes"
                            changeSelect={props.changeMonth}
                            errors={[]}
                            {...month}/>
                    </div>
                    <div className="inline-block margin-box text-super v-padding m-font ">
                        de
                    </div>
                    <div className="inline-block margin-box twenty">
                        <Select titulo="año"
                            changeSelect={props.changeYear}
                            errors={[]}
                            {...year}/>
                    </div>
                </div>
                <div className="col-md-4 flex h-center">
                {
                    !props.hide
                    ?
                            <ButtonList selected = {props.show}
                                selectedClass="blue-background highlight-border small-v-padding"
                                clickHandler={props.changeView}
                                displayList="flex-row nav-list no-padding align-center"
                                elemClass="background-border highlight-hover small-v-padding bordered"
                                elems={props.controls} />
                    :
                        <></>
                }
                </div>
                <div className="col-md-4 flex">
                    <Search route={props.route}/>
                </div>
            </div>
        </div>
    )
}
