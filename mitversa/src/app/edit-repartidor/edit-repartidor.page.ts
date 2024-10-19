import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular'; // Importa AlertController y ToastController

interface Repartidor {
  name: string;
  email: string;
  patente: string;
  profilePicture: string | null;
}

@Component({
  selector: 'app-edit-repartidor',
  templateUrl: './edit-repartidor.page.html',
  styleUrls: ['./edit-repartidor.page.scss'],
})
export class EditRepartidorPage implements OnInit {
  repartidor: Repartidor = {
    name: 'Nombre de ejemplo',
    email: 'email@ejemplo.com',
    patente: 'ABC123',
    profilePicture: 'https://via.placeholder.com/150' // Imagen simulada
  };
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController, // Inyecta AlertController
    private toastController: ToastController // Inyecta ToastController
  ) {}

  ngOnInit() {
    console.log('Página de edición de repartidor visual cargada.');
  }

  async presentConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar cambios',
      message: '¿Estás seguro de que deseas guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel-button'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.saveChanges();
          }
        }
      ]
    });

    await alert.present();
  }

  async saveChanges() {
    this.isLoading = true;
    // Simulación de guardar cambios (sin lógica real)
    setTimeout(async () => {
      this.isLoading = false;
      console.log('Cambios simulados guardados:', this.repartidor);

      // Muestra el mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Tus cambios se han realizado exitosamente.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();

      this.navCtrl.navigateBack('/tabs/repartidores');
    }, 2000);
  }

  selectProfileImage() {
    console.log('Seleccionar imagen de perfil (simulado).');
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/repartidores');
  }
}
