# Práctica 2 : SERVIDOR CON DJANGO
Funcionamiento de mi tienda de peces:

1) Para arrancar el servidor desde la carpeta mi_tienda_web y ahi ejecutamos el server:

      python3 manage.py runserver

2) Desde el navegador nos conectamos a localhost:8000/tienda_peces/
    Por defecto nos cargara nuestro index principal de la tienda con los
    3 productos que componen nuestra tienda, o también:
      localhost:8000/tienda_peces/producto1
      localhost:8000/tienda_peces/producto2
      localhost:8000/tienda_peces/producto3

3) Para ver cada producto pinchar en el botón que hay debajo de cada imagen
    y nos accederá a esos productos respectivamente.

4) Para ver el listado de productos localhost:8000/tienda_peces/list

5) Para ver el listado de pedidos localhost:8000/tienda_peces/pedido

6) Para realizar un pedido, pinchar en el boton de "Hacer un pedido" en la
    página principal o entrar a traves de: localhost:8000/tienda_peces/formulario/

7) Para administrar productos y pedidos lo haremos a traves de :
    localhost:8000/admin

ANEXOS:

1)Para crear un modelo nuevo de producto, creamos un nuestro modelo en tienda_peces/models.py.

  Para aplicar los cambios, y que se configure la base de datos con nuestro modelos, hay que ejecutar dos comandos.

  Primero este:
    python3 manage.py makemigrations

  Y ahora el que lo vuelca todo a la base de datos:
    python3 manage.py migrate

  Y después introducimos los productos en localhost:8000/admin o por linea de comandos en python3.
