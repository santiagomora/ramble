import {useLocation} from 'react-router'
import {Container} from '../../composition/composition'
import CreateGoalForm from './forms/CreateGoalForm'
import ListGoals from './ListGoals'

function Goals()
{
    const {state} = useLocation()
    return (
        <Container>
            <h2 className="font-weight-bold py-4">
                Course Goals
            </h2>
            <CreateGoalForm/>
            <div className="pb-3">
                <ListGoals 
                    url='goals/7'
                    dependencies={[state]}
                />

            </div>
        </Container>
    )
}

export default Goals
