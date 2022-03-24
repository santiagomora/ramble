import {withFormHandlerHoc,withRequestHoc} from '../../hocs/hocs'
import {InputValidator} from '../../composition/composition'

function LoginForm({submitHandler,formValues,formChange,validation,formValid,setFormValid})
{
    return (
        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h6 className="font-weight-bold">user email</h6>
                    <InputValidator
                        rules={validation.email}
                        setFormValid={setFormValid}
                        value={formValues.email}
                        fieldName="email"
                    >
                        <input
                            type="text"
                            name="email"
                            className="w-100"
                            value={formValues.email}
                            onChange={e => formChange(e.currentTarget)}
                        />
                    </InputValidator>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="font-weight-bold">password</h6>
                    <InputValidator
                        rules={validation.password}
                        setFormValid={setFormValid}
                        value={formValues.password}
                        fieldName="password"
                    >
                        <input
                            type='password'
                            name="password"
                            value={formValues.password}
                            className="w-100 p-2"
                            onChange={e => formChange(e.currentTarget)}
                        />
                    </InputValidator>
                </div>
            </div>
            <div className="row py-2">
                <div className="col-md-12 text-right">
                    <input
                        type="submit"
                        value="Login!"
                        disabled={!formValid}
                        className="btn btn-primary"
                    />
                </div>
            </div>
        </form>
    )
}

export default withRequestHoc(withFormHandlerHoc(LoginForm),false)
