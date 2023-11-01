import {uiActions} from '../../../store/actions/actions'
import { useSelector,useDispatch } from 'react-redux'
import {Modal} from '../../../ui/ui'
import ListOrder from './ListOrder'

function Order()
{
    const {order} = useSelector( state => state )

    const dispatch = useDispatch()

    function toggleModal(e) 
    {
        e.preventDefault()
        dispatch(uiActions.changeModalDisplay())
    }
    
    
    return (
        <>
            <Modal
                closeModal={toggleModal}
                title="Your order"
            >
                <ListOrder/>
                <h4 className="text-right">
                    total:...
                    <strong>$</strong>
                    {order.total}
                </h4>
            </Modal>
            <div className="text-right">
                <button 
                    onClick={toggleModal}
                    className="btn btn-primary"
                >
                    <strong>View Order</strong>
                </button>
            </div>
        </>
    )
}

export default Order
