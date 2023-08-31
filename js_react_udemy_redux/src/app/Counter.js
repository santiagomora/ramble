import {useSelector,useDispatch} from 'react-redux'
import {counterSlice} from '../store/slice/index'
import {preventDefaultWrapper} from '../helper/index'

const counterActions = counterSlice.actions

const paramExtract = () => null

export default function Counter( props )
{
    const {ctr,toggle} = useSelector( 
        ({counter}) =>  ({
            ctr:counter.ctr,
            toggle:counter.toggle
        }) 
    )

    const dispatch = useDispatch();
    // sin toolkit
    // const upHandler = () =>  dispatch({type:'ctr',value:1})
    const upHandler = () =>  dispatch(counterActions.ctr(1))
    
    // sin toolkit
    // const downHandler = () =>  dispatch({type:'ctr',value:-1})
    const downHandler = () =>  dispatch(counterActions.ctr(-1))
    // sin toolkit
    // const toggleHandler = () => dispatch({type:'toggle'})
    const toggleHandler = () => dispatch(counterActions.toggle())

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1><strong>Counter</strong></h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button 
                        onClick={preventDefaultWrapper(upHandler,paramExtract)} 
                        className="d-inline btn"
                    >
                        up
                    </button>
                    <h2 
                        className={toggle ? "d-inline" : 'd-none'}
                    >
                        {ctr}
                    </h2>
                    <button 
                        onClick={preventDefaultWrapper(downHandler,paramExtract)} 
                        className="btn d-inline"
                    >
                        down
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button 
                        onClick={preventDefaultWrapper(toggleHandler,paramExtract)} 
                        className="btn"
                    >
                        toggle
                    </button>
                </div>
            </div>
        </div>
    )
}


/*class Counter extends Component
{
    upHandler = () => 
    {
        this.props.up(1)
    }

    downHandler = () => 
    {
        this.props.down(1)
    }

    render()
    {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1><strong>Counter</strong></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button onClick={preventWrapper(this.upHandler)} className="d-inline btn">up</button>
                        <h2 className="d-inline ">{this.props.ctr}</h2>
                        <button onClick={preventWrapper(this.downHandler)} className="btn d-inline ">down</button>
                    </div>
                </div>
            </div>
        )
    }
}
// mapea el estado en redux hacia props del componente Counter
// los valores retornados pasaran como props hacia counter
const mapStateToProps = ({ctr}) => ({ctr}) 

// dispatcher, recibe una function de dispatch, de redux como parametro
// retorna un objecto con acceso a la function dispatch de redux 
// cuyas propiedades seran inyectadas como props hacia la clase
// se supone que el objeto de retorno contiene todas las acciones que despachara nuestro
// componente de clase
const mapDispatchToProps = dispatch => 
({
    up: (value) => dispatch({type:'up',value}),
    down: (value) => dispatch({type:'down',value})
})


export default connect(mapStateToProps,mapDispatchToProps)(Counter)*/