/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import PromocionesRouting from './promociones/PromocionesRouting';
import LocalesRouting from './locales/LocalesRouting';
import ReservasRouting from './reservas/ReservasRouting';
import UbicacionesRouting from './ubicaciones/UbicacionesRouting';
import FranquiciasRouting from './franquicias/FranquiciasRouting';
import EventosRouting from './eventos/EventosRouting';
import HorariosRouting from './horarios/HorariosRouting';
import FeriadosRouting from './feriados/FeriadosRouting';
import ConfiguracionRouting from './configuracion/ConfiguracionRouting';
import EscritorioRouting from './escritorio/EscritorioRouting';

import Profile from '../app/componentes/control/Profile';
import DataHandler from '../app/hocs/DataHandler';
import BarraNavegacion from '../app/componentes/control/BarraNavegacion';


export default function Escritorio (props){
    return (
        props.auth
        ?
            <DataHandler user={props.user}
                logout={props.logout}
                {...props}>
                <BaseRouting/>
            </DataHandler>
        :
            <Redirect to={props.redirect}/>
    )
}

BaseRouting = withRouter(BaseRouting);

function BaseRouting (props) {
    return (
        <Switch>
            <Route path={props.match.url}
                exact
                render={
                    (match) =>
                        <EscritorioRouting data={props.data}
                            {...match}/>
                }/>
            <Route path={`${props.match.url}/reservas`}
                render={
                    (match) =>
                        <ReservasRouting data={props.data}
                            {...match}/>
                } />
            <Route path={`${props.match.url}/feriados`}
                render={
                    (match) =>
                        <FeriadosRouting data={props.data}
                            {...match}/>
                }/>
            <Route path={`${props.match.url}/horarios`}
                render={
                    (match) =>
                        <HorariosRouting data={props.data}
                            {...match}/>
                }/>
            <Route path={`${props.match.url}/ubicaciones`}
                render={
                    (match) =>
                        <UbicacionesRouting data={props.data}
                            {...match}/>
                } />
            <Route path={`${props.match.url}/eventos`}
                render={
                    (match) =>
                        <EventosRouting data={props.data}
                            {...match}/>

                    } />
            <Route path={`${props.match.url}/promociones`}
                render={
                    (match) =>
                        <PromocionesRouting data={props.data}
                            {...match} />
                } />
            <Route path={`${props.match.url}/locales`}
                component={
                    (match) =>
                        <LocalesRouting data={props.data}
                            {...match} />
                } />
            <Route path={`${props.match.url}/configuracion`}
                render={
                    (match) =>
                        <ConfiguracionRouting data={props.data}
                            {...match} />
                } />
            <Route path={`${props.match.url}/franquicias`}
                render={
                    (match) =>
                        <FranquiciasRouting data={props.data}
                        {...match} />
                }/>
        </Switch>
    )
}
