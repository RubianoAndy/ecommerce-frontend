import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AccountComponent } from "./account.component";

const routes: Routes = [{
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '', redirectTo: 'users', pathMatch: 'full'
      },
      {
        path: 'profile', loadComponent: () => import('./components/profile/profile.component'),
        data: { breadcrumb: 'Perfil' }
      },
      {
        path: 'roles', loadComponent: () => import('./components/roles/roles.component'),
        data: { breadcrumb: 'Roles' }
      },
      {
        path: 'users', loadComponent: () => import('./components/users/users.component'),
        data: { breadcrumb: 'Usuarios' }
      },
      { 
        path: '**', redirectTo: 'users', pathMatch: 'full'
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