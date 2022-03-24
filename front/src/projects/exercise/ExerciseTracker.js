import AddExerciseForm from './AddExerciseForm';

import CreateUserForm from './CreateUserForm';

function ExerciseTracker(){
    return(
        <>
            <h2 className="m-top m-bottom p-top">
                Exercise tracker Microservice
            </h2>
            <div className="row m-bottom p-top">
                <div className="col-md-6">
                    <div className="method-exp">
                        <CreateUserForm/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="method-exp">
                        <AddExerciseForm/>
                    </div>
                </div>
            </div>
            <h3  className="m-bottom p-bottom">
                Endpoints:
            </h3>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[POST] - /api/exercise/add:</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row method-exp">
                <div className="col-md-12">
                    Adds a new exercise to {"{userId}"} user
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[POST] - /api/exercise/new-user:</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row method-exp">
                <div className="col-md-12">
                    Adds user identified by {"{username}"}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="method">
                        <code><strong>[GET] - /api/exercise/log?{"{userId}"}[&from][&to][&limit]:</strong></code>
                    </h4>
                </div>
            </div>
            <div className="row method-exp">
                <div className="col-md-6">
                    <h5>
                        <code><strong>{"{userId}"}:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        required, previously created user
                    </div>
                </div>
                <div className="col-md-6">
                    <h5>
                        <code><strong>[optional] &from:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        start date [yyyy,int]-[dd,int]-[mm,int]
                    </div>
                    <h5>
                        <code><strong>[optional] &to:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        end date [yyyy,int]-[dd,int]-[mm,int]
                    </div>
                    <h5>
                        <code><strong>[optional] &limit:</strong></code>
                    </h5>
                    <div className="m-bottom">
                        limit to [limit] results
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExerciseTracker;
