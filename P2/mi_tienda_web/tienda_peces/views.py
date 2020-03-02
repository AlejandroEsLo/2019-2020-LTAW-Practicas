# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint
from tienda_peces.models import Producto
from tienda_peces.models import Pedido

# Create your views here.
def index(request):
    return render(request, 'index.html')

def producto1(request):
    # -- Obtener valores de los productos
    productos = Producto.objects.all()
    return render(request, 'producto1.html', {'precio':productos[0].precio,
    'nombre':productos[0].nombre,'stock':productos[0].stock})

def producto2(request):
    # -- Obtener valores de los productos
    productos = Producto.objects.all()
    return render(request, 'producto2.html', {'precio':productos[1].precio,
    'nombre':productos[1].nombre,'stock':productos[1].stock})

def producto3(request):
    # -- Obtener valores de los productos
    productos = Producto.objects.all()
    return render(request, 'producto3.html', {'precio':productos[2].precio,
    'nombre':productos[2].nombre,'stock':productos[2].stock})

def list(request):
    productos = Producto.objects.all()
    return render(request, 'listado.html', {'productos':productos})
#--------- Vista para formulario -----------------------
#-- Envio datos cliente
def formulario(request):
    return render(request, 'formulario.html', {})

#-- Recepcion datos clientes
def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    articulo = request.POST['articulo']
    p = Pedido(nombre=persona, articulo=articulo)
    p.save()
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona} + {articulo}")
    return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre']
    + " ---> " + "Articulo: " + request.POST['articulo'])

def pedido(request):
    pedido = Pedido.objects.all()
    return render(request, 'pedido.html', {'pedido':pedido})
