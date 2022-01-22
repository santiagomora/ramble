import { FormControl, Validators } from "@angular/forms";
import { BaseForm } from "src/utils";

export class RegisterFormControl extends BaseForm
{
    constructor()
    {
        super({
            email: new FormControl(
                '',
                [Validators.required,Validators.email]
            ),
            password: new FormControl(
                '',
                [Validators.required]
            ),
            name: new FormControl(
                '',
                [Validators.required]
            )
        });
    }
}
