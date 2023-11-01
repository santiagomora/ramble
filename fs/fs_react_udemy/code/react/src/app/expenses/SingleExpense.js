import {DisplayDateHelper} from '../../helper/helper'

export default function SingleExpense({_id,title,amount,date,description,createdAt,updatedAt})
{
    return (
        <div className="container-fluid py-2">
            <div className="row">
                <div className="col-md-9">
                    <div>
                        <h4 className="font-weight-bold">{title}</h4>
                    </div>
                    <div>
                        {description}
                    </div>
                    <p className="m-0">
                        Created at <DisplayDateHelper date={createdAt}/>
                        Last updated at <DisplayDateHelper date={updatedAt}/>
                    </p>
                </div>
                <div className="col-md-3 text-right align-content-bottom">
                    <h5>
                        <DisplayDateHelper date={date}/>
                    </h5>
                    <div className="text-right">
                        <h4>${amount}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
