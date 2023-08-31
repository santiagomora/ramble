const validation = {
    fecha_reserva: {
        rules:{
            required:true,
            isDate:true
        },
        fieldName:"Fecha"
    },
    min_fecha: {
        rules:{
            required:true,
            isDate:true
        },
        fieldName:"Fecha mínima"
    },
    id_ubicacion:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Ubicación",
        dependencies:["cantidad_personas"]
    },
    id_evento:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Ocasión",
        dependencies:["id_promocion"]
    },
    id_promocion:{
        rules:{
            numeric:true
        },
        fieldName:"Promoción"
    },
    hora_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Hora de la reserva",
        dependencies:["minuto_reserva"]
    },
    minuto_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Minuto de la reserva"
    },
    cantidad_personas:{
        rules:{
            required:true,
            numeric:true,
            minVal:1
        },
        fieldName:"Cantidad de personas"
    },
    nombre:{
        rules:{
            required:true,
            maxLen:40,
            alpha_numeric:true
        },
        fieldName:"Nombre"
    },
    apellido:{
        rules:{
            required:true,
            maxLen:40,
            alpha_numeric:true
        },
        fieldName:"Apellido"
    },
    email:{
        rules:{
            required:true,
            email:true,
            maxLen:40
        },
        fieldName:"Correo electrónico"
    },
    telefono:{
        rules:{
            required:true,
            maxLen:20,
            phone:true
        },
        fieldName:"Teléfono"
    },
    descripcion_evento:{
        rules:{},
        fieldName:"Observaciones"
    },
    fecha_reserva:{
        rules:{
            required:true
        },
        fieldName:"Fecha de la reserva"
    }
};
export default validation;
