import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('Página de edición de repartidor visual cargada.');
    // Aquí no cargamos datos de ninguna fuente externa, es solo visual.
  }

  saveChanges() {
    this.isLoading = true;
    // Simulación de guardar cambios (sin lógica)
    setTimeout(() => {
      this.isLoading = false;
      console.log('Cambios simulados guardados:', this.repartidor);
      this.navCtrl.navigateBack('/tabs/repartidores');
    }, 2000);
  }

  selectProfileImage() {
    // Lógica simulada para seleccionar una imagen (sin implementación real)
    console.log('Seleccionar imagen de perfil (simulado).');
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/repartidores');
  }
}
