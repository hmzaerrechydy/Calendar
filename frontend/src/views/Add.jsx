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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';

function Add(){
    const [data, setData] = useState({}); 
  
    const navigate = useNavigate();
  
    const navigateEvents = () => {
      navigate('/events'); 
    }
    
    const navigateHome = () => {
      navigate('/'); 
    }
  
    let d = new Date(sessionStorage.getItem("date")); 
  
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
  
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
  
    let today = year + "-" + month + "-" + day; 
  
    const updateData = e => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      })
    }
  
    let startValue = sessionStorage.getItem("selectStart").slice(11,16); 
    const getStartValue = (value) => {
      let hour = value.$H.toString().padStart(2, '0');
      let minute = value.$m.toString().padStart(2, '0');
      
      startValue = hour + ":" + minute; 
    }
  
    let endValue = sessionStorage.getItem("selectEnd").slice(11,16); 
    const getEndValue = (value) => {
      let hour = value.$H.toString().padStart(2, '0');
      let minute = value.$m.toString().padStart(2, '0');

      endValue = hour + ":" + minute; 
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      data["date"] = today; 
      data["start"] = startValue; 
      data["end"] = endValue; 
      axios.post('http://127.0.0.1:8000/add/', data);  
      navigateHome(); 
    };
    
    const [isChecked, setIsChecked] = useState(true); 

    const checkHandler = () => {
      setIsChecked(!isChecked)
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
          <TextField id="standard-basic" label="Title" variant="standard" name='title'/><br/>
          <TextField id="standard-basic" label="Description" variant="standard" name='description' multiline/>
  
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker label="Start Time" onChange={(value) => getStartValue(value)} defaultValue={dayjs(sessionStorage.getItem("selectStart"))}/>
            </DemoContainer>
          </LocalizationProvider>
  
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker label="End Time" onChange={(value) => getEndValue(value)} defaultValue={dayjs(sessionStorage.getItem("selectEnd"))} />
            </DemoContainer>
          </LocalizationProvider>


          <FormControlLabel id="box" control={<Checkbox value={isChecked} name='allDay' onClick={() => checkHandler()}/>} label="All day" /><br/>
  
          <Button type="submit">Add</Button>
        </Box>
      </div>
    ); 
  }
export {Add} 