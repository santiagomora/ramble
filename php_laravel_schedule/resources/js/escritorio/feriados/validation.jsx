export default validation;
const validation = {
    id_evento:{
        rules:{
            required:true
        },
        fieldName:"Eventos"
    },
    fecha_feriado : {
        rules:{
            required:true,
            isDate:true
        },
        fieldName:"Fecha"
    },
    nombre:{
        rules:{
            maxLen:50,
            required:true
        },
        fieldName:"Nombre"
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
            maxLen:100,
            required:true
        },
        fieldName:"Descripción"
    },
    id_estado:{
        rules:{},
        fieldName:"Estado"
    }
};
