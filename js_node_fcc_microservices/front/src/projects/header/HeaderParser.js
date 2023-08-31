
function HeaderParser(){
    return(
        <>
            <h2 className="m-top m-bottom p-top">
                Request Header Parser Microservice
            </h2>
            <h3  className="m-bottom p-bottom">
                Endpoints:
            </h3>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[GET] - /api/whoami:</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="method-exp">
                        Returns client's IP, software and language.
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderParser;
