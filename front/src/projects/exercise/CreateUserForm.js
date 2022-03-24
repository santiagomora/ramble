import {useState} from 'react';

import utils from '../../utils/utils';

import helper from '../../helper/helper';

const {POST} = utils.axios;

const {displayMessage,formatError} = helper.messagesHelper;

const {change,send,error,encodeFormData} = helper.formHelper;

const defaultForm = {
    username:''
};

const postUser = '/exercise/new-user';

const appStatus = {
    message:{
        formatted:(
            <code>Create a new user</code>
        )
    },
    error:null
};


function formatMessage(user){
    const {_id,username} = user;
    return (
        <>
            <div>
                <code>
                    <strong>User created succesfully</strong>
                </code>
            </div>
            <div>
                <code>
                    <strong>ID:</strong><span>{_id}</span><br/>
                    <strong>USERNAME:</strong><span>{username}</span>
                </code>
            </div>
        </>
    )
}

function loadUser( formData,changeStatus ){
    POST({
        url:postUser,
        data:encodeFormData( formData )
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

function UrlForm(){
    const [form,changeForm] = useState( defaultForm ),
        [status,changeStatus] = useState( appStatus );
    return (
        <form method="POST"
            style={{width:"100%"}}>
            <h5>
                <strong>Create a new user</strong>
            </h5>
            <div>
                {displayMessage(status)}
            </div>
            <input onChange={change( changeForm,form )}
                name="username"
                type="text"
                placeholder="username*"
                className="f-width m-bottom"
                value={form.username}/>
            <input onClick={send( loadUser,form,changeStatus )}
                type="submit"
                className="m-bottom"
                value="Create user"/>
        </form>
    )
}

export default UrlForm;
