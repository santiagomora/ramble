import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Text } from '../componentes/input/Text';
import { Select } from '../componentes/input/Select';

const provincias = {
    1: "Provincia de Buenos Aires",
    2: "Capital Federal",
    3: "Catamarca",
    4: "Chaco",
    5: "Chubut",
    6: "Córdoba",
    7: "Corrientes",
    8: "Entre Ríos",
    9: "Formosa",
    10: "Jujuy",
    11: "La Pampa",
    12: "La Rioja",
    13: "Mendoza",
    14: "Misiones",
    15: "Neuquén",
    16: "Río Negro",
    17: "Salta",
    18: "San Juan",
    19: "San Luis",
    20: "Santa Cruz",
    21: "Santa Fé",
    22: "Santiago del Estero",
    23: "Tierra del Fuego",
    24: "Tucumán"
}

export const FormularioUbicacion = (props)  => {
    const provincia = {
        name: "id_provincia",
        selected: props.fields.id_provincia,
        list: provincias
    };
    return (
        <div className="row v-padding">
            <div className="col-md-6">
                <h6 className="highlight no-margin m-font">
                    Provincia
                </h6>
                <Select titulo="Selecciona la provincia"
                    changeSelect={props.change}
                    errors={props.errors.id_provincia}
                    {...provincia}/>
            </div>
            <div className="col-md-6">
                <Text rows={4}
                    titulo="Dirección del local"
                    name="direccion_local"
                    holder="Dirección hasta 150 caracteres"
                    errors={props.errors.direccion_local}
                    value={props.fields.direccion_local}
                    changeHandler={props.change}/>
            </div>
        </div>
    )
}
