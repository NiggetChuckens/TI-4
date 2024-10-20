// Para ApiUrl se puede utilizar http o https según corresponda
// Para el entorno de desarrollo exclusivamente en web se puede utilizar HTTP
// Para el entorno de desarrollo en android se debe utilizar HTTPS
// Para crear una conexión segura se puede exponer el puerto 8000 con ngrok para conectar el backend.

export const environment = {
  production: false,
  apiUrl: ' https://mitversa.christianferrer.me' // Cambiar por la url de la API
};