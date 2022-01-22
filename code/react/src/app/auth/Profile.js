import { useSelector } from "react-redux"
import NavBar from '../Navbar'

export default function Profile()
{
    const {user} = useSelector( state => state.auth ) 

    return (
        <div className="container-fluid" style={{padding:"7rem"}}>
            <div className="row">
                <div className="col-12">
                    <h1 className="font-weight-bold text-center">
                        {`Welcome, ${user.name}!`}
                    </h1>
                </div>
                <div className="col-12 text-center">
                    <NavBar/>
                </div>
            </div>
        </div>
    )
}