import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkcControl = controls.get(checkControlName);

            if (checkcControl?.errors && !checkcControl.errors['matching']) {
                return null;
            }

            if (control?.value !== checkcControl?.value) {
                controls.get(checkControlName)?.setErrors({ matching: true });
                return { matching: true };
            } else {
                return null;
            }
        };
    }
}