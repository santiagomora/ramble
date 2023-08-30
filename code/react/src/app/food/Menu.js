import Order from './order/Order'
import Menu from './menu/Menu'
import {Container} from '../../composition/composition'
import Sidebar from './Sidebar'

export default function Food(props)
{
    return (
        <Container>
            <div className="row pt-3">
                <div 
                    className="col-md-2 p-3" 
                    style={{
                        backgroundColor:'var(--light)',
                        borderRadius:'5px'
                    }}
                >
                    <Sidebar url='/menu/categories/7'/> 
                </div>
                <div className="col-md-10 pr-0">
                    <Order/>
                    <Menu/>  
                </div>
            </div>
        </Container>
    )
}