import { Component } from '@angular/core';

@Component({
  selector: 'app-product-scanner',
  templateUrl: './product-scanner.page.html',
  styleUrls: ['./product-scanner.page.scss'],
})
export class ProductScannerPage {
  quantity: number = 89;

  constructor() {}

  handleScan() {
    // Implement QR code scanning logic here
    console.log('Scanning QR code');
  }

  handleAddQuantity() {
    // Implement add quantity logic here
    console.log('Adding quantity:', this.quantity);
  }

  updateQuantity(event: any) {
    this.quantity = event.detail.value;
  }
}