const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    nombre:{
        rules:{
            required:true,
            maxLen:100,
        },
        fieldName:"Nombre de la franquicia"
    },
    correo_contacto:{
        rules:{
            required:true,
            maxLen:100,
            email:true
        },
        fieldName:"Correo de contacto"
    },
    telefono_contacto:{
        rules:{
            required:true,
            maxLen:20
        },
        fieldName:"Teléfono de contacto"
    },
    username: {
        rules:{
            required:true,
            maxLen:100
        },
        fieldName:"Nombre de Usuario"
    },
    email: {
        rules:{
            required:true,
            email:true,
            maxLen:100
        },
        fieldName:"Email de usuario"
    },
    razon_social:{
        rules:{
            required:true,
            maxLen:100,
        },
        fieldName:"Razón Social"
    },
    cuit_cuil:{
        rules:{
            required:true,
            maxLen:11,
            minLen:11
        },
        fieldName:"CUIT/CUIL del local"
    },
    password:{
        rules:{},
        fieldName:"Contraseña de usuario"
    }
};
export default validation;
