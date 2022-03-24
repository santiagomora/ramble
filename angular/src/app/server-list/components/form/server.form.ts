import { FormControl, Validators } from "@angular/forms";
import { Server } from "src/types";
import { BaseForm } from "src/utils";

export class ServerFormControl extends BaseForm
{
    constructor( currentServer: Server = <Server>{} )
    {
        super({
            name: new FormControl(
                currentServer.name||'',
                [Validators.required]
            ),
            enabled: new FormControl(
                currentServer.enabled||true,
                [Validators.required]
            )
        });
    }
}
