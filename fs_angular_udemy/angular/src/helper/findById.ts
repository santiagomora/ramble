export default function(id:number|string, arr: any[]) : number 
{
    for(let i=0;i<arr.length; i++) 
    {
        if(arr[i].id === id || arr[i]._id===id)
        {
            return i;
        }
    }
    return -1;
}