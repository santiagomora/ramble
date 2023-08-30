const buildDate = (date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return {month,day,year};
}

export default function DisplayDateHelper({date})
{
    const {month,day,year} = buildDate(date)
    return (
        <span>{month}<strong className="px-2">{day},</strong>{year}.</span>
    )
}
