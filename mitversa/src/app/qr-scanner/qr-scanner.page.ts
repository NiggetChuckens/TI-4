import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit, OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  canvasElement: HTMLCanvasElement | null = null;
  videoElement: HTMLVideoElement | null = null;
  canvasContext: CanvasRenderingContext2D | null = null;
  scanActive = false;
  scanResult = '';
  loading: HTMLIonLoadingElement | null = null;

  constructor(private platform: Platform) {}

  ngOnInit() {
    // Initialization will be done in ngAfterViewInit
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  ngOnDestroy() {
    this.stopScan();
  }

  async startScan() {
    if (Capacitor.isNativePlatform()) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (this.videoElement) {
        this.videoElement.srcObject = stream;
        this.videoElement.setAttribute('playsinline', 'true');
        this.videoElement.play();
        this.scanActive = true;
        requestAnimationFrame(this.scan.bind(this));
      }
    } else {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      const imageUrl = image.dataUrl;
      if (imageUrl) {
        this.scanResult = await this.scanQRCode(imageUrl);
      }
    }
  }

  async scan() {
    if (this.videoElement && this.canvasElement && this.canvasContext) {
      if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
        this.canvasElement.height = this.videoElement.videoHeight;
        this.canvasElement.width = this.videoElement.videoWidth;

        this.canvasContext.drawImage(
          this.videoElement,
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );
        const imageData = this.canvasContext.getImageData(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          this.scanActive = false;
          this.scanResult = code.data;
        } else {
          if (this.scanActive) {
            requestAnimationFrame(this.scan.bind(this));
          }
        }
      } else {
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  }

  stopScan() {
    this.scanActive = false;
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = (this.videoElement.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  reset() {
    this.scanResult = '';
    this.scanActive = false;
  }

  private async scanQRCode(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (this.canvasElement && this.canvasContext) {
          this.canvasElement.width = img.width;
          this.canvasElement.height = img.height;
          this.canvasContext.drawImage(img, 0, 0, img.width, img.height);
          const imageData = this.canvasContext.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            resolve(code.data);
          } else {
            reject('No QR code found.');
          }
        } else {
          reject('Canvas not initialized.');
        }
      };
      img.onerror = () => {
        reject('Failed to load image.');
      };
      img.src = imageUrl;
    });
  }
}