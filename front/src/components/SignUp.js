import React, { useState, useContext, useEffect } from 'react'
import noteContext from '../context/Createcontext'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const SignUp = () => {
  // for alerts
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const c = useContext(noteContext);

  const [cred, setCred] = useState({
    name: "",
    mail: "",
    password: "",
    confirmPassword: ""
  })
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cred.password !== cred.confirmPassword) {
      console.log("enter correct password");
      // giving alert
      setAlertMessage("Password does not match");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
    else {
      let result = await c.signUp(cred.name, cred.mail, cred.password);
      if (result.length === 0) {
        c.setLoggedIn(true);
        navigate('/');
      }
      else {
        setAlertMessage(result);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      }
    }
  }
  return (
    <>
      <div className='container my-5'>

        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control-plaintext" placeholder="Enter your name" name='name' onChange={onChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="email@example.com" name='mail' onChange={onChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" name='password' onChange={onChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Confirm Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" name='confirmPassword' onChange={onChange} />
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Login</button>
        </div>
        {alert && <Alert message={alertMessage} />}
      </div>
    </>
  )
}

export default SignUp