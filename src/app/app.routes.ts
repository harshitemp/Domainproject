import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { HeaderloginComponent } from './headerlogin/headerlogin.component';
import { SignupComponent } from './signup/signup.component';
import { SstudentsmainComponent } from './sstudentsmain/sstudentsmain.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompanymainComponent } from './companymain/companymain.component';
import { UniversitymainComponent } from './universitymain/universitymain.component';
import { PursuitmanagerComponent } from './pursuitmanager/pursuitmanager.component';
import { Header1Component } from './header1/header1.component';
import { TrainingComponent } from './training/training.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { CvFormComponent } from './cv-form/cv-form.component';
import { SafePipe } from './safe.pipe';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { TopnavComponent } from './topnav/topnav.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path:'contact',component:ContactComponent},
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderloginComponent},
  { path: 'jobs', component:JobsComponent },
  {path:'sstudentsmain',component:SstudentsmainComponent},
  {path:'companymain',component:CompanymainComponent},
  {path:'universitymain',component:UniversitymainComponent},
  {path:'pursuitmanager',component:PursuitmanagerComponent},
  {path:'header1',component:Header1Component},
  {path:'training',component:TrainingComponent},
  {path:'sidenav',component:SidenavComponent},
  {path:'upcoming',component:UpcomingComponent},
  {path:'signup',component:SignupComponent},
  {path:'cv-form',component:CvFormComponent},
  {path:'safepipe',component:SafePipe},
  {path:'pdf-view',component:PdfViewComponent},
  {path:'topnav',component:TopnavComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }