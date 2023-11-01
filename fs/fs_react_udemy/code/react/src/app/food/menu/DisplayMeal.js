import {Container} from '../../../composition/composition'
import * as classes from '../css/Food.module.css'
import {QuantitySelector,MealExtrasSelector} from '../controls/controls'

function DisplayMeal({
    data,
    quantity,
    selectedExtra,
    changeQuantityHandler,
    addSelectedExtraHandler
})
{
    const {_id,price,description,category,pic,name} = data

    const onAddSelected = e => 
    {
        e.preventDefault()
        const added = parseInt(e.currentTarget.getAttribute('data'))
        addSelectedExtraHandler(added)
    }

    const onQuantityChange = e => 
    {
        e.preventDefault()
        const q = parseInt(e.currentTarget.getAttribute('value'));
        changeQuantityHandler(q)
    }

    
    return (
        <Container>
            <div className="d-flex justify-content-between flex-row">
                <div>
                    <div className="d-flex flex-row">
                        <img className={`mr-3 ${classes['menu-image']}`} src={pic}/>
                        <div>
                            <div>
                                <h4 className="font-weight-bold mb-0">{name}</h4>
                            </div>
                            <div>
                                {description}
                            </div>
                            <div className="font-weight-bold mb-0">
                                {category.name}
                            </div>
                            <p className="mt-2">
                                <MealExtrasSelector 
                                    extra={category.extras}
                                    selectedExtra={selectedExtra}
                                    addSelectedExtraHandler={onAddSelected}
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="d-inline text-center ">$</h3>
                        <h1 className="d-inline font-weight-bold">{price}</h1>
                        <QuantitySelector 
                            quantity={quantity} 
                            changeQuantityHandler={onQuantityChange}
                        />
                    </div> 
                </div>
            </div>
        </Container>
    )
}

export default DisplayMeal