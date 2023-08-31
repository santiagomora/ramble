import React,
    {
        Component,
        useState,
        useRef
    } from 'react';
import ReactDOM from 'react-dom';
import DisplaysErrors from '../../hocs/DisplaysErrors'

const noMemoSelect = (props) => {
    const   hasError = (props.errors||[]).length>0,
            selected = props.selected.toString(),
            input = useRef(null),
            [show,toggle] = useState(false),
            [term,updateSearch] = useState(""),
            showCallback = (e) => {
                toggle(true);
                updateSearch(props.list[selected]||"");
                setTimeout(()=>input.current.focus(),10)
            };
    return(
        <div
            className="relative"
            style={
                show
                ? { zIndex: 2 }
                : { zIndex: 0}}>
            <select
                name={props.name}
                className="hidden"
                disabled ={props.readOnly}>
                <option defaultValue={selected}></option>
            </select>
            <label
                htmlFor={props.name}
                className="select inherit-width">
                <div className={
                    (show)
                        ? "full-width flex-row relative"
                        :
                        hasError
                            ? "full-width relative border-bottom flex-row error-box"
                            : "full-width relative border-bottom flex-row"
                    }
                    onClick={showCallback}
                    select={ props.name}>
                    <div className={"select-title v-padding"}  style={{overflow:"hidden"}}>
                        <span className={(show) ? "hidden" : ""}>
                        {
                            (selected)
                                ? props.list[selected]
                                :   <span style={{color:"gray"}}>
                                        {props.titulo}
                                    </span>
                        }
                        </span>
                        <input  type="text"
                                defaultValue={term}
                                ref={input}
                                onFocus = {e => updateSearch("")}
                                onChange = {e => updateSearch(e.currentTarget.value)}
                                onBlur={() => toggle(false) }
                                className={
                                    (show)
                                        ? "small-v-padding"
                                        : "hidden"
                                }/>
                    </div>
                    <div className="margin-left v-align-center">
                        <i className={
                            (show)
                                ? "fas fa-search"
                                : "fas fa-angle-down"
                            }
                            style={hasError ? { color:"var(--danger)"} : { color:"#bfbfbf"}}/>
                    </div>
                </div>
                <div className="absolute full-width">
                    <ul
                        className={
                            (show)
                                ? "option-list box-shadow max-height"
                                : "hidden"
                        }>
                        {
                            Object.keys(props.list).reduce(
                                function (tot,ind) {
                                    const element = (
                                        <li key={ind}
                                            name={props.name}
                                            value={ind == selected ? "" : ind}
                                            needsvalue={0}
                                            onMouseDown={
                                                (e) => {
                                                    toggle(false);
                                                    props.changeSelect(e)
                                                }
                                            }
                                            className={
                                                (ind == selected)
                                                    ? "option selected"
                                                    : "option"
                                            }>
                                            {props.list[ind]}
                                        </li>
                                    );
                                    if (term){
                                        const search = props.list[ind].toString(),
                                            el = search.match(new RegExp(term,'gi'))
                                                ? element
                                                : null;
                                        if (el)
                                            tot.push(el);
                                    }else
                                        tot.push(element);
                                    return tot;
                                },[]
                            )
                        }
                    </ul>
                </div>
            </label>
            {
                hasError
                ?
                    <ul className="nav-list no-padding">
                        {
                            props.errors.map(
                                (e,i) => <li key={i} className="smaller-text error">{e.description}</li>
                            )
                        }
                    </ul>
                :
                    <></>
            }
        </div>
    );
}

const SelectMemo = React.memo(noMemoSelect);

export const Select = (props) => (
    <DisplaysErrors errors = {props.errors}>
        <SelectMemo     name={props.name}
                        selected={props.selected}
                        list={props.list}
                        titulo={props.titulo}
                        changeSelect={props.changeSelect}/>
    </DisplaysErrors>
);
