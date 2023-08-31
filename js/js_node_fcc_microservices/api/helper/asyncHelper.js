function promise_wrapper( callback ){
    return new Promise(
        ( resolve,reject ) => {
            return resolve( callback() );
        }
    ).catch(
        e => console.error(e)
    );
}

module.exports = {
    promise_wrapper
}
