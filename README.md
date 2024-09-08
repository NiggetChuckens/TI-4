# Configuración del Proyecto

## Prerrequisitos
- Python 3.x
- Django
- MySQL

## Configuración del Proyecto

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/NiggetChuckens/TI-4.git
   cd ti-4
   ```

2. **Crear un entorno virtual:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # En Windows use `venv\Scripts\activate`
   ```

3. **Instalar los paquetes requeridos:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Configurar la base de datos:**
   Abra el archivo `settings.py` en su proyecto Django y actualice la configuración de `DATABASES` para que coincida con su configuración de MySQL:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'nombre_de_tu_base_de_datos',
           'USER': 'usuario_de_tu_base_de_datos',
           'PASSWORD': 'contraseña_de_tu_base_de_datos',
           'HOST': 'host_de_tu_base_de_datos',
           'PORT': 'puerto_de_tu_base_de_datos',
       }
   }
   ```

5. **Aplicar las migraciones:**
   ```sh
   python manage.py migrate
   ```

6. **Crear un superusuario:**
   ```sh
   python manage.py createsuperuser
   ```

7. **Ejecutar el servidor de desarrollo:**
   ```sh
   python manage.py runserver
   ```

## Comandos de Django

Aquí hay algunos comandos útiles de Django para gestionar el proyecto:

- **Crear migraciones:**
  ```sh
  python manage.py makemigrations
  ```

- **Aplicar migraciones:**
  ```sh
  python manage.py migrate
  ```

- **Crear un superusuario:**
  ```sh
  python manage.py createsuperuser
  ```

- **Ejecutar el servidor de desarrollo:**
  ```sh
  python manage.py runserver
  ```

- **Abrir el shell de Django:**
  ```sh
  python manage.py shell
  ```

- **Recopilar archivos estáticos:**
  ```sh
  python manage.py collectstatic
  ```

## Comandos de Pruebas

Para ejecutar las pruebas en su proyecto Django, utilice los siguientes comandos:

- **Mostrar todos los datos:**
  ```sh
  python manage.py list_data
  ```

- **Eliminar todos los datos de la tabla:**
  ```sh
  python manage.py delete_data
  ```

- **Llenar la base de datos con datos de prueba:**
  ```sh
  python manage.py populate_example_data
  ```

Siga estos pasos para configurar su proyecto Django y conectarlo a la base de datos MySQL. Utilice los comandos proporcionados de Django para gestionar su proyecto de manera eficiente y ejecutar pruebas