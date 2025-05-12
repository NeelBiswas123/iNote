import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({username:"",email: "", password: "", cpassword:""});

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const {username,email,password}=credentials;
    const url = "http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({username,email,password }),
    });
    const json = await response.json();
    console.log(json);

    // success is working in backend/auth.js 
    if (json.success == true) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Successfully Account Created","success")

    } else {
      props.showAlert("Email already exists","danger")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <>
      <div>
        <>
          <div className='container'>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="text">Enter Name : </label>
                <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter your name" onChange={onChange} value={credentials.username} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={credentials.email} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" placeholder=" atleast 5 chracter Password" id="password" name='password' onChange={onChange} value={credentials.password} minLength={5} required/>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="cpassword"> Confirm Password</label>
                <input type="cpassword" className="form-control" placeholder=" Retype Password" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} minLength={5} required />
              </div>

              <button type="submit" className="btn btn-primary" >Sign Up</button>
            </form>
          </div>
        </>
      </div>
    </>
  )
}

export default Signup
