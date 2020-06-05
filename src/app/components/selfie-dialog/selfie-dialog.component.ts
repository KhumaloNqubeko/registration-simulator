import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-selfie-dialog',
  templateUrl: './selfie-dialog.component.html',
  styleUrls: ['./selfie-dialog.component.scss']
})
export class SelfieDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  public captures: Array<any>;
  captureVideo: boolean;

  public constructor() {
    this.captures = [];
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
    this.captureVideo = true;
  }

  removeImg() {
    this.captures = [];
  }
}
