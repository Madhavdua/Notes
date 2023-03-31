import React from 'react'
import { Link } from 'react-router-dom';
import backgroundImage from '../bg.jpg'
import backgroundVideo from '../bg.mp4'
const Welcome = () => {
    return (
        <>
            <div className='py-5'>
                <div className="d-flex container flex-column">
                    <div className="head display-1 fw-bold mt-5 mx-4" >
                        HELLO
                    </div>
                    <div className="line mt-2 mx-4 w-75" style={{ color: "rgb(128, 135, 130)" }}>
                    Note making is not just about writing down everything you hear or read. It is a process of reviewing, connecting and synthesising ideas from your lectures or reading
                    </div>
                    <div className="loginLink">
                        <Link className="btn fw-semibold mx-4 mt-3 w-25 text-white" style={{ backgroundColor: "rgb(150, 149, 240)" }} to="/login" role="button">Login</Link>
                    </div>
                    <div className="havent mx-5 my-2 text-white">Haven't sign up? <Link to="/signup" className="badge badge-primary fs-6 text-decoration-none">Sign Up</Link></div>
                </div>

            </div>
        </>
    )
}

export default Welcome