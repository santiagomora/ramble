export default function searchByIdHelper(prodId,data) 
{
    const len = data.length
    for( let i=0; i<len; i++ )
    {
        if (data[i]._id===prodId)
            return i
    }
    return -1;
}