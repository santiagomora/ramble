import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';

export default function DisplaysErrors (props) {
    const hasError = (props.errors||[]).length>0,
        OriginalComponent = React.cloneElement(props.children,{hasError:hasError});
    return(
        <>
            {OriginalComponent}
            {
                hasError
                ?
                    <ul className="nav-list no-padding">
                        {
                            props.errors.map(
                                (e,i) =>
                                    <li key={i}
                                        className="smaller-text error">
                                        {
                                            e.description
                                                ? e.description
                                                : e
                                        }
                                    </li>
                            )
                        }
                    </ul>
                :
                    <></>
            }
        </>
    );
}
