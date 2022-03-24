import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

function CommaListMemo(props) {
    const   list = Object.keys(props.list).map(
                (e,i) =>
                    <li key={i}
                        className="bold highlight-title inline-block side-margin small-v-margin smaller-text button-border border-box">
                        <Link to={`/escritorio/${props.route}/${e}`}>
                            {props.list[e]}
                        </Link>
                    </li>
            );
    return (
        <ul className="nav-list no-padding" style={{whiteSpace:"normal"}}>
            {list}
        </ul>
    )

}
export const CommaList = React.memo(CommaListMemo);
