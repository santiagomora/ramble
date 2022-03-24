const path = require('path');

module.exports = {
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'front/index.js');
        paths.appSrc = path.resolve(__dirname, 'front');
        return paths;
    },
}
