const path = require('path');

const base = path.resolve(__dirname,'..');

// base directory
const api = `${base}/api`;

// directory names
const dir_config = {
    config:{
        dirname:'config',
        entry:'config'
    },
    controllers:{
        dirname:'controllers',
        entry:'controllers'
    },
    routes:{
        dirname:'routes',
        entry:'routes'
    },
    middleware:{
        dirname:'middleware',
        entry:'middleware'
    },
    helper:{
        dirname:'helper',
        entry:'helper'
    },
    models:{
        dirname:'models',
        entry:'models'
    },
    public:{
        dirname:'public',
    },
    build:{
        dirname:'build',
    }
};

module.exports = {
    public:`${base}/${dir_config.public.dirname}`,
    config:`${base}/${dir_config.config.dirname}/${dir_config.config.entry}`,
    controllers:`${api}/${dir_config.controllers.dirname}/${dir_config.controllers.entry}`,
    routes:`${api}/${dir_config.routes.dirname}/${dir_config.routes.entry}`,
    middleware:`${api}/${dir_config.middleware.dirname}/${dir_config.middleware.entry}`,
    helper:`${api}/${dir_config.helper.dirname}/${dir_config.helper.entry}`,
    models:`${api}/${dir_config.models.dirname}/${dir_config.models.entry}`,
    build:`${base}/${dir_config.build.dirname}`
};
