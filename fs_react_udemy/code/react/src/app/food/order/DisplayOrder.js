import * as classes from '../css/Food.module.css'

function OrderItem({titleClass,name,price,quantity})
{
    return (
        <>
            <div className={titleClass}>{name}</div>
            <div>
                <strong>$</strong>{price}
                <strong>×{quantity}</strong>
            </div>
        </>
    )
}

function DisplayExtras({selectedExtra,quantity})
{
    return selectedExtra.map(
        ext =>
        (
            <div
                key={ext._id}
                className="d-flex flex-row justify-content-between w-100"
            >
                <OrderItem 
                    name={ext.name}
                    price={ext.price}
                    quantity={quantity}
                />
            </div>
        )
    )
    
}

function DisplayOrder({
    productData,
    orderData,
})
{
    const {price,pic,name} = productData

    const {total,selectedExtra,quantity} = orderData    

    return (
        <div className="d-flex justify-content-between flex-row">
            <div className="container-fluid pr-0">
                <div className="row">
                    <div className="col-auto">
                        <img className={`mr-3 ${classes['menu-image-order']}`} src={pic}/>
                    </div>
                    <div className="col">
                        <h4 className="d-flex flex-row justify-content-between w-100">
                            <OrderItem
                                name={name}
                                price={price}
                                titleClass="font-weight-bold"
                                quantity={quantity}
                            />
                        </h4>
                        <div>
                            {productData.description}
                        </div>
                        <DisplayExtras
                            selectedExtra={selectedExtra}
                            quantity={quantity}
                        />
                        <hr className="mb-1"/>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <h4 className="mb-0 font-weight-bold">${total}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayOrder;