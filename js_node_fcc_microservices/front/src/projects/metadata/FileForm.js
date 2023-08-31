import {useState,useRef} from 'react';

import utils from '../../utils/utils';

import helper from '../../helper/helper';

const {POST} = utils.axios;

const {displayMessage,formatError} = helper.messagesHelper;

const {change,send,error,encodeFormData} = helper.formHelper;

const defaultForm = {
    upfile:''
};

const postFile = '/fileanalyse';

const appStatus = {
    message:{
        formatted:(
            <code>Upload file</code>
        )
    },
    error:null
};

function formatMessage( res ){
    const {name,size,type} = res;
    return (
        <>
            <div>
                <code>
                    <strong>FILE METADATA</strong>
                </code>
            </div>
            <div>
                <code><strong>FILE NAME:</strong>{name}</code><br/>
                <code><strong>MIME TYPE:</strong>{type}</code><br/>
                <code><strong>SIZE [BYTES]:</strong>{size}</code>
            </div>
        </>
    )
}

function loadFile( formData,changeStatus ){
    POST({
        url:postFile,
        data:encodeFormData( formData,true )
    }).then(
        (res) => {
            changeStatus({
                error:null,
                message:{
                    original: res.data,
                    formatted: formatMessage(res.data)
                }
            });
        }
    ).catch(
        error( changeStatus )
    );
}

function changeFile( input,changeForm,form ){
    return (e) => {
        e.preventDefault();
        form.upfile = input.current.files[0];
        changeForm( {...form} );
    }
}

function UrlForm(){
    const [form,changeForm] = useState( defaultForm ),
        [status,changeStatus] = useState( appStatus ),
        fileInput = useRef(null),
        dropFileInput = useRef(null);
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form method="POST"
                        style={{textAlign:"center",width:"100%"}}>
                        <h5>
                            <strong>Upload a file</strong>
                        </h5>
                        <div>
                            {displayMessage(status)}
                        </div>
                        <input name="upfile"
                            type="file"
                            ref={fileInput}
                            placeholder="select file"
                            style={{textAlign:"center"}}
                            onChange={changeFile( fileInput,changeForm,form )}
                            className="f-width m-bottom"/>
                        <input onClick={send( loadFile,form,changeStatus )}
                            type="submit"
                            className="m-bottom"
                            value="Upload file"/>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default UrlForm;



/*
<div className="col-md-6">
    <form method="POST"
        style={{width:"100%"}}>
        <h5>
            <strong>... Or drop it over here</strong>
        </h5>
        <div>
            {displayMessage( status,changeForm,form )}
        </div>
        <input name="upfile"
            type="file"
            ref={dropFileInput}
            onChange={changeFile(dropFileInput)}
            placeholder="select file"
            className="f-width m-bottom"/>
        <input onClick={send( loadFile,form,changeStatus )}
            type="submit"
            className="m-bottom"
            value="Upload file"/>
    </form>
</div>

*/
