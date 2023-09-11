from django.urls import path
from . import views

urlpatterns = [
    path('', views.getEvent), 
    path('add/', views.addEvent), 
    path('delete/', views.deleteEvent), 
    path('update/', views.updateEvent) 
]