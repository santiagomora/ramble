const configTypes = {
    mongoose:require('./mongoose'),
    cors:require('./cors'),
    path:require('./path'),
    jwt:require('./jwt')
};

//expects a string: "ConfigName.Property"
const config = ( type ) => type.split('.').reduce(
  (t,e) => t[e],configTypes
)

module.exports = config;
