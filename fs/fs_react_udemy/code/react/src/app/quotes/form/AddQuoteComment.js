import {withFormHandlerHoc,withRequestHoc} from '../../../hocs/hocs'
import {InputValidator} from '../../../composition/composition'

function AddQuoteComment({submitHandler,formValues,formChange,validation,formValid,setFormValid})
{
    return (
        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h6 className="font-weight-bold">Author</h6>
                    <InputValidator
                        rules={validation.author}
                        setFormValid={setFormValid}
                        value={formValues.author}
                        fieldName="author"
                    >
                        <input
                            type="text"
                            name="author"
                            className="w-100"
                            value={formValues.author}
                            onChange={e => formChange(e.currentTarget)}
                        />
                    </InputValidator>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="font-weight-bold">Text</h6>
                    <InputValidator
                        rules={validation.text}
                        setFormValid={setFormValid}
                        value={formValues.text}
                        fieldName="text"
                    >
                        <textarea
                            name="text"
                            value={formValues.text}
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

export default withRequestHoc(withFormHandlerHoc(AddQuoteComment),false)
