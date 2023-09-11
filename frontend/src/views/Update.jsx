import React, {useState} from 'react'; 
import axios from 'axios'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { globalEventData } from './Home';

function Update(){

    const [isChecked, setIsChecked] = useState(globalEventData['allDay'] == "true"); 

    const checkHandler = () => {
      setIsChecked(!isChecked)
    }

    const updateData = e => {
      globalEventData[e.target.name] = e.target.value
    }
    
    let startValue; 
    const getStartValue = (value) => {
      let hour = value.$H.toString().padStart(2, '0');
      let minute = value.$m.toString().padStart(2, '0');
      
      startValue = hour + ":" + minute; 

    }
  
    let endValue; 
    const getEndValue = (value) => {
      let hour = value.$H.toString().padStart(2, '0');
      let minute = value.$m.toString().padStart(2, '0');

      endValue = hour + ":" + minute; 
    }
  
    const navigate = useNavigate();

    const navigateHome = () => {
      navigate('/'); 
    }
    
    const handleSubmit = (e) => {
      e.preventDefault(); 
      globalEventData["start"] = startValue || globalEventData["start"]; 
      globalEventData["end"] = endValue || globalEventData["end"]; 
      globalEventData["allDay"] = isChecked + ""; 
      axios.put('http://127.0.0.1:8000/update/', globalEventData); 
      navigateHome(); 
    }
    
    let chaked = false; 
    if(globalEventData["allDay" == "true"]){
      chaked = true; 
    }

    return(
      <div>
        <header>
          <Button onClick={navigateHome}>Home</Button>
        </header>
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        id='addEventForm' onSubmit={handleSubmit} onChange={updateData}>
  
          <TextField id="standard-basic" label="Title" variant="standard" name='title' defaultValue={globalEventData["title"]}/><br/>
          <TextField id="standard-basic" label="Description" variant="standard" name='description' defaultValue={globalEventData["description"]} multiline/>
  
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="Start Time" onChange={(value) => getStartValue(value)} defaultValue={dayjs(`${globalEventData["date"]}T${globalEventData["start"]}`)}  />
          </DemoContainer>
        </LocalizationProvider>
  
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="End Time" onChange={(value) => getEndValue(value)} defaultValue={dayjs(`${globalEventData["date"]}T${globalEventData["end"]}`)}/>
          </DemoContainer>
        </LocalizationProvider>

        <FormControlLabel id="box" control={<Checkbox defaultChecked={globalEventData['allDay'] == "true"? true : false}   value={isChecked} name='allDay' onClick={() => checkHandler()}/>} label="All day" /><br/>
  
        <Button type="submit">Update</Button>
      </Box>
      </div>
    ); 
  }

export {Update} 