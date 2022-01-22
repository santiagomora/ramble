import DisplayDateHelper from "../../../helper/DisplayDateHelper"
import {withPaginatedDataHoc,withRequestHoc} from "../../../hocs/hocs"
import {commentCast} from '../../../cast/cast'

const QuoteCommentList = ({data}) => 
{
    return data.map(
        com => 
        {
            const comment = commentCast(com)
            return (
                <div 
                    className="mb-2 comment px-3 py-2" 
                    key={comment._id}
                >
                    <h5 className="font-weight-bold">{comment.author}</h5>
                    <div>{comment.text}</div>
                    <div className="font-italic text-right">
                        on <DisplayDateHelper date={comment.createdAt}/>
                    </div>
                </div>
            )
        }
    )
}

export default withRequestHoc(withPaginatedDataHoc(QuoteCommentList))