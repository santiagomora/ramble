/**
 * react basic
 */
import React, { Component, useContext,useState } from 'react';
import ReactDOM from 'react-dom';
import {withRouter,Redirect} from 'react-router-dom';
import Button from './Button';
import {Link} from 'react-router-dom';
import {Toggle} from '../input/Toggle';

export default function Actions (props) {
    const [showOptions,changeHover] = useState(false),
        buttons = props.buttons,
        links = props.links,
        format = props.overlay
        ?
            {
                overHandler: (e) => changeHover(true),
                leaveHandler: (e) => changeHover(false),
                container: "inline-block overlay-gradient full-cover",
                list: showOptions
                    ? "nav-list text-super inline-block no-padding total-center"
                    : "hidden",
                element: {
                    link: "small-margin align-center small-margin decorate-hover",
                    button: "small-margin inline-block no-padding box-transparent"
                }
            }
        :
            {
                overHandler: (e) => false,
                leaveHandler: (e) => false,
                container: "inline-block",
                list: "inline-block nav-list no-padding align-center",
                element: {
                    link: "small-margin inline-block box-transparent highlight-hover border-box button-border",
                    button: "small-margin inline-block small-margin border-box button-border box-transparent"
                }
            },
        toggle = props.toggle;
    return (
        <div className="normal">
            <div onMouseOver={format.overHandler}
                onMouseLeave={format.leaveHandler}
                className={format.container}>
                <ul className={format.list}>
                    {
                        links
                        ?
                            links.map(
                                (e,ind) => {
                                    return (
                                        <li key={ind}
                                            className= {format.element.link}>
                                            <Link to={e.to}>
                                                {e.title}
                                            </Link>
                                        </li>
                                    )
                                }
                            )
                        :
                            <></>
                    }
                    {
                        buttons
                        ?
                            buttons.length > 0
                            ?
                                buttons.map(
                                    (e,i) =>
                                        <li key={i}
                                            className={format.element.button}>
                                            <Button data={e.data}
                                                class="block no-border no-background no-padding"
                                                click={e.click}
                                                title={e.title} />
                                        </li>
                                )
                            :
                            <></>
                        :
                            <></>
                    }
                </ul>
            </div>
            {
                toggle
                ?
                    <Toggle rightTitle={toggle.left}
                        leftTitle={toggle.right}
                        side={toggle.side}
                        changeSide={toggle.change}/>
                :
                    <></>
            }
        </div>
    );
}
