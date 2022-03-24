const validate_form = require('./form');

const helper = require( config('path.helper') );

const {values} = helper.objHelper;

const {promise_wrapper} = helper.asyncHelper;

function has_errors( validation ){
    return validation.reduce(
        ( is_valid,messages ) => (
            messages.length>0
                ? true
                : is_valid
        ),
        false
    )
}

function validation_middleware( validation,method ){
    return async function( request,response,next ){
        const param_validation = await validate_form({
            form_values:request[ method ],
            form_validation:validation,
            request
        });
        return has_errors( values( param_validation ) )
            ? response.status(422).json( param_validation )
            : next();
    }
}

module.exports = validation_middleware;
