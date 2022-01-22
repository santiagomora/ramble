import {Conditional} from '../../../composition/composition'
import MealWithLoadButton from './MealWithLoadButton'
import {withPaginatedDataHoc,withRequestHoc} from '../../../hocs/hocs'

const fallBack = (
    <li className="pb-3 list-group-item mb-2">
        <h4 className="text-center">No meals found</h4>
    </li>
);

function ListMenu({data,changeOrder})
{
    return (
        <>
            <h3 className="font-weight-bold">
                Menu
            </h3>
            <ul className="py-3 list-group">
                <Conditional
                    alternative={fallBack}
                    condition={data.length>0}
                >
                {
                    data.map(
                        (mea,i) => {
                            return (
                                <li 
                                    key={mea._id} 
                                    className="list-group-item py-4"
                                >
                                    <MealWithLoadButton
                                        changeOrder={changeOrder}
                                        data={mea}
                                    />
                                </li>
                            )
                        }
                    )
                }
                </Conditional>
            </ul>
        </>
    )
}

export default withRequestHoc(withPaginatedDataHoc(ListMenu));
