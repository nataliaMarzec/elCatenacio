# EL CATENACIO

***
***


EL CATENACIO es una parrilla ubicada en la localidad de Capitan Sarmiento.
La idea es poder implementar las modalidades "take away" y "delivery" para poder acceder a una mayor cantidad de personas de manera accesible.
Sirve para aumentar los servicios de comida.
Es una potente herramienta de marketing para conseguir clientes nuevos a restaurantes.
Dados que los pedidos pueden llegar en cualquier momento, es necesario tener previstos los pedidos con anticipacion.
El take away a diferencia del delivery pueden ir a buscar los mismos clientes el pedido.
El delivery la parrilla es la encargada de llevar el producto al domicilio del cliente.

## Casos de uso:

1-Registrar menues(abm)

2-Registrar clientes(abm)

3-Registrar los pedidos del cliente(abm)

4-Integrar una caja, a modo de caja registradora en la app

5-Registrar reservas de la mesa(diferencias entre carpa y no carpa)

6-Registrar menues del dia y publicarlos en la app

7-Que el cliente registre su pedido desde la mesa

8-Que el encargado de la parrilla pueda responder al cliente de mesa(avisando cuando el pedido este listo)

9-Se registran todos los datos del pedido de mesa(menu,precioUnitario,importeTotal)

10-Integrar una camara a los menues(para que pueda sacar fotos del producto al instante)

11-Integrar map para que el cliente pueda ubicar el lugar

12-Detallar los pedidos de cada mesa incluyendo quien es el empleado responsable en ese momento

13-Registros de ventas por mesa

14-Registrar eventos especiales(fiestas tradicionales,musicos)

15-Integrar Response para poder acceder desde el movil

-Integracion de mercado pago


# INSTALACIONES NECESARIAS:

***
***

 Tener instalados en el sistema :

 * Mysql:

 ~~~
 sudo apt install mysql-server
 ~~~

 * Nodejs , Curl y Yarn: 


~~~
  sudo apt-get install curl

  curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs 

  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn 
~~~

***
# BACK #

***
***

* Aclaración: En la terminal,al clonar el proyecto, desde la carpeta back ejecutando `npm install` y luego `npm start` se levanta la app. De querer entender el proceso de instalaciones seguir los siguientes pasos:

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
 el proyecto ElCatenacio es preferible ir a la carpeta ´front´ y ejecutar en la terminal `npm install` directamente. :exclamation: :grey_exclamation: :+1: 

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

 * Ver documentación.

 1- Crear carpeta ´Selenium´ fuera del proyecto.

 2- Ejecutar:

 `/$ cd Selenium`

 `/Selenium/$ npm init`

 `/Selenium/$ npm i selenium-webdriver --save`


 3- Crear archivo selenium-WebDriver.js y agregar en el mismo la url

 4- Agregar la extensión IDE para chrome 

 5- Para probar la url ejecutar `/Selenium/$ npm start`

 6- Hacer test de pruebas
