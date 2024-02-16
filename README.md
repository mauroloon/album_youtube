
# Album youtube

Proyecto para crear un album con link de youtube.



## Stack Tecnológico

**Frontend:** Vue 3, Composition API, Bootstrap 5

**Server:** Node, Express

**Cloud:** Aws: Lambda, API Gateway, DynamoDB


## Instalación de dependencias

Instalar proyecto con npm, versión de node **v20.11.0**
    
## Ejecutar proyecto localmente

Clonar proyecto

```bash
  git clone https://github.com/mauroloon/album_youtube.git
```

Ir al directorio del proyecto

```bash
  cd album_youtube
```

Instalar dependencias en **backend** y **frontend**

```bash
  cd frontend
  npm install
  cd ..
  cd backend
  npm install
```

Configuración de backend

Comentar y descomentar código en el archivo **backend/index.js**
```bash
    //Descomentar para probar localmente
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

    //Comentar para probar localmente
    module.exports.handler = serverless(app);
```

Iniciar **backend** o **frontend**

```bash
  npm run dev
```


## Demo

https://demoalbum.netlify.app
## Roadmap

- Separar vistas y componentes en frontend

- Separar modelo en express

- Realizar tests


## Authors

- [@MauroloonDev](https://github.com/mauroloon)


## Screenshots

- Carga de videos

![App Screenshot](https://i.postimg.cc/877WcwXT/Captura-de-pantalla-2024-02-15-224912.png)

- Agregar video

![App Screenshot](https://i.postimg.cc/B8DKcbGy/Captura-de-pantalla-2024-02-15-225014.png)

![App Screenshot](https://i.postimg.cc/7JPJkNT8/Captura-de-pantalla-2024-02-15-225046.png)

- Eliminar video

![App Screenshot](https://i.postimg.cc/MngBQRgV/Captura-de-pantalla-2024-02-15-225129.png)

![App Screenshot](https://i.postimg.cc/xJ2bsQfd/Captura-de-pantalla-2024-02-15-225142.png)

- Detalle del video 

![App Screenshot](https://i.postimg.cc/PrFXmt7C/Captura-de-pantalla-2024-02-15-225918.png)
