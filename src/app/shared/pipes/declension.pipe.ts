import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'declension'
})
export class DeclensionPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/explicit-function-return-type
    public transform(value: number, str:string) {
        if (value > 0) {
            if (str === 'year') {
                if (value.toString().slice(value.toString().length - 1) === '1') {
                    return 'год';
                } else if ('234'.includes(value.toString().slice(value.toString().length - 1))) {
                    return 'года';
                } else {
                    return 'лет';
                }

            } else{
                if (value.toString().slice(value.toString().length - 1) === '1') {
                    return 'месяц';
                } else if ('234'.includes(value.toString().slice(value.toString().length - 1))) {
                    return 'месяца';
                } else {
                    return 'месяцев';
                }
            }
        }else {
            return '';
        }
    }
}

