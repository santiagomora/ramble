import ListMenu from './ListMenu'
import {useLocationStateHook} from '../../../hooks/hooks'
import {useSelector,useDispatch} from 'react-redux'
import {orderActions} from '../../../store/actions/actions'

function Menu()
{
    const items = useSelector( ({order}) => order.items )

    const dispatch = useDispatch()

    const changeOrder = ({data,quantity,selectedExtra}) => 
    {
        dispatch(orderActions.changeFromMenu({data,quantity,selectedExtra}))
    }

    const categoryId = useLocationStateHook('categoryId')

    return (
        <ListMenu 
            data={items}
            changeOrder={changeOrder}
            dependencies={[categoryId]}
            url={categoryId ? `/menu/7/${categoryId}` : '/menu/7'}
        />
    )
}

export default Menu;

