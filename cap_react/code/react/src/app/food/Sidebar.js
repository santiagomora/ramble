import { Fragment } from 'react';
import {NavLink} from 'react-router-dom'
import {withFetchOnMountHoc,withRequestHoc} from '../../hocs/hocs';

const active = {fontWeight:"bold",color:"black"};

function Sidebar({data})
{
    return (
        <Fragment>
            <h4 className="font-weight-bold">
                Categories
            </h4>
            <hr/>
            <ul className="m-0 p-0" style={{listStyle:"none"}}>
                {
                    data.map(
                        e => 
                        (
                            <li className="py-2" key={e._id}>
                                <NavLink
                                    to={{
                                        pathname:`/menu/food/${e.name}`,
                                        state:{categoryId:e._id}
                                    }}
                                    activeStyle={active}
                                    >
                                        <strong>{e.name.toUpperCase()}</strong>
                                </NavLink>
                            </li>
                        )
                    )
                }
            </ul>
        </Fragment>
    )
}

export default withRequestHoc(withFetchOnMountHoc(Sidebar)) 