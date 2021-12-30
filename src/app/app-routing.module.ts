import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './views/layouts/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
