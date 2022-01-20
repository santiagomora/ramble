import {withFormHandlerHoc,withRequestHoc} from '../../../hocs/hocs'
import {InputValidator} from '../../../composition/composition'

function FormHolder({submitHandler,formValues,formChange,validation,formValid,setFormValid})
{
    return (
        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h6 className="font-weight-bold">Title</h6>
                        <InputValidator
                            rules={validation.title}
                            setFormValid={setFormValid}
                            value={formValues.title}
                            fieldName="title"
                        >
                            <input
                                type="text"
                                name="title"
                                className="w-100"
                                value={formValues.title}
                                onChange={e => formChange(e.currentTarget)}
                            />
                        </InputValidator>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="font-weight-bold">Description</h6>
                    <InputValidator
                        rules={validation.description}
                        setFormValid={setFormValid}
                        value={formValues.description}
                        fieldName="description"
                    >
                        <textarea
                            name="description"
                            value={formValues.description}
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
                        value="submit"
                        disabled={!formValid}
                        className="btn btn-primary"
                    />
                </div>
            </div>
        </form>
    )
}

export default withRequestHoc(withFormHandlerHoc(FormHolder),false)
