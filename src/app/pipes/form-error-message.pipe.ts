import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
    name: 'formErrorMessage',
    pure: false
})
export class FormErrorMessagePipe implements PipeTransform {
    // passwordStatus confirmPasswordIsMutch

    transform(control: FormControl, ...args: unknown[]): unknown {
        if (control.hasError('required')) {
            return 'This field is reqiured'
        }
        else if (control.hasError('pattern')) {
            return 'Invalid email'
        }
        else if (control.hasError('minlength')) {
            return 'Min length is 4'
        }
        else if (control.hasError('checkSpace')) {
            return 'Cnot have a space'
        }
        else if (control.hasError('onlyNumbers')) {
            return 'Only numbers'
        }
        else if (control.hasError('passwordStatus')) {
            return `
               Invalid password, 
               Password must include (A-Z a-z 0-9)
            `
        }
        else if (control.hasError('confirmPasswordIsMutch')) {
            return 'Password is not match'
        }

        return null;
    }

}
