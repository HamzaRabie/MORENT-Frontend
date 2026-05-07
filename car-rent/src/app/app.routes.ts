import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Category } from './pages/category/category';
import { Details } from './pages/details/details';
import { Payment } from './pages/payment/payment';

export const routes: Routes = [
    {path:'' , redirectTo :'dashboard',pathMatch:'full'},
    {path:'dashboard',component:Dashboard},
    {path:'category',component:Category},
    {path:'details',component:Details},
    { path: 'cars/:id', component: Details },
    { path: 'payment/:carId', component: Payment }
];
