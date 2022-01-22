import {ToggleComponent} from '../../../composition/composition'
import {useEffect,useContext,useRef} from 'react'
import DisplayMeal from '../menu/DisplayMeal'
import {withOrderManagementHoc} from '../../../hocs/hocs'
import DisplayOrder from './DisplayOrder'
import {OrderContext} from '../../../context/context'

const toggleDisplayStyle = {
    onHideTitle:"Done",
    onDisplayTitle:"Edit Item",
    onHideClasses:"btn",
    onDisplayClasses:"btn btn-success"
}

function SingleOrder({
    productData,
    orderData,
    changeOrder,
    itemIndex,
    deleteItem
})
{
    const {
        quantity,
        selectedExtra,
        changeQuantityHandler,
        addSelectedExtraHandler
    } = useContext(OrderContext);

    const isMounted = useRef(false)

    const onItemDelete = e => 
    {
        e.preventDefault()
        deleteItem(itemIndex)
    }

    const extraButtons = [
        <button key={0} className="btn btn-danger ml-2" onClick={onItemDelete}>Delete</button>
    ]

    useEffect(
        () => 
        {
            if (isMounted.current)
            {
                const extTotal = selectedExtra.reduce((t,e) => e.price+t,0)
                const total = quantity*(extTotal+productData.price)
                changeOrder(productData,{...orderData,quantity,selectedExtra,total},itemIndex)
            }
            isMounted.current = true
        },
        [quantity,selectedExtra]
    )

    return (
        <li className="list-group-item mb-0 p-3">
            <ToggleComponent
                showByDefault={true}
                toggleDisplayStyle={toggleDisplayStyle}
                extraButtons={extraButtons}
                alternative={
                    <DisplayMeal
                        changeOrder={changeOrder}
                        data={productData}
                        orderData={orderData}
                        quantity={quantity}
                        selectedExtra={selectedExtra}
                        changeQuantityHandler={changeQuantityHandler}
                        addSelectedExtraHandler={addSelectedExtraHandler(productData.category.extras)}
                    /> 
                }
            >
                <DisplayOrder
                    productData={productData}
                    orderData={orderData}
                />
            </ToggleComponent>
        </li>
    )
}

export default withOrderManagementHoc(SingleOrder)
