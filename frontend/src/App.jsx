import './App.css';
import React from 'react'; 
import {Routes, Route} from 'react-router-dom';
import {Home} from './views/Home'; 
import {Add} from './views/Add'; 
import {Update} from './views/Update'; 


function App(){
    return(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
        </Routes>
    )
}


export default App;