import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';


export default function App() {
  return (
    <>
    <NoteState >
      
    <Router>

      <Navbar />
    
      <Routes>
          {/* <Route path="/about">
            <About />
          </Route>  old method doesnot work*/ }

          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
         
        </Routes>
    </Router>

    </NoteState>
    </>
  )
}
