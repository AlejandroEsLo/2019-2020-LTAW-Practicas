# -- Fichero mi_tienda/admin.py
from django.contrib import admin
from tienda_peces.models import Producto
from tienda_peces.models import Pedido

admin.site.register(Producto)
admin.site.register(Pedido)
