import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/register.component";
import { LoginComponent } from "./components/login.component";
import { UserProfileComponent } from "./components/user-profile.component";
import { AuthComponent } from "./components/auth.component";
import { SharedModule } from "../shared/shared.module";

const routes : Routes = [
    { 
        path:'',
        component: AuthComponent
    },
    {
        path:'register',
        component: RegisterComponent
    }
]

@NgModule({
    declarations:[
        LoginComponent,
        UserProfileComponent,
        RegisterComponent,
        AuthComponent
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AuthModule{}