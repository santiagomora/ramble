import {useState} from 'react'
import {searchByIdHelper} from '../helper/helper'
import {OrderContext} from '../context/context'

export default function withOrderManagementHoc(Component)
{
    return function(props)
    {
        const {orderData} = props

        const [quantity,setQuantity] = useState((orderData||{}).quantity||0)

        const [selectedExtra,setSelectedExtra] = useState((orderData||{}).selectedExtra||[])

        const addSelectedExtraHandler = extra =>  
        {
            return added => 
            {
                let index = searchByIdHelper(added,selectedExtra);
                
                setSelectedExtra(
                    ps => 
                    {
                        let psaux = [...ps],data,dataInd;
                        if ( index>=0)
                        {
                            psaux.splice(index,1)
                        }
                        else 
                        {
                            dataInd = searchByIdHelper(added,extra)
                            data = extra[dataInd]
                            psaux = [...psaux,{_id:data._id,name:data.name,price:data.price}]
                        }
            
                        return psaux ;
                    }
                )
            }
        }
        

        const changeQuantityHandler = q => 
        {
            setQuantity(
                ps => ps+q>=0 ? ps+q : ps
            )
        }

        const cleanSelectors = () => 
        {
            setQuantity(0)
            setSelectedExtra([])
        }
    
        return (
            <OrderContext.Provider 
                value={{
                    quantity,
                    changeQuantityHandler,
                    selectedExtra,
                    addSelectedExtraHandler,
                    cleanSelectors
                }}
            >
                <Component {...props} />
            </OrderContext.Provider>           
        )
    }
}