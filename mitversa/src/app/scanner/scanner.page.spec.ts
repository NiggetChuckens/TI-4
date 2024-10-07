import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  showResult: boolean = false;
  scannedCode: string = '';

  constructor() {}

  ngOnInit() {
    this.checkScannerSupport();
  }

  async checkScannerSupport() {
    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      console.error('El escáner de códigos de barras no es soportado en este dispositivo.');
    }
  }

  async scanBarcode() {
    console.log('Iniciando escaneo de código de barras...');

    try {
      document.querySelector('body')?.classList.add('barcode-scanner-active');
      const cameraFeed = document.getElementById('cameraFeed');
      if (cameraFeed) {
        cameraFeed.style.display = 'block';
      }

      const listener = await BarcodeScanner.addListener('barcodeScanned', async result => {
        console.log(result.barcode);
        this.scannedCode = result.barcode.displayValue || '';
        this.showResult = true;
        await listener.remove();
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
        await BarcodeScanner.stopScan();
      });

      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error durante el escaneo de código de barras:', error);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
    }
  }

  closeResult() {
    this.showResult = false;
    this.scannedCode = '';
  }

  updateStatus() {
    // Lógica para actualizar el estado usando scannedCode
    console.log('Updating status for code:', this.scannedCode);
    // Aquí puedes añadir el código necesario para actualizar el estado en tu sistema.
    this.closeResult(); // Cerrar el modal después de actualizar el estado
  }
}
