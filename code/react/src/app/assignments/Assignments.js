import TextDisplayer from './TextDisplayer'
import {Container} from '../../composition/composition'

function Assignments()
{
    return (
        <div className="container-fluid" style={{paddingBottom:"5rem"}} >
            <div className="row">
                <div className="col-12">
                    <h2 className="font-weight-bold  py-4">Assignments</h2>
                    <TextDisplayer/>

                </div>
            </div>
        </div>
    )
}

export default Assignments;
