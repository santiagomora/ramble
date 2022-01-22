import {useRef} from 'react'
import {useHistory,useLocation} from 'react-router'
import {rangeHelper} from '../helper/helper'

const buildQuery = ({baseUrl,limit,skip}) =>
{
    return `${baseUrl}?limit=${limit}&skip=${skip}`
}

const DisplayLimit = ({limit,pathInfo,total,skip,history}) => 
{
    const paginationRef = useRef();

    const {pathname,state} = pathInfo

    const keyDownHandler = e =>
    {
        const pressed = String.fromCharCode(e.which)
        const limit = parseInt(paginationRef.current.value)
        if( !/\d/.test(pressed)&&[39,37,8,13,46].indexOf(e.which)<0 )
        {
            e.preventDefault()
        }
        if(e.keyCode===13)
        {
            history.push({
                pathname:pathname,
                search:`?limit=${limit}&skip=${skip}`,
                state
            })
        }
    }

    return (
        <>
            <div>
                <span>Showing</span>
                <input
                    type="number"
                    name="changePage"
                    ref={paginationRef}
                    className="mx-1"
                    defaultValue={limit}
                    style={{width:"70px"}}
                    onKeyDown={keyDownHandler}
                />
                <span>out of <strong>{total}</strong> results in total.</span>
            </div>
            <div>
                Edit the input and press <strong>ENTER</strong> to change results per page
            </div>
        </>
        
    )
}

const DisplayPages = ({limit,pathInfo,total,skip,history}) => 
{
    const current = Math.ceil(skip/limit);

    const {pathname,state} = pathInfo

    const navigateToPage = e => 
    {
        e.preventDefault()
        history.push({
            pathname:pathname,
            search:e.currentTarget.getAttribute('href'),
            state
        })
    }

    return rangeHelper(1,Math.ceil(total/limit)).map(
        (e,i) => 
        (
            e-1 !==current
            ?
                <a
                    key={i}
                    href={`?limit=${limit}&skip=${e-1}`}
                    onClick={navigateToPage}
                    page={e-1}
                    className="p-2 font-weight-bold"
                >
                    {e}
                </a>
            :
                <span
                    key={i}
                    className="p-2 font-weight-bold"
                >
                    {e}
                </span>
        )
    )

}

export default function Pagination({limit,total,skip,pathInfo,children})
{

    const history = useHistory()

    return (
        <>
            {children}
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-md-6">
                        <DisplayLimit 
                            limit={limit}
                            pathInfo={pathInfo}
                            skip={skip}
                            history={history} 
                            total={total}
                        />
                    </div>
                    <div className="col-md-6 text-right">
                        <DisplayPages 
                            limit={limit}
                            pathInfo={pathInfo}
                            skip={skip}
                            history={history} 
                            total={total}
                        /> 
                    </div>
                </div>
            </div>
        </>
    );
}
