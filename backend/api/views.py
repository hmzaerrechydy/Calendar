from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from events.models import Event
from .serializers import EventSerializer

@api_view(['GET']) 
def getEvent(request): 
    events = Event.objects.all() 
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data) 

@api_view(['POST'])
def addEvent(request): 
    serializer = EventSerializer(data=request.data) 
    if serializer.is_valid(): 
        serializer.save()
    return Response(serializer.data)  

@api_view(['DELETE']) 
def deleteEvent(request): 
    Event.objects.filter(id = request.data['id']).delete()
      
@api_view(['PUT']) 
def updateEvent(request):
    Event.objects.filter(id = request.data['id']).update(title=request.data['title'], description=request.data['description'], start=request.data['start'], end=request.data['end'], allDay=request.data['allDay'])