import { React, useContext } from 'react'
import noteContext from '../context/Createcontext'
const About = () => {
  const c= useContext(noteContext)
  return (
    <>
      <div>About</div>
    </>
  )
}

export default About