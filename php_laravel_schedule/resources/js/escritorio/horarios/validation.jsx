export default validation;
const  validation= {
    id:{
        rules:{},
        fieldName:"Id"
    },
    id_dia_semana:{
        rules:{
            required:true
        },
        fieldName:"Día Semana"
    },
    id_evento:{
        rules:{
            required:true
        },
        fieldName:"Eventos"
    },
    apertura_reserva_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora apertura de reserva"
    },
    apertura_reserva_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto apertura de reserva"
    },
    cierre_reserva_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora cierre de reserva"
    },
    cierre_reserva_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto cierre de reserva"
    },
    apertura_atencion_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora apertura atención"
    },
    apertura_atencion_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto apertura atención"
    },
    cierre_atencion_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora cierre atención"
    },
    cierre_atencion_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto cierre atención"
    },
    descripcion:{
        rules:{
            maxLen:100
        },
        fieldName:"Descripción"
    },
    id_estado:{
        rules:{},
        fieldName:"Estado"
    }
};
