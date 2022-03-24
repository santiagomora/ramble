module.exports = {
    date: ({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must be a valid date. got: ${field_value}`
    ),
    required:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} is required. got: ${field_value}`
    ),
    valid_formats:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must comply with the formats: ${rule_value.join(', ')}. got: ${field_value}`
    ),
    numeric:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must be a number. got: ${field_value}`
    ),
    integer:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must be an integer. got: ${field_value}`
    ),
    positive:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must be positive. got: ${field_value}`
    ),
    valid_url:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must be a valid url. got: ${field_value}`
    ),
    unique:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} must be unique.`
    ),
    exists:({
        field_name,
        field_value,
        rule_value
    }) => (
        `the field: ${field_name} does not exist.`
    )
}
