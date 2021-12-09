import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import {RouterModule, Routes} from '@angular/router';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const appRoutes: Routes = [
  { path: 'appareils',canActivate: [AuthGuardService] ,component: AppareilViewComponent},
  { path: 'appareils/:id',canActivate: [AuthGuardService] , component: SingleAppareilComponent},
  { path: 'auth', component: AuthComponent},
  {path: '', component: AppareilViewComponent},
  { path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppareilService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
