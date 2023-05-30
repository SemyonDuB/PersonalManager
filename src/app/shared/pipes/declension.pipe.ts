import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'declension'
})
export class DeclensionPipe implements PipeTransform {

    public year:string[]=['год','года','лет'];
    public month:string[]=['месяц','месяца','месяцев'];
    public declensionNumber (value:number,array:string[]):string {
        if (value.toString().slice(value.toString().length - 1) === '1') {
        return array[0];
    } else if ('234'.includes(value.toString().slice(value.toString().length - 1))) {
        return array[1];
    } else {
        return array[2];
    }}
    // eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/explicit-function-return-type
    public transform(value: number, str: string) {
        if (value > 0) {
            let k:string[];
            if (str==='year'){
                k=this.year;

                return this.declensionNumber(value,k);
            }else{
                k=this.month;

                return this.declensionNumber(value,k);
            }
        } else {
            return '';
        }
    }
}




