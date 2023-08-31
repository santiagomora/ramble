import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Local from './pasos/Local';
import EventoFrame from "./pasos/evento/EventoFrame";
import Exito from "./pasos/Exito";

import Paginado from '../app/componentes/control/Paginado';

export default class Reserva extends Component {
    constructor() {
        super();
        this.state = {
            fecha: new Date(),
            navPanel: 0
        };
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.clickNavigation = this.clickNavigation.bind(this);
        this.selectOption = selectOption.bind(this);
        this.showOptions = showOptions.bind(this);
        this.panels = {
            0:"Local",
            1:"Evento",
            2:"Exito"
        };
    };

    onCalendarChange (date) {
        this.setState({
            fecha:date
        });
    }

    getPanelTitle (panelId) {
        return this.panels[panelId];
    }

    clickNavigation(e){
        e.preventDefault();
        let navPanel = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({navPanel});
    }

    render() {
        const selectHandlers = {
            showToggle:this.showOptions,
            change: this.selectOption
        };
        return (
            <div className="container">
                <div className="row">
                    <Local
                        {...selectHandlers}
                        select={this.state.select.local}
                        current={this.state.navPanel === 0}/>
                    <EventoFrame
                        {...selectHandlers}
                        displayTitles={true}
                        eventos={this.state.select.evento}
                        persona={this.state.select.personas}
                        hora={this.state.select.hora}
                        ubicacion={this.state.select.ubicacion}
                        current={this.state.navPanel === 1}
                        fecha={this.state.fecha}
                        tileDisabled={() => false}
                        dayChange = {this.onCalendarChange}
                        monthChange = {() => false}
                        navChange = {() => false}/>
                    <Exito current={this.state.navPanel === 2}/>
                </div>
                <Paginado
                    leftData={this.state.navPanel-1}
                    rightData={this.state.navPanel+1}
                    current={this.state.navPanel}
                    pages ={this.panels}
                    click={this.clickNavigation}
                    enableMaxSides={true}/>
            </div>
        );
    }
}
