import {Conditional} from '../../../composition/composition'
import SingleOrder from './SingleOrder'
import {useSelector,useDispatch} from 'react-redux'
import {orderActions} from '../../../store/actions/actions'

const fallBack = (
    <li className="pb-3 list-group-item mb-2">
        <h4 className="text-center">Empty order</h4>
    </li>
);

function ListOrder()
{
    const items = useSelector( ({order}) => order.items)

    const dispatch = useDispatch();

    const changeOrder = (prodData,orderMod,itemIndex) => 
    {
        dispatch(orderActions.changeFromOrder({prodData,orderMod,itemIndex}))
    }

    const deleteItem = (itemIndex) => 
    {
        dispatch(orderActions.itemDelete({itemIndex}))
    }

    return (
        <ul className="p-0 pt-3 list-group">
            <Conditional
                alternative={fallBack}
                condition={items.length>0}
            >
            {
                items.map(
                    (itm,i) => {
                        return (
                            <SingleOrder
                                key={`${i}${itm.productData._id}`}
                                productData={itm.productData}
                                orderData={itm.orderData}
                                itemIndex={i}
                                changeOrder={changeOrder}
                                deleteItem={deleteItem}
                            />
                        )
                    }
                )
            }
            </Conditional>
        </ul>
    )
}

export default ListOrder
