import { Component, OnInit } from '@angular/core';

interface OrderStep {
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  orderSteps: OrderStep[] = [
    { title: 'Order Placement', description: 'The order is confirmed and payment received.', completed: true },
    { title: 'Order Processing', description: 'We are processing the order.', completed: true },
    { title: 'Packaging', description: 'Your items are being packaged.', completed: true },
    { title: 'Shipping', description: 'Your package has been shipped.', completed: false },
    { title: 'Transit', description: 'The package is in transit.', completed: false },
    { title: 'Delivery', description: 'Package delivered at the destination address.', completed: false },
  ];

  constructor() {}

  ngOnInit() {}

  downloadInvoice() {
    console.log('Downloading invoice...');
    // Implement invoice download logic here
  }
}