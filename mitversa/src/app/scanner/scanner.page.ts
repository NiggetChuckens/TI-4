import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  showResult: boolean = false;
  scannedCode: string = '';
  isFlashlightOn: boolean = false;

  constructor() { }

  ngOnInit() {
    //Logica barcode scanner aqui
  }

  toggleFlashlight() {
    this.isFlashlightOn = !this.isFlashlightOn;
    // logica para la linterna aqui
    console.log('Flashlight toggled:', this.isFlashlightOn);
  }

  scanBarcode() {
    // logica para escanear codigo de barras aqui
    console.log('Scanning barcode...');
    
    // simulacion de escaneo de codigo de barras
    setTimeout(() => {
      this.scannedCode = 'EXAMPLE123456';
      this.showResult = true;
    }, 2000);
  }

  closeResult() {
    this.showResult = false;
    this.scannedCode = '';
  }
}