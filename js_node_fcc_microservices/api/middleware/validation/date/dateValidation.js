module.exports = {
    format:{
        required:true,
        valid_formats:[
            '^d-m-y$',
            '^m-d-y$',
            '^y-m-d$',
            '^y-d-m$'
        ]
    },
    date:{
        required:true,
        valid_formats:[
            '\\d{1,2}-\\d{1,2}-\\d{1,4}',
            '\\d{1,4}-\\d{1,2}-\\d{1,2}'
        ]
    }
};
