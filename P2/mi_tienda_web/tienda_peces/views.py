# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint
from tienda_peces.models import Producto
from tienda_peces.models import Pedidos

# Create your views here.
def index(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'index.html', {'numero':str(numero)})

def producto1(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'producto1.html', {'numero':str(numero)})

def producto2(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'producto2.html', {'numero':str(numero)})

def producto3(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'producto3.html', {'numero':str(numero)})

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
    p = Pedidos(nombre=persona, articulo=articulo)
    p.save()
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona} + {articulo}")
    return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre']+ request.POST['articulo'])

def pedidos(request):
    pedidos = Pedidos.objects.all()
    return render(request, 'pedidos.html', {'pedidos':pedidos})
