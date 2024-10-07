import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  scannedCode: string = '';
  isScanning: boolean = false;
  showModal: boolean = false;
  recentScans: string[] = [];

  constructor(private alertController: AlertController) {}

  async scanBarcode() {
    try {
      this.isScanning = true;
      const { barcodes } = await BarcodeScanner.scan();
      this.isScanning = false;
      if (barcodes.length > 0) {
        this.scannedCode = barcodes[0].displayValue || 'No barcode detected';
        this.addToRecentScans(this.scannedCode);
        this.showModal = true;
      } else {
        this.scannedCode = 'No barcode detected';
      }
    } catch (error) {
      console.error('Error scanning barcode:', error);
      this.scannedCode = 'Error scanning barcode';
    } finally {
      this.isScanning = false;
    }
  }

  addToRecentScans(code: string) {
    this.recentScans.unshift(code);
    if (this.recentScans.length > 5) {
      this.recentScans.pop();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  async editCode() {
    const alert = await this.alertController.create({
      header: 'Edit Code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          value: this.scannedCode,
          placeholder: 'Enter code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.scannedCode = data.code;
          }
        }
      ]
    });

    await alert.present();
  }

  editRecentScan(index: number) {
    // Implement edit logic
  }

  deleteRecentScan(index: number) {
    this.recentScans.splice(index, 1);
  }
}