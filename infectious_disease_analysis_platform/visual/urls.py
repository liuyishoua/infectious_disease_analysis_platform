from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='visual.index'),
    path('home.html',views.home,name='visual.home'),
    path('index.html',views.index,name='visual.index'),
    path('graph_show.html',views.graph_show,name='visual.graph_show'),
    path('third.html',views.third,name='visual.third'),
]
