export default function Conditional({alternative,condition,children})
{
    return (
        <>{condition ? children : alternative}</>
    )
}
