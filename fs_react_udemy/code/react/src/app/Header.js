import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Header()
{
    return(
        <div className="container-fluid header py-4 px-3">
            <div className="row">
                <div className="col-md-4">
                    <Link to="/">
                        <h1 className="font-weight-bold" style={{color:"white"}}>
                            REACT TRAINING
                        </h1>
                    </Link>
                </div>
                <div className="col-md-8">
                    <div className="d-flex flex-column align-items-end">
                        <Navbar/>
                    </div>
                </div>  
            </div>
        </div>
    )
}
