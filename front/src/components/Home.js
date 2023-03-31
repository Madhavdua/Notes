import React,{ useState,useContext } from 'react'
import Addnote from './Addnote'
import Navbar from './Navbar';
import Notes from './Notes'
import Welcome from './Welcome';
import noteContext from '../context/Createcontext';


const Home = () => {
  const c=useContext(noteContext)
  const {loggedIn, setLoggedIn} = c;
  return (
    <>
      {!loggedIn &&  <Welcome/>}

      {loggedIn &&  <Navbar/>}
      {loggedIn &&  <div className='container my-4'><h5>Please Add Some Notes</h5></div>}
      {loggedIn &&  <Addnote />}
      {loggedIn&&   <Notes />}
      
      

    </>
  )
}

export default Home