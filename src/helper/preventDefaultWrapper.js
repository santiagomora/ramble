export default ( callback,paramExtract ) => 
{
    return e => 
    {
        e.preventDefault()
        callback( paramExtract(e) )
    }
}