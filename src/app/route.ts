import { Injectable, Component } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guard/auth.guard';
import { DashbordResolverService } from './_resolver/dashbord-resolver.service';


export const appRoutes: Routes = [

  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent,
                          resolve: {users:DashbordResolverService }}
    ]
  },

  { path: '**', pathMatch: 'full', redirectTo: '' }
]
