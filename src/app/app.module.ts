import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrationComponentComponent } from './components/registration-component/registration-component.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelfieDialogComponent } from './components/selfie-dialog/selfie-dialog.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponentComponent,
    SelfieDialogComponent,
    VideoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
