export const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    eventos:{
        rules:{},
        fieldName:"Eventos",
        casting:"array"
    },
    descuento:{
        rules:{
            maxVal:100,
            minVal:0
        },
        fieldName:"Descuento",
        casting:"integer"
    },
    descripcion:{
        rules:{
            maxLen:50
        },
        fieldName:"Descripción"
    },
    nombre:{
        rules:{
            maxLen:50,
            required:true
        },
        fieldName:"Nombre"
    },
    id_usuario:{
        rules:{},
        fieldName:"ID del usuario",
        casting:"integer"
    },
    scope:{
        rules:{},
        fieldName:"Estado",
        casting:"integer"
    },
};
export default validation;