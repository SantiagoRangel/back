# Backend
Backend server

Hay que tener instalado postgress y crear la base de datos para que el nombre de la base de datos, el username y password estén configurados igual que en archivo llamdo ormconfig

El proyecto corre en el puerto 8080. En este se puede están incluidas las rutas de la prueba:

a. POST: /users

ejemplo: 

b. POST: /users/login

ejemplo: 

```yaml
{
    "email": "adrian@hotmail.com",
    "password": "adrian"
}
```


c. POST: /restaurants

d. GET: /transaction

e. POST: /users/logout
