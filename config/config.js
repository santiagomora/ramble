const configTypes = {
    path:require('./path'),
    app:require('./app'),
    api:require('./api'),
    mongoose:require('./mongoose'),
    cors:require('./cors'),
    storage:require('./storage')
};

//expects a string: "ConfigName.Property"
const config = ( type ) => type.split('.').reduce(
  (t,e) => t[e],configTypes
)

module.exports = config;
