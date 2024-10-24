import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { HeaderloginComponent } from './headerlogin/headerlogin.component';
import { SignupComponent } from './signup/signup.component';

import { PursuitmanagerComponent } from './pursuitmanager/pursuitmanager.component';
import { Header1Component } from './header1/header1.component';
import { TrainingComponent } from './training/training.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { CvFormComponent } from './cv-form/cv-form.component';
import { SafePipe } from './safe.pipe';
import { TopnavComponent } from './topnav/topnav.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { Footer1Component } from './footer1/footer1.component';
import { ReminderComponent } from './reminder/reminder.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewPlacementComponent } from './view-placement/view-placement.component';
import { CoordinatorsdashboardComponent } from './coordinatorsdashboard/coordinatorsdashboard.component';
import { ButtonComponent } from './button/button.component';
import { ApiService } from './api.service';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'header', component: HeaderloginComponent },
    
    { path: 'pursuitmanager', component: PursuitmanagerComponent },
    { path: 'header1', component: Header1Component },
    { path: 'training', component: TrainingComponent },
    { path: 'sidenav', component: SidenavComponent },
    { path: 'upcoming', component: UpcomingComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'cv-form', component: CvFormComponent },
    { path: 'safepipe', component: SafePipe },
    { path: 'topnav', component: TopnavComponent },
    {path:'footer',component:Footer1Component},
    { path: 'student-registration', component:StudentRegistrationComponent },
    { path: 'reminder', component: ReminderComponent },
    { path: 'schedule-meeting', component: ScheduleMeetingComponent },
    {path:'sidebar',component:SidebarComponent},
    {path:'feedback',component:FeedbackComponent},
    {path:'view-placement',component:ViewPlacementComponent},
    {path:'coordinatorsdashboard',component:CoordinatorsdashboardComponent},
    {path:'button',component:ButtonComponent},
    {path:'api',component:ApiService}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }