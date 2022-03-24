import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

function CardListMemo(props) {
    //props.elems is an object array with properties title and icon
    //props.elemClass is a set of classes for list
    return (
        <ul className={props.displayList}>
            {
                props.elems.map((e, i) =>
                    <li key={i} 
                        className={(e.container.class) ? e.container.class : (props.container) ? props.container : ""}
                        onClick={e.container.click}
                        data={e.container.data}>
                        <Card
                            title={e.title.data}
                            titleClass={e.title.class}
                            content={e.content.data}
                            contentClass={e.content.class}/>
                    </li>
                )
            }
        </ul>
    );
}
export const CardList = React.memo(CardListMemo);