import objHelper from './objectHelper';

import messagesHelper from './messagesHelper';

const {keys} = objHelper;

const {formatError} = messagesHelper;

function change( changeForm,form ) {
    return (e) => {
        e.preventDefault();
        const target = e.currentTarget,
            name = target.getAttribute('name'),
            value = target.value;
        form[name] = value;
        changeForm( {...form} );
    };
}

function send( load,form,changeStatus ) {
    return function( e ){
        e.preventDefault();
        load( form,changeStatus );
    };
}

function error( changeStatus ){
    return function( err ){
        const {status,data} = err.response;
        const error_data = {
            status:status,
            message:data.error ? data.error : data
        };
        changeStatus({
            message:null,
            error:{
                original: error_data,
                formatted: formatError( error_data )
            }
        })
    }
}

//  Expected object {
//      name:value
//  }
function encodeFormData( formData,hasFiles ){
    const encode = hasFiles
        ? new FormData()
        : new URLSearchParams();
    return keys( formData ).reduce(
        ( params,formKey ) => {
            params.append( formKey,formData[formKey] );
            return params;
        },
        encode
    )
}

const index = {
    change,
    send,
    error,
    encodeFormData
};

export default index;
