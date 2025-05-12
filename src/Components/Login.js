import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
  const [credentials, setCredentials] = useState({email: "", password: ""});

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
       body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);

    // success is working in backend/auth.js 
    if(json.success == true){
      //save the auth token and redirect
      localStorage.setItem('token',json.authToken);
      navigate("/");
      props.showAlert("Successfully Logged in","success")

    }else{
      props.showAlert("Invalid Credentials","danger")
    }
    
  }

  const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={credentials.email}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" placeholder=" Password" id="password" name='password'  onChange={onChange}value={credentials.password}/>
          </div>

          <button type="submit" className="btn btn-primary" >Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
