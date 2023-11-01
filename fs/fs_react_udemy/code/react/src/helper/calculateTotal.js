export default function calculateTotal(items)
{
    return items.reduce(
        (t,e) => e.orderData.total+t,0
    )
}
