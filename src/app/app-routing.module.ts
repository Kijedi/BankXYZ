import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: LandingComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: "**",
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
