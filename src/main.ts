import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { EmployeeV1Component } from './app/employee-v1/employee-v1.component';

bootstrapApplication(/* AppComponent */ EmployeeV1Component, appConfig)
  .catch((err) => console.error(err));
