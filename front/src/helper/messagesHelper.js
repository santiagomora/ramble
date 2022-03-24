import objectHelper from "./objectHelper";

const {keys} = objectHelper;

function displayMessage( {message,error} ){
    const display = error
        ? error
        : message;
    return display.formatted;
}

function formatError({status,message}){
    console.log(message);
    return(
        <>
            <div>
                <code>
                    Error status:<strong>{status}</strong>.
                </code>
            </div>
            <div>
                <div>
                    <code>
                        <strong>Messages:</strong>
                    </code>
                </div>
                {
                    typeof message === "object" && status===422
                        ? keys( message ).map(
                            (e,i) => (
                                <div key={i}>
                                    {
                                        message[e].length>0
                                        ?
                                            <>
                                                <code>
                                                    <strong>{e.toUpperCase()}:</strong>
                                                </code>
                                                <ul style={{listStyleType:"square"}}>
                                                {
                                                    message[e].map(
                                                        (r,t) => (
                                                            <li key={t}>
                                                                <code>{r}</code><br/>
                                                            </li>
                                                        )
                                                    )
                                                }
                                                </ul>
                                            </>
                                        : ""

                                    }
                                </div>
                            )
                        )
                        : message
                }
            </div>
        </>
    )
}

const index = {
    formatError,
    displayMessage
};

export default index;
