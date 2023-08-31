/**
 * react basic
 */
import React, {
    Component,
    useContext,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../basic/ButtonList';
import Search from '../search/Search';
/*

let items = [
{
    title: (
        <i className="fas fa-bars" />
    )
}
];
*/
function BarraNavegacion(props) {
    const user = props.user,
        [showop,toggle] = useState(false),
        togFunc = e => {
            e.preventDefault();
            toggle(!showop);
        };
    console.log(showop)
    return (
        <div className="col-md-3 relative no-padding" style={{marginRight:"0.5%"}}>
            <button onClick={togFunc}
                className="no-background no-border margin-box small-padding text-left full-width"
                style={{
                    border:"solid 2px var(--border)",
                    borderRadius:"5px"
                }}>
                <div className="container-fluid no-padding">
                    <div className="row justify-content-between align-items-end">
                        <div className="col-md-2 align-items-center d-flex">
                            <img style={{
                                borderRadius:"50%",
                                border:"solid 2px var(--border)"
                            }}
                            src={user.usuario.foto_perfil}
                            className="h-margin"
                            height="40px"
                            width="40px"
                            alt="foto perfil"/>
                        </div>
                        <div className="col-md-6 white-font no-padding">
                            <span className="bold">{user.nombre}</span>
                            <div className="smaller-text">
                                {user.franquicia.nombre}
                            </div>
                        </div>
                        <div className="col-md-4 text-right" style={{color:"var(--border)"}}>
                            <i className={`fas small-padding fa-angle-${showop ? "up" : "down"}`}/>
                        </div>
                    </div>
                </div>
            </button>
            <div className={
                showop
                    ? "visible relative"
                    : "hidden"
                } style={{zIndex:6}}>
                <div className="arrow-up"
                    style={{marginTop:"-10px",marginLeft:"90%"}}/>
                <div style={{marginLeft:"50%"}}
                    className="white-background shadow-result half sidebar-box round-border">
                    <ul className="nav-list no-padding">
                        <li className="box-transparent full-width text-left box-padding highlight-hover bold-hover text">
                            <i className="fas small-padding fa-cog"/>
                            Configuracion
                        </li>
                        <li className="box-transparent full-width text-left box-padding highlight-hover bold-hover text">
                            <button className="box-transparent"
                            onClick={
                                e => {
                                    e.preventDefault();
                                    props.logout({err:null});
                                }
                            }>
                                <i className="fas small-padding fa-sign-out-alt"/>
                                Cerrar Sesión
                            </button>
                        </li>
                        <li className="box-transparent full-width text-left box-padding highlight-hover bold-hover text">
                            <i className="fas small-padding fa-bell"/>
                            Notificaciones
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

/*
<div className="col-md-4 no-padding text-right">
    <div style={{
        position:"relative",
        bottom:"-5px"
    }}>
        <button className="smaller-text small-margin inline-block small-margin border-box button-border box-transparent"
        style={{
            border:"solid 2px white",
            color:"white",
        }}
        onClick={
            e => false
        }>
            <img src={user.franquicia.usuario.foto_perfil} height="25px" width="25px" alt="foto perfil" className="inline-block"/>
            <p className="s-font no-margin inline-block">{user.franquicia.nombre}</p>
        </button>
        <button className="smaller-text small-margin inline-block small-margin border-box button-border box-transparent"
        style={{
            border:"solid 2px white",
            color:"white"
        }}
        onClick={
            e => {
                e.preventDefault();
                props.logout({err:null});
            }
        }>
            <i className="light-danger fas fa-sign-out-alt side-margin"></i>
            <span className="side-margin">salir</span>
        </button>
    </div>
</div>
*/


export default React.memo(BarraNavegacion);
