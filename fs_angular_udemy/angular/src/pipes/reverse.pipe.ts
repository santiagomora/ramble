import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform
{
    transform( value: string, mustApply: boolean ): string
    {
        return mustApply 
            ? value.split('').reverse().join('')
            : value
    }
}