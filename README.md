# EL CATENACIO

***
# INSTALACIONES NECESARIAS:

***
***

 Tener instalados en el sistema :

 * Mysql: https://www.mysql.com/ según sistema operativo lo requiera

 * Nodejs , Curl y Yarn: 


~~~
  sudo apt-get install curl

  curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs 

  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn 
~~~

# NOTA:

Una vez clonado el proyecto:

1-Otorgar privilegios a db:

~~~
   mysql> create user 'cat' identified by 'miPassword';

   mysql> grant all privileges on catenacio.* to cat;
~~~       
         

2-Ir a folder back y ejecutar:

`elCatenacio/back$ npm install`

`npm start`

3-Ir a folder front y ejecutar:

`elCatenacio/front$ npm install`

`npm start`

***
# BACK #

***
***

* Aclaración: En la terminal,al clonar el proyecto, desde la carpeta back ejecutando `npm install` y luego `npm start` se levanta la app(como se explica en *NOTA*). De querer entender el proceso de instalaciones seguir los siguientes pasos:

 1- Crear folder back `mkdir back`

 2- Crear archivos .gitignore y md .

 3- Agregar licencia MIT.

 4- Crear package.json `npm init` en folder back. Luego configurarlo con los datos del proyecto.

 5- Instalar Express,cors, y body-parser `npm install express body-parser cors --save`

 6- Crear server.js

 7- Levantar back con `npm start`

 # Persistencia:

 1. Instalaciones en back:
   
   `npm install --save sequelize`
    
   `npm sequelize --version`     :arrow_right:  6.14.5
    
   `npm install mysql2` 

   `npm install --save-dev sequelize-cli`

2.Otorgar privilegios a db:

~~~
   mysql> create user 'cat' identified by 'miPassword';

   mysql> grant all privileges on catenacio.* to cat;
~~~       
             
 3.Cliente Sequelize:

![comandosSequelize](https://user-images.githubusercontent.com/43456410/88246335-94054c00-cc70-11ea-9682-10d510559cc7.jpg)


*****

## Entonces...
***
***
Para crear una entidad por ejemplo Venta la defino dentro de back de la siguiente manera:

```javascript
"use strict";
const { Sequelize, Op, Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Venta = sequelize.define(
    "Venta",
    {
      fecha: DataTypes.DATE,
      facturado: DataTypes.BOOLEAN,
      saldoCobrado: DataTypes.INTEGER,
      montoSinCobrar: DataTypes.INTEGER,
      tipoDePago: DataTypes.STRING,
    },

    {
      tableName: "Ventas",
      modelName: "Venta",
    }
  );
  return Venta;
};
```
Integro Venta al archivo SequelizeConnection.js

```javascript
'use strict'

require('dotenv').config();


const Sequelize = require('sequelize');
const VentaModel=require('./HomePedidosCliente/Venta');


const sequelize = process.env.DB_URL
    ? 
      new Sequelize(process.env.DB_URL)
    : 
      new Sequelize(
          process.env.DB,
          process.env.DB_USER,
          process.env.DB_PASS,
          {
              host: process.env.DB_HOST,
              dialect: "mysql",
              operatorsAliases:'false',
                  pool: {
                  max: 10,
                  min: 0,
                  acquire: 30000,
                  idle: 10000
                }
          }
      );

var models={}
models=sequelize
models=Sequelize

const Venta= VentaModel(sequelize,Sequelize)


sequelize.authenticate()
 .then(() => {
   console.log('BD_CONECTADA!!');
 })
 .catch(err => {
   console.error('ERROR,_BD_NO_CONECTADA:', err);
 });

sequelize.sync({force:false})
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`)
  })




module.exports = {
  sequelize,
  Venta,
  
};
```

Luego ejecuto en la terminal:

* Aclaración:En este proyecto solo se trabajan las migraciones en una primera instancia para modificar fácilmente la base de datos,y, se utilizan los seeders para cargar la base de datos. :exclamation: :grey_exclamation: :+1: 

### Para migrar:

`npx sequelize-cli migration:generate --name Pedido`  :arrow_right: Si se quiere migrar la entidad Pedido.

`npx sequelize-cli db:migrate` :arrow_right: si se quiere migrar todas las entidades.

### Para seeders:

`npx sequelize-cli seed:generate --name Cliente`
 
  Ahora se edita el archivo que se generó `xxxxxxxxxxxx-Cliente.js` para insertar los datos a la tabla Clientes:
```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
      await queryInterface.bulkInsert('Cliente', [{
      nombre: 'Brandon',
      apellido: 'Adam',
      cuit:'27350268263',
      razonSocial:'developer',
      telefono:'2478302010',
      email:'b_adam@gmail.com',
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cliente', null, {});
  }
};
```

Luego comprometer el archivo a la base de datos:

`npx sequelize-cli db:seed:all`
        
![Captura de pantalla de 2020-09-01 22-23-06](https://user-images.githubusercontent.com/43456410/91921831-d9229200-eca2-11ea-9742-4243d4d0991c.png)

...y en la base de datos:

![Captura de pantalla de 2020-09-01 22-29-24](https://user-images.githubusercontent.com/43456410/91921975-2bfc4980-eca3-11ea-8962-39fe3dd61d3f.png)

***
# FRONT #

***
***

* Aclaración dado que el template ya está actualizado en la versión actual no es 
recomendable para este proyecto clonarlo como se muestra en el paso 1, sino que al clonar
 el proyecto ElCatenacio es preferible ir a la carpeta ´front´ y ejecutar en la terminal `npm install` directamente(como se explica en *NOTA*). :exclamation: :grey_exclamation: :+1: 

Al finalizar las instalaciones en el front ejecutar `npm start` en la terminal para levantar la app.

En caso de querer entender el proceso inicial de instalación leer lo siguiente:

1- Creando front paso a paso:

`/$ cd elCatenacio`

`/elCatenacio$ git clone https://github.com/coreui/coreui-free-react-admin-template.git front`

`/elCatenacio$ cd front`

`/elCatenacio/front$ npm install`

2-Las instalaciones necesarias en el front se guardaran en package.json,las que ya estaban cargadas alli son pertenecientes al template:

``

``

``

``

***

# TESTEANDO CON SELENIUM #

***
***
Empezando:

Documentacion: 

https://www.selenium.dev/documentation/es/getting_started/quick/

https://www.npmjs.com/package/chromedriver

https://sites.google.com/a/chromium.org/chromedriver/

1-

 `whereis google-chrome`

google-chrome: /usr/bin/google-chrome /usr/share/man/man1/google-chrome.1.gz

2- `google-chrome --version`

    Google Chrome 83.0.4103.116 


3- Crear path:

 ´export PATH=$PATH:/opt/WebDriver/bin >> ~/.profile´

4- `$ wget -P ~/ http://chromedriver.storage.googleapis.com/83.0.4103.14/chromedriver_linux64.zip`

5- `$ unzip ~/chromedriver_linux64.zip`

6- `$ chmod -x ~/chromedriver`

7- `$ sudo mv ~/chromedriver    /urs/local/share/chromedriver`

8- `$ sudo ln -s /usr/local/share/chromedriver /usr/bin/chromedriver`

9- `chromedriver --version`



***

 1- Crear carpeta ´Selenium´ fuera del proyecto.

 2- Ejecutar:

 `/$ cd Selenium`

 `/Selenium/$ npm init`

 `/Selenium/$ npm i selenium-webdriver --save`


 3- Crear archivo selenium-WebDriver.js y agregar en el mismo la url

 4- Agregar la extensión IDE para chrome 

 5- Para probar la url ejecutar `/Selenium/$ npm start`

 6- Hacer test de pruebas
 



