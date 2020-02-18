# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint

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
