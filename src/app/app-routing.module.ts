import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddlistComponent } from './addlist/addlist.component';

import { HomeComponent } from './home';

const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', loadChildren: usersModule },
        { path: 'addlist', component: AddlistComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }