from django.db import models


class Event(models.Model):
    date = models.CharField(max_length = 50) 
    title = models.CharField(max_length = 100) 
    description = models.CharField(max_length = 10000) 
    start = models.CharField(max_length = 8, blank=True)
    end = models.CharField(max_length = 8, blank=True) 
    allDay = models.CharField(max_length=5, blank=True) 

