import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  trackingNumber: string = '';
  steps: { status: string; date: string; icon: string }[] = [];
  currentStatus: string = '';
  estadosEnvio: { [key: number]: string } = {};
  shipmentFound: boolean = false;

  constructor(
    private animationCtrl: AnimationController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.fetchEstadosEnvio();
  }

  fetchEstadosEnvio() {
    fetch(`${environment.apiUrl}/api/estados-envio`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.estadosEnvio = {};
        data.forEach((estado: any) => {
          this.estadosEnvio[estado.id_estado_envio] = this.formatStatus(estado.nombre);
        });
        console.log('Diccionario de estados de envío:', this.estadosEnvio);
      })
      .catch(error => {
        console.error('Error al obtener los estados de envío:', error);
      });
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  async onSubmit() {
    if (!this.trackingNumber) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingresa un número de seguimiento',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

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

    this.fetchEnvioStatus();
  }

  fetchEnvioStatus() {
    fetch(`${environment.apiUrl}/api/envios/${this.trackingNumber}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const estadoEnvioId = data.id_estado_envio;
        this.currentStatus = this.estadosEnvio[estadoEnvioId] || 'No encontrado';
        this.shipmentFound = this.currentStatus !== 'No encontrado';
        console.log('Estado del envío:', this.currentStatus);
        if (this.shipmentFound) {
          this.updateSteps(estadoEnvioId);
          this.updateStepDates(data);
        } else {
          this.steps = [];
        }
      })
      .catch(error => {
        console.error('Error al obtener el estado del envío:', error);
        this.currentStatus = 'No encontrado';
        this.shipmentFound = false;
        this.steps = [];
      });
  }

  updateSteps(currentStateId: number) {
    if (this.shipmentFound) {
      const allSteps = [
        { status: 'Orden recibida', icon: 'receipt-outline' },
        { status: 'Procesando', icon: 'cog-outline' },
        ...Object.entries(this.estadosEnvio)
          .filter(([id, _]) => parseInt(id) <= currentStateId)
          .map(([_, status]) => ({
            status,
            icon: this.getStatusIcon(status)
          }))
      ];
      this.steps = allSteps.map(step => ({
        ...step,
        date: ''
      }));
    } else {
      this.steps = [];
    }
  }

  updateStepDates(data: any) {
    if (data && data.fecha_actualizacion) {
      const currentDate = new Date(data.fecha_actualizacion);
      this.steps.forEach((step, index) => {
        step.date = new Date(currentDate.getTime() - (this.steps.length - 1 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      });
    } else {
      this.steps.forEach(step => step.date = '');
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'en tránsito':
        return 'car-outline';
      case 'entregado':
        return 'checkmark-circle-outline';
      case 'cancelado':
        return 'close-circle-outline';
      case 'pendiente':
        return 'time-outline';
      case 'orden recibida':
        return 'receipt-outline';
      case 'procesando':
        return 'cog-outline';
      default:
        return 'car-outline';
    }
  }

  isStepActive(step: any): boolean {
    const statusIndex = this.steps.findIndex(s => s.status === this.currentStatus);
    const stepIndex = this.steps.indexOf(step);
    return stepIndex <= statusIndex;
  }
}