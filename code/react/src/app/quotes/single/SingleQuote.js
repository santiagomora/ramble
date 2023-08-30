import {DisplayDateHelper} from "../../../helper/helper"
import {Link} from 'react-router-dom'

export default function SingleQuote({data})
{
    const {_id,author,title,text,createdAt,updatedAt} = data
    return (
        <Link 
            to={`/quotes/${_id}`}
            className="listed-button default-color m-0 p-0"
        >
            <li className={`py-4 list-group-item listed-button`}>
                <h3 className="font-weight-bold">
                    {title}
                </h3>
                <p>by {author}</p>
                <div>{text}</div>
                <div className="text-right"> 
                    <strong>Created at: </strong><DisplayDateHelper date={createdAt}/>
                    <strong> Last updated at: </strong><DisplayDateHelper date={updatedAt}/>
                </div>
            </li>   
        </Link>
    )
}