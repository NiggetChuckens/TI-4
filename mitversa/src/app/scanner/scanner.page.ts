import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod'; // Importa la dirección ip del api en django

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
  scanResult: any = null;

  constructor(private alertController: AlertController, private http: HttpClient) {
    this.fetchAllEnvios(); // Llama a la función para obtener todos los envíos al inicializar el componente
  }

  async scanBarcode() {
    try {
      this.isScanning = true;
      const { barcodes } = await BarcodeScanner.scan();
      this.isScanning = false;
      if (barcodes.length > 0) {
        this.scannedCode = barcodes[0].displayValue || 'No barcode detected';
        this.addToRecentScans(this.scannedCode);
        this.fetchScanResult(this.scannedCode);
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

  fetchScanResult(code: string) {
    fetch(`${environment.apiUrl}/api/envios/${code}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // Agregar la cabecera para evitar el error de CORS
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del servidor:', data); // Verifica los datos recibidos del servidor
        this.scanResult = data;
      })
      .catch(error => {
        console.error('Error al obtener los datos del envío:', error);
      });
  }

  fetchAllEnvios() {
    fetch(`${environment.apiUrl}/api/envios/1`, { // URL ajustada para obtener el envío con ID 1
      headers: {
        'ngrok-skip-browser-warning': 'true' // Agregar la cabecera para evitar el error de CORS
      }
    })
      .then(response => response.json())
      .then(async data => {
        const envios = Array.isArray(data) ? data : [data]; // Asegúrate de que data es un array
  
        const enviosConDetalles = await Promise.all(envios.map(async (envio: any) => {
          const estado = await this.fetchDetail(`${environment.apiUrl}/api/estados-envio/1`);
          const cliente = await this.fetchDetail(`${environment.apiUrl}/api/usuarios/1`);
          const direccionDestino = await this.fetchDetail(`${environment.apiUrl}/api/direcciones/1`);
          const direccionOrigen = await this.fetchDetail(`${environment.apiUrl}/api/direcciones/2`);
  
          return {
            ...envio,
            estado: estado.nombre,
            cliente: cliente.nombre,
            direccionDestino: direccionDestino.nombre,
            direccionOrigen: direccionOrigen.nombre
          };
        }));
  
        console.log('Todos los envíos:', enviosConDetalles); // Imprime todos los envíos en la consola con nombres
        console.log('Resultado del envío con ID 1:', enviosConDetalles[0]); // Imprime el resultado del envío con ID 1
      })
      .catch(error => {
        console.error('Error al obtener todos los envíos:', error);
      });
  }
  
  fetchDetail(url: string) {
    return fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // Agregar la cabecera para evitar el error de CORS
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.error(`Error al obtener detalles desde ${url}:`, error);
        return { nombre: 'Desconocido' }; // Valor por defecto en caso de error
      });
  }
}