import {useState,useEffect} from 'react';

export default function withFormHandlerHoc(Form)
{
    return function FormHandler(props)
    {
        const {defaultValues,request,response,handleSuccess,submitHandler} = props;

        const [formValues,changeFormValues] = useState(defaultValues);

        const [formValid,setFormValid] = useState({})
        
        const validKeys = Object.values(formValid)

        const formChange = ({name,value}) => {
            changeFormValues(
                prevState => {
                    prevState[name] = value;
                    return {...prevState};
                }
            )
        }

        const changeFormValid = (fieldName,isValid) => 
        {
            
            if(formValid[fieldName] !== isValid)
            {
                setFormValid(
                    ps => 
                    {
                        ps[fieldName] = isValid
                        return {...ps};
                    }
                )
            }
        }

        const submitActionHandler = e =>
        {
            e.preventDefault();
            submitHandler(formValues,request);
        }

        useEffect(
            () => 
            {
                if ((response||{}).success)
                {
                    handleSuccess({success:response.success})
                }
            },
            [response]
        )

        return (
            <Form
                {...props}
                formValues={formValues}
                formChange={formChange}
                setFormValid={changeFormValid}
                formValid={validKeys.reduce((t,e) => e&&t,validKeys.length>0)}
                submitHandler={submitActionHandler}
            />
        )
    }
}
