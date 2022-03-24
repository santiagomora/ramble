function Header( props ){
    return(
        <>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <a href="https://github.com/santiagomora/fcc-api-projects" target="_blank">
                        <code>
                            <img src="/images/github.png" height="15px" className="powered-by"/>
                            <strong className="repo">Repository by santiagomorad</strong>
                        </code>
                    </a>
                </div>
                <div className="col-md-8" style={{textAlign:"right"}}>
                    <img src="/images/nodejs.png"
                        height="20px"
                        className="powered-by"/>
                    <img src="/images/react.png"
                        height="25px"
                        className="powered-by"/>
                    <img src="/images/mongo.png"
                        height="25px"
                        className="powered-by"/>
                </div>
            </div>
        </>
    )
}

export default Header;
