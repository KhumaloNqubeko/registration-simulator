import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements AfterViewInit {

  private stream: MediaStream;
  private recordRTC: any;

  @ViewChild('video') video;

  constructor() {
    // Do stuff
  }

  ngAfterViewInit() {
    // set the initial state of the video
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
    this.toggleControls();
  }

  errorCallback() {
    // handle error here
  }

  processVideo(audioVideoWebMURL) {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL((dataURL) => { });
  }

  startRecording() {
    const mediaConstraints = {
      video: true,
      audio: true,
      minWidth: 1280,
      minHeight: 720
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());

    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    // console.log(this.recordRTC.getBlob());
  }

  download() {
    // this.recordRTC.save('video.webm');
    const reader = new FileReader();
    reader.readAsDataURL(this.recordRTC.getBlob());
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
    };
  }
}
