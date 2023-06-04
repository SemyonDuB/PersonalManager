import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'declension'
})
export class DeclensionPipe implements PipeTransform {

    public year: string[] = ['год','года','лет'];
    public month: string[] = ['месяц','месяца','месяцев'];
    public declensionNumber (value: number, arrayWords: string[]): string {
        if (value.toString().slice(value.toString().length - 1) === '1' && !'11'.includes(value.toString().slice(value.toString().length - 1))) {
            return arrayWords[0];
        } else if ('234'.includes(value.toString().slice(value.toString().length - 1)) && !'121314'.includes(value.toString().slice(value.toString().length - 1))) {
            return arrayWords[1];
        }

        return arrayWords[2];
    }

    public transform(value: number, word: string): string {
        if (value > 0) {
            let usedArrayWords: string[];
            if (word === 'year'){
                usedArrayWords = this.year;

                return this.declensionNumber(value, usedArrayWords);
            } else{
                usedArrayWords = this.month;

                return this.declensionNumber(value, usedArrayWords);
            }
        }

        return '';

    }
}




