import { useState} from "react";
import noteContext from '../context/Createcontext'


const Note = (props) => {
// for login status
  const [loggedIn, setLoggedIn] = useState(false);

const [notes, setNotes] = useState([])
const host="http://localhost:5000"

const noBodyReq=async(route,method)=>{
  let url=`${host+route}`;
      let response=await fetch(url,{
        method:method,
        headers:{
          "Content-Type": "application/json",
          "auth-token":`${localStorage.getItem('token')}`
        }
      })
      let result=await response.json()
      return result;
}
const bodyReq=async(route,method,body)=>{
  let url=`${host+route}`;
      let response=await fetch(url,{
        method:method,
        headers:{
          "Content-Type": "application/json",
          "auth-token":`${localStorage.getItem('token')}`
        },
        body:body
      })
      // let result=await response.json()
      return response;
}

    const fetchNotes=async ()=>{
      let route='/api/notes/fetchnotes'
      let result=await noBodyReq(route,'GET');
      setNotes(result);
    }
      
      const addNote=async(title,description,comments)=>{
        let route='/api/notes/addnote';
        let data=JSON.stringify({title:title,description:description,comments:comments});

        await bodyReq(route,'POST',data);
        fetchNotes();
      }


// ****
      const deleteNote=async(id)=>{
        let route=`/api/notes/deletenote/${id}`;
        await noBodyReq(route,'DELETE');
        fetchNotes();
      }

// ****** 
      const editNote=async(id,title,description,comments)=>{
        let route=`/api/notes/updatenote/${id}`;
        let data=JSON.stringify({title:title,description:description,comments:comments});

        await bodyReq(route,'PUT',data);
        fetchNotes();

      }

// Auth context




const apiCall = async (route, body) => {
  let url = `${host + route}`;
  let response = await fetch(url, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: body
  })
  let json=await response.json();
  // console.log(json);
  let arr=[];
  if(json.success===true){
    localStorage.setItem('token',json.authToken);
  }
  else{
    arr.push(json.error)
  }
  return arr;
  
}

const login = async (mail, password) => {
  let route = '/api/auth/login';
  const body = JSON.stringify({ mail: mail, password: password });
  return await apiCall(route, body);
}

const signUp=async(name,mail,password)=>{
  let route='/api/auth/createuser';
  const body = JSON.stringify({name:name,mail:mail,password:password});
  return await apiCall(route,body);
}


    return(
        <>
        <div>
        < noteContext.Provider value ={{notes,setNotes,fetchNotes,addNote,editNote,deleteNote,login,signUp,loggedIn,setLoggedIn}} >
            { props.children }
        </noteContext.Provider >

        </div>
        </>

    )
}
export default Note;