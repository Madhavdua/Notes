import React, { useState, useContext } from 'react'
import noteContext from '../context/Createcontext'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
const Login = () => {
    // for alerts
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();


    const c = useContext(noteContext);
    const [cred, setCred] = useState({
        mail: "",
        password: ""
    })
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await c.login(cred.mail, cred.password);
        if (result.length === 0) {
            c.setLoggedIn(true);

            navigate('/');
        }
        else {
            // giving alert
            setAlertMessage(result);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1000);
        }
    }
    return (
        <>
            {alert && <Alert message={alertMessage} />}
            <div className='container my-5'>

                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="email@example.com" name='mail' onChange={onChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword" name='password' onChange={onChange} />
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login