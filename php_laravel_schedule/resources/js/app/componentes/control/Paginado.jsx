/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../basic/ButtonList';

function Paginado(props) {
    let s = parseInt(props.current);
    let pages = Object.keys(props.pages);
    let panelList = [];
    let leftOperators = [];
    let rightOperators = [];
    
    if (props.enableMaxSides) {
        leftOperators = [
            {
                title: (
                    <i className="fa fa-angle-double-left"/>
                ),
                data: "0",
                disabled: s === 0
            },
            {
                title: (
                    <i className="fa fa-angle-left" />
                ),
                data: props.leftData.toString(),
                disabled: s === 0
            }
        ];
        rightOperators = [
            {
                title: (
                    <i className="fa fa-angle-right" />
                ),
                data: (s + 1).toString(),
                disabled: s === pages.length - 1
            },
            {
                title: (
                    <i className="fa fa-angle-double-right" />
                ),
                data: pages.length - 1,
                disabled: s === pages.length - 1
            }
        ];
    }else{
        leftOperators = [
            {
                title: (
                    <i className="fa fa-angle-left" />
                ),
                data: props.leftData.toString(),
                title: (props.leftTitle) ? props.leftTitle : "",
                container: "half text-left"
            }
        ];
        rightOperators = [
            {
                title: (
                    <i className="fa fa-angle-right" />
                ),
                data: props.rightData.toString(),
                title: (props.rightTitle) ? props.rightTitle : "",
                container:"half text-right"
            }
        ];
    }
    if (pages.length > 0){
        panelList = pages.map(
            function(e, i){
                return {
                    title: props.pages[e],
                    data: pages[e],
                    class: (props.current == e) ? "box-padding pointer highlight-nav nav-reserva" : "pointer highlight-hover box-padding nav-reserva text"
                }
            }
        );
    }

    return (
        <div>
            <ButtonList 
                container="half"
                clickHandler={props.click} 
                displayList="nav-list flex-row" 
                elemClass="light-danger nav-reserva pointer" 
                elems={[...leftOperators, ...panelList, ...rightOperators]} />
        </div>
    );
}
export default React.memo(Paginado);
