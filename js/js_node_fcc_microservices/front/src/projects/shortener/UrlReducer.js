import UrlForm from './UrlForm';

function UrlReducer(props){
    return(
        <>
            <h2 className="m-bottom">
                URL Reducer Microservice
            </h2>
            <div className="m-bottom" style={{height:"15px"}}/>
            <div className="row justify-content-center">
                <UrlForm />
            </div>
            <div className="m-bottom" style={{height:"15px"}}/>
            <h3 className="m-bottom p-bottom">
                Endpoints:
            </h3>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[GET] - /api/shorturl/{"{number}"}:</strong></code>
                    </h4>
                    <div className="method-exp">
                        Returns the url associated with number if it exists.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[POST] - /api/shorturl/new:</strong></code>
                    </h4>
                    <div className="method-exp">
                        Creates new shortened URL if not exists. If it does, returns json with corresponding information.
                    </div>
                </div>
            </div>
        </>
    )
}

export default UrlReducer;
