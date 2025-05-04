import React from 'react'

import { useContext,useEffect } from 'react'

import noteContext from '../Context/notes/NoteContext'

const About = () => {
  const a = useContext(noteContext)
  
  {/* use useEffect hook to accesss update  */}
  useEffect(()=>{
    a.update()
  },[])


  return (
    <div>
      {/* this is about {a.name} and he is in class {a.class}  */}
      this is about {a.state.name} and he is in class {a.state.class} 


   

    </div>
  )
}

export default About
