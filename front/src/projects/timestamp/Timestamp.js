function Timestamp( props ){
    return(
        <>
            <h2 className="m-top m-bottom p-top">
                Timestamp API Microservices
            </h2>
            <h3  className="m-bottom p-bottom">
                Endpoints:
            </h3>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[GET] - /api/timestamp/{"{epoch}"}</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row method-exp">
                <div className="col-md-6">
                    <h5>
                        <code><strong>{"{epoch}"}:</strong> Valid unix epoch timestamp [Integer]</code>
                    </h5>
                    <div>returns date considering {"{epoch}"} as the timestamp</div>
                </div>
                <div className="col-md-6">
                    <h5>
                        <code><strong>{"{epoch}"}:</strong> Empty</code>
                    </h5>
                    <div>returns current date</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[GET] - /api/timestamp/{"{date}"}/{"{format}"}</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row method-exp">
                <div className="col-md-6">
                    <h5>
                        <code><strong>{"{date}"}:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        [dd,int]-[mm,int]-[yyyy,int]
                    </div>
                    <h5>
                        <code><strong>{"{format}"}:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        d-m-y [case insensitive]<br/>m-d-y [case insensitive]
                    </div>
                </div>
                <div className="col-md-6">
                    <h5>
                        <code><strong>{"{date}"}:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        [yyyy,int]-[dd,int]-[mm,int]
                    </div>
                    <h5>
                        <code><strong>{"{format}"}:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        y-m-d [case insensitive]<br/>y-d-m [case insensitive]
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timestamp;
