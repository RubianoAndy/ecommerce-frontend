import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AccountComponent } from "./account.component";

const routes: Routes = [{
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: '', loadComponent: () => import('./components/users/users.component')
      },
      { 
        path: '**', redirectTo: '', pathMatch: 'full'
      },
    ]
}];

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

export default class AccountRoutes {}