import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderloginComponent } from './headerlogin/headerlogin.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PursuitmanagerComponent } from './pursuitmanager/pursuitmanager.component';
import { TrainingComponent } from './training/training.component';
import { CvFormComponent } from './cv-form/cv-form.component';
import { TopnavComponent } from './topnav/topnav.component';
// constSidenavComponent require("./sidenav/sidenav.component")
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,CvFormComponent,UpcomingComponent,TrainingComponent,TopnavComponent,PursuitmanagerComponent,NavbarComponent,SignupComponent,SidenavComponent,LoginComponent,FooterComponent,ContactComponent,HeaderloginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyProject';
}