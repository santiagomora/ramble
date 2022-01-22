import {useContext} from 'react'
import {Conditional} from '../../../composition/composition'
import DisplayMeal from './DisplayMeal'
import {withOrderManagementHoc} from '../../../hocs/hocs'
import {OrderContext} from '../../../context/context'
import {mealCast} from '../../../cast/cast'

function MealWithLoadButton({
    data,
    changeOrder
})
{
    const {
        cleanSelectors,
        quantity,
        selectedExtra,
        changeQuantityHandler,
        addSelectedExtraHandler
    } = useContext(OrderContext);

    const loadToOrder = e => 
    {
        e.preventDefault()
        changeOrder({data,name:data.name,quantity,selectedExtra})
        cleanSelectors()
    }

    return (
        <div className="my-2">
            <DisplayMeal 
                data={mealCast(data)}
                quantity={quantity}
                selectedExtra={selectedExtra}
                changeQuantityHandler={changeQuantityHandler}
                addSelectedExtraHandler={addSelectedExtraHandler(data.category.extras)}
            /> 
            <div className="text-right">
                <Conditional 
                    condition={quantity>0}
                    alternative={<></>}
                >
                    <button
                        className="btn-light btn"
                        onClick={ e => {e.preventDefault();cleanSelectors();}}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-primary btn"
                        onClick={loadToOrder}
                    >
                        Load to order
                    </button>
                </Conditional>
            </div>
        </div>
    )
}

export default withOrderManagementHoc(MealWithLoadButton)