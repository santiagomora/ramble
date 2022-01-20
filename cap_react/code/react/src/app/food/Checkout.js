import ListOrder from './order/ListOrder'
import CheckoutForm from './order/CheckoutForm'
import { useDispatch,useSelector } from 'react-redux'
import { orderActions,uiActions } from '../../store/actions/actions'
import { useHistory } from 'react-router'

const defaultCheckout = {
    name:'',
    email:'',
    observations:'',
    phone:'',
    address:''
}

const validation = {
    name: {
        required:true
    },
    email: {
        required:true, 
        email: true
    },
    phone:{
        phone: true,
        required:true 
    },
    address:{
        required:true
    }
}

const extractItems = orderItems => orderItems.map( 
    ({orderData}) => ({
        _id:orderData.prodId,
        quantity:orderData.quantity,
        total:orderData.total,
        extras:orderData.selectedExtra.map(r => r._id)
    }) 
)

const getOrderData = (order,submitted) => 
{
    const {items:orderItems,total} = order;
    const items = extractItems(orderItems)
    const data = {...submitted,items,total}
    return data
}

export default function Checkout()
{
    const order = useSelector( state => state.order )

    const dispatch = useDispatch()

    const history = useHistory();

    const submitHandler = async (submitted,request) => 
    {
        const data = getOrderData(order,submitted)
        request({url:"/menu/order/add",method:'post',data})
    }

    const handleSuccess = ({success}) => 
    {
        history.push({pathname:"/menu"})
        dispatch(orderActions.flushOrderAction())
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }  

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <h2 className="font-weight-bolder py-2">Checkout</h2>
                </div>
                <div className="col-6 pl-0 pr-3">
                    <h4 className="font-weight-bolder">Your order</h4>
                    <ListOrder />
                    <h4 className="text-right">
                        total:...
                        <strong>$</strong>
                        {order.total}
                    </h4>
                </div>
                <div className="col-6 pl-5 pr-0">
                    <CheckoutForm
                        extraValidation={order.total>0}
                        validation={validation}
                        defaultValues={defaultCheckout}
                        submitHandler={submitHandler}
                        handleSuccess={handleSuccess}
                    />
                </div>
            </div>
        </div>
    )
}