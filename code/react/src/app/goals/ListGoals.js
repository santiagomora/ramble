import React from 'react'
import {Conditional} from '../../composition/composition'
import {withPaginatedDataHoc,withRequestHoc} from '../../hocs/hocs'
import EditViewGoalForm from './forms/EditViewGoalForm'
import {goalCast} from '../../cast/cast'

const fallBack = (
    <li className="pb-3 list-group-item mb-2">
        <h4 className="text-center">No Goals found</h4>
    </li>
);

function ListGoals({data})
{
    return (
        <ul className="p-0 py-3 list-group">
            <Conditional
                alternative={fallBack}
                condition={data.length>0}
            >
            {
                data.map(
                    (goa,i) => {
                        const goal = goalCast(goa)
                        return (
                            <EditViewGoalForm
                                key={goal._id}
                                data={goal}
                            />
                        )
                    }
                )
            }
            </Conditional>
        </ul>
    )
}

export default withRequestHoc(withPaginatedDataHoc(ListGoals))
