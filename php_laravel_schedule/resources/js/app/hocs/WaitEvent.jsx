import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner'

export default function WaitEvent (props) {
    return (
        <>
        {
            (props.cond)
            ?
                <div style={{position:"fixed",top:"32%",left:"45%"}}>
                    <Loader type="TailSpin"
                        color="var(--highlight-blue)"
                        secondaryColor="Gray"
                        height={100}
                        width={100}
                        timeout={2000}/>
                </div>
            :
                props.children
        }
        </>
    )

}
