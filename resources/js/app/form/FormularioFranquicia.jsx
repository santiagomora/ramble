import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Text } from '../componentes/input/Text';
import { Select } from '../componentes/input/Select';
import Actions from '../componentes/basic/Actions';

export const FormularioFranquicia = (props) => {
    const franquicia = {
            name: "id_franquicia",
            selected: props.type.sel,
            list: props.type.list
        },
        agregar = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar
                    </div>
                ),
                to: '/franquicias/agregar',
                route:'franquicias',
                params:{}
            }
        ];
    return (
        <>
            <div className="row top-padding">
                <h6 className="highlight no-margin m-font">
                    Franquicia
                </h6>
            </div>
            <div className="row top-padding">
            <div className="col-md-12 text-left relative visible h-padding">
                <div className={
                    props.type.rol === "franquicia"
                        ? "top-padding full-width overlay"
                        : "hidden"
                    }/>
                    <Select titulo="Nombre de la franquicia"
                        changeSelect={props.change}
                        errors={props.errors.id_franquicia}
                        {...franquicia}/>
                </div>
            </div>
            {
                props.type.rol === "admin"
                ?
                    <div className="row v-padding justify-content-end">
                        <span className="smaller-text">
                            si no existe
                        </span>
                        <Actions links={agregar}/>
                    </div>
                :
                    ""
            }
        </>
    )
}
