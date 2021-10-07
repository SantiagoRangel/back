# Backend
Backend server hecho con Express y Postgress.

Para ejecutar el proyecto hay que ejecutar npm install y también hay que tener instalado postgress para luego crear la base de datos para que el nombre de la base de datos, el username y password estén configurados igual que en el archivo llamado ormconfig.

Para ejecutar los tests, se debe tener corriendo el proyecto usando npm start y paralelamente ejecutar npm jest.

El proyecto corre en el puerto 8080. En este se puede están incluidas las rutas de la prueba:

a. POST: /users

ejemplo: 

```yaml
{
    "name": "Adrian",
    "email": "adrian@hotmail.com",
    "password": "adrian"
}
```

b. POST: /users/login

ejemplo: 

```yaml
{
    "email": "adrian@hotmail.com",
    "password": "adrian"
}
```


c. POST: /restaurants

ejmeplo:

```yaml
{
    "lat": "28.533213",
    "long": "-81.361800",
    "distance": "2"
}
```

d. GET: /transaction

e. POST: /users/logout

ejmeplo:

```yaml
{
     "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTE3YTQ3LWZiNGQtNTc5Ny1iNTc0LTA2OTc0MTAxM2I0YiIsImVtYWlsIjoiYWRyaWFuQGhvdG1haWwuY29tIiwiaWF0IjoxNjMzNTY4MjE5fQ.PVipnmc4aErcG6V-7zz8zLI232iYK-qZI-E0fR49PY5P4axmLNSmt8G5CFftfrxg7PTimDgfYLBn6X5vpUa4qrJ-DxUHkXEq9s38_WreF_ZJru6bAe646sECf6iLIUa0G60CIVi_sxGxmcGUJiDeuv7mSnJU4RQ0B9VNnzE-M1A"
}
```
