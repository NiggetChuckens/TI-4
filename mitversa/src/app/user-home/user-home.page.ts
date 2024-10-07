import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  trackingNumber: string = '';
  steps = [
    { status: 'Order Received', date: '2024-18-09', icon: 'receipt-outline' },
    { status: 'Processing', date: '2024-18-09', icon: 'cog-outline' },
    { status: 'Shipped', date: '2024-18-09', icon: 'airplane-outline' },
    { status: 'In Transit', date: '2024-19-09', icon: 'car-outline' },
    { status: 'Out for Delivery', date: '2024-20-09', icon: 'bicycle-outline' },
  ];
  currentStatus: string;

  constructor(
    private animationCtrl: AnimationController,
    private toastController: ToastController
  ) {
    this.currentStatus = '';
  }

  ngOnInit() {}

  async onSubmit() {
    if (!this.trackingNumber) {
      const toast = await this.toastController.create({
        message: 'Please enter a tracking number',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

    // Animate the button
    const button = document.querySelector('.track-button');
    if (button) {
      const animation = this.animationCtrl.create()
        .addElement(button)
        .duration(300)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(0.9)' },
          { offset: 1, transform: 'scale(1)' }
        ]);
      await animation.play();
    }

    // Show shipment status
    this.showShipmentStatus();
  }

  private showShipmentStatus() {
    if (this.trackingNumber === '1234') {
      this.currentStatus = 'In Transit';
    } else {
      this.currentStatus = 'Not Found';
    }
  }

  getStatusIcon(): string {
    switch (this.currentStatus) {
      case 'In Transit':
        return 'car-outline';
      case 'Not Found':
        return 'alert-circle-outline';
      default:
        return 'help-circle-outline';
    }
  }

  isStepActive(step: any): boolean {
    const statusIndex = this.steps.findIndex(s => s.status === this.currentStatus);
    const stepIndex = this.steps.indexOf(step);
    return stepIndex <= statusIndex;
  }
}