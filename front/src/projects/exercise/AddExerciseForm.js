import {useState} from 'react';

import utils from '../../utils/utils';

import helper from '../../helper/helper';

const {POST} = utils.axios;

const {displayMessage,formatError} = helper.messagesHelper;

const {change,send,error,encodeFormData} = helper.formHelper;

const defaultForm = {
    userId:'',
    description:'',
    duration:'',
    date:''
};

const postUrl = '/exercise/add';

const appStatus = {
    message:{
        formatted:(
            <code>Create a new exercise</code>
        )
    },
    error:null
};

function formatMessage( exercise ){
    const {_id,username,duration,description,date} = exercise;
    return (
        <>
            <div>
                <code>
                    <strong>Exercise created succesfully</strong>
                </code>
            </div>
            <div>
                <code>
                    <strong>USER ID:</strong><span>{_id}</span><br/>
                    <strong>USERNAME:</strong><span>{username}</span><br/>
                    <strong>EXERCISE DURATION:</strong><span>{duration}</span><br/>
                    <strong>EXERCISE DESCRIPTION:</strong><span>{description}</span><br/>
                    <strong>EXERCISE DATE:</strong><span>{date}</span>
                </code>
            </div>
        </>
    )
}


function loadExercise( exerciseData,changeStatus ){
    POST({
        url:postUrl,
        data:encodeFormData( exerciseData )
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

function AddExerciseForm(){
    const [form,changeForm] = useState( defaultForm ),
        [status,changeStatus] = useState( appStatus );
    return (
        <form method="POST"
            style={{width:"100%"}}>
            <h5>
                <strong>Add Exercise</strong>
            </h5>
            <div>
                {displayMessage(status)}
            </div>
            <input onChange={change( changeForm,form )}
                name="userId"
                placeholder="user id*"
                className="f-width m-bottom"
                type="text"
                value={form.userId}/>
            <input onChange={change( changeForm,form )}
                name="description"
                type="text"
                placeholder="exercise description*"
                className="f-width m-bottom"
                value={form.description}/>
            <input onChange={change( changeForm,form )}
                name="duration"
                type="number"
                placeholder="exercise duration (minutes)*"
                className="f-width m-bottom"
                value={form.duration}/>
            <input onChange={change( changeForm,form )}
                name="date"
                type="date"
                format="yyyy-mm-dd"
                placeholder="exercise date"
                className="f-width m-bottom"
                value={form.date}/>
            <input onClick={send( loadExercise,form,changeStatus )}
                type="submit"
                className="m-bottom"
                value="Add exercise"/>
        </form>
    )
}

export default AddExerciseForm;
