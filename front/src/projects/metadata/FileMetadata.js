import FileForm from './FileForm';

function FileMetadata(){
    return(
        <>
            <h2 className="m-top m-bottom p-top">
                File Analysis Microservice
            </h2>
            <div className="row m-bottom p-top justify-content-center">
                <div className="col-md-10">
                    <div className="method-exp">
                        <FileForm/>
                    </div>
                </div>
            </div>
            <h3  className="m-bottom p-bottom">
                Endpoints:
            </h3>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[POST] - /api/fileanalyse:</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="method-exp">
                        Returns file analysis
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileMetadata;
