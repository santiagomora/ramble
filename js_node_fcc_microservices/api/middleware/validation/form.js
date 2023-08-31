const error_messages = require('./messages');

const rules = require('./rules');

const helper = require( config('path.helper') )

const {keys} = helper.objHelper;

const {promise_wrapper} = helper.asyncHelper;

// some validation methods can be asynchronous
async function validate_field({
    field_validation,
    field_value,
    field_name,
    request
}){
    const validation_keys = keys( field_validation );
    let rule_name,
        field_rules,
        has_error,
        rule_error = [];
    for( let i=0; i<validation_keys.length ;i++ ){
        rule_name = validation_keys[i];
        has_error = await rules[rule_name]({
            data:field_value,
            rule_value:field_validation[rule_name],
            request
        });
        rule_error = ( has_error )
            ? [
                ...rule_error,
                error_messages[rule_name]({
                    field_name,
                    field_value,
                    rule_value:field_validation[rule_name]
                })
            ]
            : rule_error
    }
    return rule_error;
}

//form_values is an object complying with fieldname:value format
//validation is an object with rules applied to each field under validation
async function validate_form({
    form_values,
    form_validation,
    request
}){
    const form_keys = keys( form_values ),
        res_error = {};
    let field_name,
        field_validation,
        field_value;
    for( let i=0; i<form_keys.length;i++ ){
        field_name = form_keys[i];
        res_error[field_name] = await validate_field({
            field_validation:form_validation[field_name],
            field_value:form_values[field_name],
            field_name,
            request
        });
    }
    return res_error;
}

module.exports = validate_form;
