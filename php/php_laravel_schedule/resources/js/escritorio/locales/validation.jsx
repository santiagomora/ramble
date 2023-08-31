const validation = {
    id:{
        rules:{
            required:true
        },
        fieldName:"ID"
    },
    id_usuario:{
        rules:{
            required:true
        },
        fieldName:"ID de usuario"
    },
    id_franquicia:{
        rules:{
        },
        fieldName:"Franquicia"
    },
    nombre:{
        rules:{
            required:true,
            maxLen:100
        },
        fieldName:"Nombre"
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
            maxLen:20,
            phone:true
        },
        fieldName:"Teléfono de contacto"
    },
    username: {
        rules:{
            required:true,
            maxLen:100
        },
        fieldName:"Username"
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
            maxLen:100
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
    id_provincia:{
        rules:{
            minVal:1,
            maxVal:24,
        },
        fieldName:"Provincia"
    },
    direccion_local:{
        rules:{
            maxLen:150
        },
        fieldName:"Dirección del local"
    },
    password:{
        rules:{
            required:true
        },
        fieldName:"Contraseña de usuario"
    },
};

export default validation;
