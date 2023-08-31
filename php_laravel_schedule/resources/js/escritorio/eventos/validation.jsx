
export default  {
    id:{
        rules:{},
        fieldName:"ID",
        casting:"integer"
    },
    id_usuario:{
        rules:{},
        fieldName:"ID del usuario",
        casting:"integer"
    },
    promociones:{
        rules:{},
        fieldName:"Promociones",
        casting:"array"
    },
    horarios:{
        rules:{
            required:true
        },
        fieldName:"Horarios",
        casting:"array"
    },
    feriados:{
        rules:{},
        fieldName:"Feriados",
        casting:"array"
    },
    descripcion:{
        rules:{
            maxLen:100,
            required:true
        },
        fieldName:"Descripción"
    },
    nombre:{
        rules:{
            maxLen:45,
            required:true
        },
        fieldName:"Nombre"
    },
    scope:{
        rules:{
            required:true
        },
        fieldName:"Estado",
        casting:"integer"
    }
};

export const addFormFields = (data) => {
    console.log(data)
    return {
        id_usuario:user.id,
        promociones:'',
        horarios:'',
        feriados:'',
        descripcion:'',
        nombre:'',
        scope:1
    };
}

export const editFormFields = (data) => {
    console.log(data)

}
