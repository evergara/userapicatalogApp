import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UserResolver } from './resolver/user.resolver';

let ROUTER_INIT: string = 'users';

const routes: Routes = [
  {
    path: ROUTER_INIT,
    component: UsersComponent,
  },
  {
    path: 'user/:uuid',
    component: UsersDetailComponent,
    resolve: { resolvedUseResponse: UserResolver },
  },
  {
    path: '',
    redirectTo: ROUTER_INIT,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTER_INIT,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
