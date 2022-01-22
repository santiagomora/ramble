import {withFiltersHoc,withRequestHoc,withPaginatedDataHoc} from '../../hocs/hocs'
import {Conditional} from '../../composition/composition'
import EditViewExpenseForm from './forms/EditViewExpenseForm'
import {expenseCast} from '../../cast/cast'

const fallBack = (
    <li className="pb-3 list-group-item mb-2">
        <h4 className="text-center">No Expenses found</h4>
    </li>
);

const toggleDisplayStyle = {
    onHideTitle:"Cancel",
    onDisplayTitle:"Edit Expense",
    onHideClasses:"btn",
    onDisplayClasses:"btn btn-success"
}

function ListExpenses({data})
{

    return (
        <ul className="p-0 pt-3 list-group">
            <Conditional
                alternative={fallBack}
                condition={data.length>0}
            >
            {
                data.map(
                    (exp,i) =>
                    {
                        const expense = expenseCast(exp)
                        return(
                            <li key={expense._id}
                                className="py-4 list-group-item"
                            >
                                <EditViewExpenseForm
                                    data={expense}
                                />
                            </li>
                        )
                    }
                )
            }
            </Conditional>
        </ul>
    )
}

export default withRequestHoc(withPaginatedDataHoc(withFiltersHoc(ListExpenses)));
