import {useState} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {ToggleComponent,Container} from '../../composition/composition'

function Validation({textLength})
{
    return (
        <>
            <span className="px-2">{`text length:${textLength}`}</span>
            {

                textLength>5
                    ? <span>Text is long enough</span>
                    : <span>Text is too short</span>
            }
        </>
    )
}

function searchRemoved({removedChars,text})
{
    let el, res = text,prev = 0;
    const len = removedChars.length
    for( let i=0; i<len; i++ )
    {
        el = removedChars[i]
        if(text[el.ind] === el.elem )
        {
            res = res.substr(prev,el.ind)+res.substr(el.ind+1,)
            prev = el.ind+1
        }
    }
    return res
}

function CharList({text,changeText})
{
    return text.split('').map(
        (e,i) => (
            <CSSTransition
                key={i}
                classNames="fade"
                timeout={500}
            >
                <button
                    name={i}
                    className="btn font-weight-bold"
                    onClick ={
                        e => {
                            e.preventDefault();
                            const ind = parseInt(e.currentTarget.name)
                            changeText(
                                prev => {
                                    const p = prev.split('')
                                    p.splice(ind,1)
                                    return p.join('');
                                }
                            )
                        }
                    }
                >
                    {e}
                </button>
            </CSSTransition>
        )
    )
}


const toggleDisplayStyle = {
    onHideTitle:"List Conditional Assignment",
    onDisplayTitle:"Hide",
    onHideClasses:"btn btn-primary",
    onDisplayClasses:"btn"
}

function TextDisplayer()
{
    const [text,changeText] = useState("")
    return (
        <ToggleComponent
            showByDefault={true}
            toggleDisplayStyle={toggleDisplayStyle}
        >
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-6 p-0">
                        <div className="font-weight-bold">
                            Enter some text
                        </div>
                        <input
                            value={text}
                            onChange={e => changeText(e.currentTarget.value)}
                        />
                        <Validation 
                            textLength={text.length}
                        />
                    </div>
                    <div className="col-6 p-0">
                        <div className="font-weight-bold">
                            Click on the letters to make them disappear
                        </div>
                        <TransitionGroup component="ul">
                            <CharList 
                                text={text} 
                                changeText={changeText}
                            />
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </ToggleComponent>
    )
}

export default TextDisplayer;
