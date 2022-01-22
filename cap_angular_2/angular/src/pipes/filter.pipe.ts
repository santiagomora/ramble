import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure:false
})
export class FilterPipe implements PipeTransform
{
    transform( value: any[], expected: any,keyName: string ):any[]
    {
        return value.filter(
            r => r[keyName] === expected
        )
    }
}
