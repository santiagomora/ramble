import {useState} from 'react';

import utils from '../../utils/utils';

import helper from '../../helper/helper';

const {POST,API_BASE} = utils.axios;

const {displayMessage,formatError} = helper.messagesHelper;

const {change,send,error,encodeFormData} = helper.formHelper;

const postUrl = '/shorturl/new';

const appStatus = {
    message:{
        formatted:(
            <code>No URL sent</code>
        )
    },
    error:null
};

const defaultForm = {
    url:'https://www.freecodecamp.org'
};

function formatMessage({original_url,access_url}){
    return (
        <>
            <div>
                <code>
                    Processed URL <strong>{original_url}</strong>.
                </code>
            </div>
            <div>
                <code>
                    Access using: <a href={access_url} target="_blank">{access_url}</a>
                </code>
            </div>
        </>
    )
}

function loadUrl( urlData,changeStatus ){
    POST({
        url:postUrl,
        data:encodeFormData( urlData )
    }).then(
        (res) => {
            const {original_url,short_url} = res.data;
            const access_url = `${API_BASE}/shorturl/${short_url}`;
            changeStatus({
                    error:null,
                message:{
                    original: res.data,
                    formatted: formatMessage({original_url,access_url})
                }
            });
        }
    ).catch(
        error( changeStatus )
    );
}

function UrlForm(){
    const [form,changeForm] = useState( defaultForm ),
        [status,changeStatus] = useState( appStatus );
    return (
        <div className="col-md-8" style={{textAlign:"center"}}>
            <form method="POST"
                style={{width:"100%"}}>
                <div>
                    {displayMessage(status)}
                </div>
                <label style={{
                    marginRight:"10px",
                    verticalAlign:"middle",
                    textAlign:"left "
                }}>
                    <h5>
                        <strong>
                            Enter a URL <br/>
                            to be shortened:
                        </strong>
                    </h5>
                </label>
                <input style={{margin:"0px 10px 10px 0px"}}
                    onChange={change( changeForm,form )}
                    type="text"
                    name="url"
                    value={form.url}/>
                <input onClick={send( loadUrl,form,changeStatus )}
                    type="submit"
                    value="Send URL"/>
            </form>
        </div>
    )
}

export default UrlForm;
