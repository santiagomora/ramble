import {Server} from '../types/index'

export default function(id:number, arr: any[]) : number 
{
    for(let i=0;i<arr.length; i++) 
    {
        if(arr[i].id === id)
        {
            return i;
        }
    }
    return -1;
}