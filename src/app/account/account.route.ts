import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";

const routes: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            {path: '', component: MyAccountComponent},
            { path: 'login', component: LoginPageComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule{}