import {DisplayDateHelper} from '../../helper/helper'
import {Container} from '../../composition/composition'

export default function SingleGoal({_id,createdAt,updatedAt,description,title})
{
    return (
        <Container>
            <div>
                <h4 className="font-weight-bold">{title}</h4>
            </div>
            <div>
                {description}
            </div>
            <p className="m-0 text-right">
                Created at <DisplayDateHelper date={createdAt}/>
                Updated at <DisplayDateHelper date={updatedAt}/>
            </p>
        </Container>


    )
}
