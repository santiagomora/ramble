import React,{useState} from 'react';
import Conditional from './Conditional'

export default function({
    showByDefault,
    children,
    customWrapClasses,
    toggleDisplayStyle,
    alternative,
    extraButtons
})
{
    const {
        onHideTitle,
        onDisplayTitle,
        onHideClasses,
        onDisplayClasses
    } = toggleDisplayStyle


    const [display,toggleDisplay] = useState(showByDefault===undefined ? true : showByDefault);

    const toggleComponent = e => {
        e.preventDefault();
        toggleDisplay(
            prevState => toggleDisplay(!prevState)
        )
    }

    return(
        <>
            <div className={customWrapClasses||"text-right"}>
                <button
                    onClick={toggleComponent}
                    className={display ? onDisplayClasses : onHideClasses}
                >
                    {display ? onDisplayTitle : onHideTitle}
                </button>
                {extraButtons||""}
            </div>
            <Conditional
                condition={display}
                alternative={alternative||<></>}
            >
                {children}
            </Conditional>
        </>
    )
}
