
# Album youtube

Proyecto para crear un album con link de youtube.



## Stack Tecnológico

**Frontend:** Vue 3, Composition API, Bootstrap 5

**Server:** Node, Express

**Cloud:** Aws: Lambda, API Gateway, DynamoDB

Cabe destacar que el proyecto de backend funciona gracias al lambda, para actualizar el lambda se debe comprimir los archivos
de la carpeta backend y subirlos al lambda correspondiente.

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

Comentar y descomentar código
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
## Authors

- [@MauroloonDev](https://github.com/mauroloon)

