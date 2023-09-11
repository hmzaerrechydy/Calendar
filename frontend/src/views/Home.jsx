import React, { useState, useEffect} from 'react'; 
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export let globalEventData;

function Home(){
    const [events, setEvents] = useState({})
  
    const navigate = useNavigate();

    const navigateUpdate = () => {
      navigate('/update'); 
    }

    const navigateAdd = () => {
      navigate('/add'); 
    }
  
    useEffect(() => {
      axios.get("http://127.0.0.1:8000/")
        .then(res => {
          setEvents(res.data); 
      })  
    },[]); 
  
    const calendarEvents = []; 
  
    Array.from(events).map(event => {
      calendarEvents.push({
        groupId: event["id"], 
        title: event["title"], 
        date: event["date"], 
        start: `${event["date"]}T${event["start"] || '00:00'}`,
        end: `${event["date"]}T${event["end"] || '00:00'}`,
        allDay: event["allDay"] == "true" 
      })
    }); 

    const [isClicked, setIsClicked] = useState(true); 
    const [eventCardData, seteventCardData] = useState({
      id: 0,
      title: "", 
      description: "", 
      allDay: "", 
      start: "", 
      end: ""
    }); 

    const eventClickHandler = (v) => {
      setIsClicked(false)
      
      let id = v['event']['_def']['groupId']; 
      let i = calendarEvents.filter(item => item['groupId'] == id); 
      i = i[0]

      let eventData = Array.from(events).filter(el => el.id == i.groupId)[0]; 


      if(eventData.allDay == "true"){
        seteventCardData({
          date: eventData.date, 
          id: eventData.id, 
          title: eventData.title,
          description: eventData.description, 
          allDay: "true", 
          start: '00:00', 
          end: '00:00'
        })
      }else{
        seteventCardData({
          date: eventData.date, 
          id: eventData.id, 
          title: eventData.title,
          description: eventData.description, 
          start: eventData.start , 
          end:eventData.end
          
        })
      }
    }

    const deleteEvent = (id) => {
      axios.delete("http://127.0.0.1:8000/delete/", { data: { id: id }});
      window.location.reload();
    }

          
    const setGlobalEventData = (event) => {
      globalEventData = event; 
      console.log(globalEventData)
      navigateUpdate(); 
    }
    
    return(
      <div>
        <FullCalendar options= "calendarOptions" 
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay"
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin]}
          events={calendarEvents} 
          selectable={true}
          dateClick = {(d) => {navigateAdd(); sessionStorage.setItem("date", d['date'])}}
          eventClick={(v) => eventClickHandler(v)}
          select={(date) => {
            sessionStorage.setItem("selectStart", date.startStr.slice(0,16));
            sessionStorage.setItem("selectEnd", date.endStr.slice(0,16));
            navigateAdd();
          }} 
        />

        <Card sx={{ minWidth: 275 }} className='card' id="eventCard" hidden={isClicked} > 
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {eventCardData.title}
                    </Typography>

                    {
                      eventCardData.allDay == "true"? 
                      <Typography sx={{ mb: 1.5 }} >
                        All day
                      </Typography>
                      :
                      <div>
                        <Typography sx={{ mb: 1.5 }} >
                          {eventCardData.start} - {eventCardData.end}
                        </Typography>
                      </div>
                    }
                    
                    <Typography variant="body2">
                      {eventCardData.description}
                    </Typography>

                  </CardContent>

                  <CardActions sx={{ display: 'flex', justifyContent: 'center' }}> 
                  <Button size="small" onClick={() => setIsClicked(true)}>Hide</Button>
                  <Button size="small" onClick={() => setGlobalEventData(eventCardData)}>Update</Button>
                  <Button size="small" onClick={() => deleteEvent(eventCardData.id)}>Delete</Button>
                  </CardActions>
            </Card>
          
      </div>
        )
}


export {Home} 

