import { TransitionGroup } from 'react-transition-group'
import {quoteCast} from '../../cast/cast'
import {withPaginatedDataHoc, withRequestHoc} from '../../hocs/hocs'
import SingleQuote from './single/SingleQuote'

function ListQuotes(props)
{
    const {data} = props
    return (
        <ul className="p-0 py-3 list-group">
        {
            data.map(
                quo => {
                    const quote = quoteCast(quo)
                    return (
                        <SingleQuote 
                            key={quote._id}
                            data={quote}
                        />
                    )
                }
            )    
        }
        </ul>
    )
}

export default withRequestHoc(withPaginatedDataHoc(ListQuotes));