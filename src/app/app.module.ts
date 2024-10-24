import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http';

import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { CvFormComponent } from './cv-form/cv-form.component';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StudentRegistrationComponent,
    CvFormComponent,
    HttpClientModule // Add CommonModule here
  ],
  exports: [
  ]
})
export class FeatureModule { }
