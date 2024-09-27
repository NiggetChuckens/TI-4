import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-repartidor',
  templateUrl: './add-repartidor.page.html',
  styleUrls: ['./add-repartidor.page.scss'],
})
export class AddRepartidorPage {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  vehiclePlate: string = '';
  profileImage: string | null = null; // Nueva propiedad para la imagen
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(private navCtrl: NavController) {}

  handleAddRepartidor() {
    if (this.password.length < 6) {
      this.isError = true;
      this.message = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.isError = true;
      this.message = 'Las contraseñas no coinciden.';
      return;
    }
    this.isLoading = true;
    const repartidorData = {
      nombre: this.fullName.split(' ')[0],
      apellido: this.fullName.split(' ')[1] || '',
      email: this.email,
      contraseña: this.password,
      vehiclePlate: this.vehiclePlate,
      profileImage: this.profileImage, // Incluimos la imagen
    };

    // Simulación de respuesta exitosa o de error (sin conexión con la BD por ahora)
    setTimeout(() => {
      this.isLoading = false;
      this.isError = false;
      this.message = 'Repartidor registrado correctamente.';
      // Limpieza del formulario
      this.resetForm();
    }, 2000);
  }

  selectProfileImage() {
    // Lógica para seleccionar imagen (por ahora no funcional)
    console.log('Seleccionar imagen de perfil (a implementar)');
    // Puedes usar el plugin de Capacitor Camera o input file para seleccionar la imagen
  }

  // Método para retroceder a la página de repartidores
  goBack() {
    this.navCtrl.navigateBack('/tabs/repartidores');
  }

  // Método para resetear el formulario
  resetForm() {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.vehiclePlate = '';
    this.profileImage = null;
  }
}
