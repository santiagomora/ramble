/**
 * react basic
 */
import React, {
    Component,
    useState,
    useEffect,
    useRef
} from 'react';
import DisplaysErrors from '../../hocs/DisplaysErrors';
import ReactDOM from 'react-dom';


const noMemoMultipleSelect = (props) => {
    const   hasError = props.hasError,
            [show,toggle] = useState(false),
            [term,updateSearch] = useState(""),
            selected = props.selected,
            input = useRef(null),
            options = Object.keys(props.optionData),
            selectedArray = selected.split(',');

    useEffect(
        () => {
            if (show)
                setTimeout(() => input.current.focus(),0)
        }, [show]
    );

    return (
        <div    className="relative"
                style={
                    show
                        ? { zIndex: 2 }
                        : { zIndex: 0 }
                }>
            <ul className="nav-list no-padding full-width justify-text">
                {
                    selected !== ""
                    ?
                        selectedArray.map(
                            (e,i) => (
                                <li key={i}
                                    className="bold highlight-title inline-block side-margin small-v-margin smaller-text button-border border-box">
                                    <i  value={selected.replace(new RegExp(`${e},|${e}|,${e}$`,'gi'),'')}
                                        name={props.name}
                                        onClick={props.change}
                                        className="fas fa-times pointer"
                                        style={{
                                            color: "#bfbfbf",
                                            paddingRight:"5px"
                                        }} />
                                    {props.optionData[e]}
                                </li>
                            )
                        )
                    : <></>
                }
            </ul>
            <select name={props.name}
                    className="hidden"
                    disabled={props.readOnly}>
                <option defaultValue={selected}/>
            </select>
            <label  htmlFor={props.name}
                    className="select inherit-width">
                <div    className={
                            (show)
                                ? "full-width flex-row relative"
                                : "full-width relative border-bottom flex-row"
                        }
                        onClick={
                            (show)
                                ? () => false
                                : () => toggle(!show)
                        }
                        select={props.name}>
                    <div className="select-title v-padding">
                        <span className={
                                (show)
                                    ? "hidden"
                                    : ""
                            }>
                            {
                                (props.selected.length>0)
                                    ? `${selectedArray.length} ${props.fieldName} seleccionados`
                                    : props.titulo
                            }
                        </span>
                        <input  type="text"
                                defaultValue={""}
                                ref={input}
                                onChange = {e => updateSearch(e.currentTarget.value)}
                                className={
                                    (show)
                                        ? ""
                                        : "hidden"
                                }
                                select={props.name} />
                    </div>
                    <div className="margin-left v-align-center">
                        <i  onClick={() => toggle(!show)}
                            className={
                                (show)
                                    ? "fas fa-times"
                                    : "fas fa-angle-down"
                            }
                            style={{ color: "#bfbfbf" }}/>
                    </div>
                </div>
                <div className="absolute full-width">
                    <ul className={
                        (show)
                            ? "option-list box-shadow max-height"
                            : "hidden"
                        }>
                        {
                            options.reduce(
                                (tot, e, ind) => {
                                    const   exists = selected.match(e),
                                            value = selected !== ""
                                                ? `${selected},${e}`
                                                : `${e}`,
                                            element =
                                                <li key={ind}
                                                    value={
                                                        exists
                                                            ? selected.replace(new RegExp(`${e}\,|${e}`,'gi'),'')
                                                            : value
                                                    }
                                                    name={props.name}
                                                    onClick={props.change}
                                                    className={
                                                        exists
                                                            ? "option selected"
                                                            : "option"
                                                    }>
                                                    {props.optionData[e]}
                                                </li>;
                                    if (term){
                                        const search = props.optionData[e].toString(),
                                            el = search.match(new RegExp(term,'gi'))
                                                ? element
                                                : null;
                                        if (el)
                                            tot.push(el);
                                    }else
                                        tot.push(element);
                                    return tot;
                                }, []
                            )
                        }
                    </ul>
                </div>
            </label>
        </div>
    );
}

const MultiSelect = React.memo(noMemoMultipleSelect);

export const MultipleSelect = (props) => (
    <DisplaysErrors errors = {props.errors}>
        <MultiSelect    change={props.changeSelect}
                        name= {props.name}
                        selected= {props.selected}
                        fieldName={props.fieldName}
                        titulo={props.titulo}
                        optionData={props.optionData}/>
    </DisplaysErrors>
);
