const path = require('path');

const base = path.resolve(__dirname,'..');

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
    models:{
        dirname:'models',
        entry:'models'
    },
    helper:{
        dirname:'helper',
        entry:'helper'
    },
    queries:{
        dirname:'queries',
        entry:'queries'
    },
    public:{
        dirname:'public',
    },
    middleware:{
        dirname:'middleware',
        entry:'middleware'
    }
};

module.exports = {
    public:`${base}/${dir_config.public.dirname}`,
    config:`${base}/${dir_config.config.dirname}/${dir_config.config.entry}`,
    controllers:`${base}/${dir_config.controllers.dirname}/${dir_config.controllers.entry}`,
    routes:`${base}/${dir_config.routes.dirname}/${dir_config.routes.entry}`,
    models:`${base}/${dir_config.models.dirname}/${dir_config.models.entry}`,
    helper:`${base}/${dir_config.helper.dirname}/${dir_config.helper.entry}`,
    queries:`${base}/${dir_config.queries.dirname}/${dir_config.queries.entry}`,
    middleware:`${base}/${dir_config.middleware.dirname}/${dir_config.middleware.entry}`
};
