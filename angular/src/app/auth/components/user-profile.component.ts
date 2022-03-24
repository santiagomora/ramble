import { Component, Input } from "@angular/core";
import { User } from "src/types";

@Component({
    selector:'user-profile',
    templateUrl: './templates/user-profile.template.html'
})
export class UserProfileComponent 
{
    @Input() user: User;
}