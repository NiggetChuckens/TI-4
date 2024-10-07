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
    // Chequear si el escáner es soportado
    this.checkScannerSupport();
  }

  async checkScannerSupport() {
    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      console.error('El escáner de códigos de barras no es soportado en este dispositivo.');
    }
  }

  // Función para escanear un código de barras
  async scanBarcode() {
    console.log('Iniciando escaneo de código de barras...');

    try {
      document.querySelector('body')?.classList.add('barcode-scanner-active');

      // Mostrar la vista previa de la cámara
      const cameraFeed = document.getElementById('cameraFeed');
      if (cameraFeed) {
        cameraFeed.style.display = 'block';
      }

      const listener = await BarcodeScanner.addListener('barcodeScanned', async result => {
        console.log(result.barcode);
        this.scannedCode = result.barcode.displayValue || ''; // Guardar el código escaneado
        this.showResult = true; // Mostrar el modal al escanear
        await listener.remove(); // Remover el listener después de escanear
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
        await BarcodeScanner.stopScan(); // Detener el escáner después de leer el código
      });

      await BarcodeScanner.startScan(); // Iniciar el escaneo
    } catch (error) {
      console.error('Error durante el escaneo de código de barras:', error);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
    }
  }

  // Función para cerrar el modal de resultado
  closeResult() {
    this.showResult = false;
    this.scannedCode = '';
  }
}
