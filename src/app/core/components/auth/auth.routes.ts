import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { AuthComponent } from "./auth.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
    ],
    exports: [
        RouterModule,
    ],
})

export class AuthRoutes {}