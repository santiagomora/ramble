import * as classes from '../css/Food.module.css'

export default function QuantitySelector({quantity,changeQuantityHandler})
{
    return (
        <div className="d-flex flex-row justify-content-center my-2">
            <button 
                onClick={changeQuantityHandler}
                value={-1} 
                className={`${classes.quantity} btn btn-primary p-0`}
            >
                <strong>-</strong>
            </button>
            <p className="m-0 mx-2">
                {quantity}
            </p>
            <button 
                onClick={changeQuantityHandler}
                value={1} 
                className={`${classes.quantity} btn btn-primary p-0`}
            >
                <strong>+</strong>
            </button>
        </div>

    )
}