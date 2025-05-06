import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';


export default function App() {
  return (
    <>
    <NoteState >
      
    <Router>

      <Navbar />
      <Alert message="this is amazing react course" />
      <div className="container">

        <Routes>
          {/* <Route path="/about">
            <About />
            </Route>  old method doesnot work*/ }

          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
         
        </Routes>
      </div>
    </Router>

    </NoteState>
    </>
  )
}
