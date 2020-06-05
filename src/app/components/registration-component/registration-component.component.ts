import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelfieDialogComponent } from '../selfie-dialog/selfie-dialog.component';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { DeviceInfo } from '../constances/deviceInfo';
import { RegistrationService } from 'src/app/services/registration.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  preferredNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  middleNameFormControl = new FormControl('', [
  ]);

  matcher = new MyErrorStateMatcher();

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  idNumberFormControl = new FormControl('', [
    Validators.required
  ]);

  titles = [
    { value: 'Mr', viewValue: 'Mr' },
    { value: 'Miss', viewValue: 'Miss' },
    { value: 'Mrs', viewValue: 'Mrs' }
  ];

  constructor(
    private dialog: MatDialog,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const requestObj = {
      appId: 'ios',
      deviceInfo: {
        applicationVersion: '1.1 (10)',
        deviceModel: 'iPhone 6 Plus',
        deviceName: 'iPhoneYK',
        deviceSerialNumber: '2B8B6D7E-3DB6-411C-A8D2-27DDEFBFD7FB',
        // tslint:disable-next-line: max-line-length
        gcmIdOrToken: 'eiGfbIZ9lE0:APA91bHNfMonJ1zQPHwVPhR2GOC29Q7631bKDcUCg4tZranqHgS684uUU8UZIME33ni7vjkiwWoU6t-w8pIKEj2mTGpvGHvw7mnKW2LSp2ywNh4cFRQcFTDPAqr2d6M0tr0qKI0Haz0l',
        latitude: -26.114071458602428,
        longitude: 28.150961855452646,
        osVersion: '12.4.6',
        phoneCountryCode: '27',
        phoneNumber: '0825140951',
        // tslint:disable-next-line: max-line-length
        text: 'DeviceInfo{phoneNumber=\'0842759330\', phoneCountryCode=\'27\', deviceSerialNumber=\'2B8B6D7E-3DB6-411C-A8D2-27DDEFBFD7FB\', gcmIdOrToken=\'eiGfbIZ9lE0:APA91bHNfMonJ1zQPHwVPhR2GOC29Q7631bKDcUCg4tZranqHgS684uUU8UZIME33ni7vjkiwWoU6t-w8pIKEj2mTGpvGHvw7mnKW2LSp2ywNh4cFRQcFTDPAqr2d6M0tr0qKI0Haz0l\', deviceModel=\'iPhone 6 Plus\', osVersion=\'12.4.6\', applicationVersion=\'1.1 (10)\', latitude=-26.114071458602428, longitude=28.150961855452646, deviceName=\'iPhoneYK\'}'
      },
      idNumber: this.idNumberFormControl.value,
      ipAddress: 'null',
      preferredName: this.preferredNameFormControl.value,
      traceId: ''
    };

    this.registrationService.register(requestObj).subscribe(response => {
      console.log('Success: ', response);
    }, error => {
      console.log(error);
    });
  }

  takePic() {
    this.dialog.open(SelfieDialogComponent);
  }

  takeVid() {
    this.dialog.open(VideoDialogComponent);
  }
}
