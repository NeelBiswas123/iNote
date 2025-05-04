import React from 'react'

import { useContext } from 'react'
// import NoteState from '../Context/notes/NoteState'
import noteContext from '../Context/notes/NoteContext'

const About = () => {
  const a = useContext(noteContext)
  return (
    <div>
      this is about {a.name} and he is in class {a.class} 
    </div>
  )
}

export default About
