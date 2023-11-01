import React,{useRef,useEffect} from 'react'

const messages = {
    required:(name,value) => `your ${name} is required`,
    phone:(name,value) => `your ${name} must be a valid phone, got:'${value}'`,
    email:(name,value) => `your ${name} must be a valid email, got: '${value}'`
}

const tests = {
    required:(value) => value.trim().length>0,
    phone:(value) => /^\d{2}\s\d{4}\-\d{4}$/.test(value.trim()),
    email:(value) => /\@/.test(value.trim())
}

const validate = (rules,fieldName,value) => 
{
    let errors = []
    for(let ruleName in rules)
    {
        if (rules[ruleName])
        {
            errors = !( tests[ruleName](value) )
                ? [...errors,messages[ruleName](fieldName,value)]
                : errors
        }
    }
    return errors;
}

const DisplayValidationErrors = ({errors}) =>
(
    <ul 
        className="p-0 m-0"
        style={{listStyle:'none'}}
    >
    {
        errors.map(
            (er,i) => 
            (
                <li key ={i} style={{color:"var(--danger)"}}>{er}</li>
            )
        )
    }
    </ul>
)

function InputValidator({rules,value,fieldName,children,setFormValid})
{
    const errors = validate(rules,fieldName,value)
    const isMounted = useRef(false);
    useEffect(
        () => 
        {
            isMounted.current = true
            setFormValid(fieldName,errors.length===0)
        },
        [errors]
    )
    return (
        <>
            {
                isMounted.current 
                    ? <DisplayValidationErrors errors={errors}/> 
                    : <></>
            }
            {children}
        </>
    )
}

export default React.memo(InputValidator,(pp,np) => pp.value===np.value)