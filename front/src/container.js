function Container( props ){
    return(
        <div className="App">
            <div className="container-fluid"
                style={{
                    padding:"0px"
                }}>
                { props.children }
            </div>
        </div>
    );
}

export default Container;
