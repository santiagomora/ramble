const key = require('crypto').randomBytes(
    72,
    (err,buffer) => 
    {
        console.log(buffer.toString('hex'))
    }
);
