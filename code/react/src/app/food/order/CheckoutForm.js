import {withFormHandlerHoc,withRequestHoc} from "../../../hocs/hocs"
import {InputValidator} from '../../../composition/composition'

function CheckoutForm({extraValidation,validation,formValues,submitHandler,formChange,formValid,setFormValid})
{
    const onInputChange = e => formChange(e.currentTarget)

    return (
        <form 
            className="container-fluid p-0"
            onSubmit={submitHandler}
            action={'/menu/order/add'}
            method="POST"
        >
            <div className="row">
                <div className="col-12">
                    <div className="pt-2">
                        <p className="m-0 font-weight-bolder">Email</p>
                        <InputValidator
                            rules={validation.email}
                            setFormValid={setFormValid}
                            value={formValues.email}
                            fieldName="email"
                        >
                            <input 
                                name="email" 
                                placeholder="email"
                                className="w-100"
                                value={formValues.email}
                                onChange={onInputChange}
                            />
                        </InputValidator>
                    </div>
                    <div className="pt-2">
                        <p className="m-0 font-weight-bolder">Name</p>
                        <InputValidator
                            rules={validation.name}
                            setFormValid={setFormValid}
                            fieldName="name"
                            value={formValues.name}
                        >
                            <input 
                                name="name" 
                                placeholder="name"
                                className="w-100"
                                value={formValues.name}
                                value={formValues.name}
                                onChange={onInputChange}
                            />
                        </InputValidator>
                    </div>
                </div>
                <div className="col-12">
                    <div className="pt-2">
                        <p className="m-0 font-weight-bolder">Address</p>
                        <InputValidator
                            fieldName="address"
                            rules={validation.address}
                            setFormValid={setFormValid}
                            value={formValues.address}
                        >
                            <input 
                                name="address" 
                                placeholder="address"
                                className="w-100"
                                value={formValues.address}
                                onChange={onInputChange}
                            />
                        </InputValidator>
                    </div>
                    <div className="pt-2">
                        <p className="m-0 font-weight-bolder">Phone number</p>
                        <InputValidator
                            fieldName="phone"
                            setFormValid={setFormValid}
                            rules={validation.phone}
                            value={formValues.phone}
                        >
                            <input 
                                name="phone" 
                                placeholder="phone number"
                                className="w-100"
                                value={formValues.phone}
                                onChange={onInputChange}
                            />
                        </InputValidator>
                    </div>
                </div>
                <div className="col-12">
                    <div className="pt-2">
                        <p className="m-0 font-weight-bolder">Observations</p>
                        <InputValidator
                            fieldName="observations"
                            setFormValid={setFormValid}
                            rules={validation.observations||{}}
                            value={formValues.observations}
                        >
                            <textarea 
                                name="observations" 
                                className="w-100 p-2"
                                placeholder="observations"
                                value={formValues.observations}
                                onChange={onInputChange}
                            />
                        </InputValidator>
                    </div>
                </div>
                <div className="col-12 text-right pt-3">
                    <input 
                        type="submit"
                        disabled={!formValid||!extraValidation} 
                        className="btn btn-primary font-weight-bolder"
                        value="Submit order"
                    />
                </div>
            </div>
        </form>
    )
}

export default withRequestHoc(withFormHandlerHoc(CheckoutForm),false)