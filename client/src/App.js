import React, { useState, useEffect } from "react";
import Axios from 'axios';
import GoogleMap from './components/GoogleMap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState("");
const [login1, setLogin1] = useState(false)

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const [loginStatus, setLoginStatus] = useState("");
const [loginStatus1, setLoginStatus1] = useState("");

Axios.defaults.withCredentials = true;
const register = () => {
  Axios.post('http://localhost:3001/register', {
    username: usernameReg,
    password: passwordReg,
  }).then((response)=>{
    if (response.data.message){
      setLoginStatus1(response.data.message)
    };
  });
};

const login = () => {
  Axios.post('http://localhost:3001/login', {
    username: username,
    password: password,
  }).then((response)=>{
    if (response.data.message){
      setLoginStatus(response.data.message)
    }
    else {
      setLoginStatus(response.data[0].username);
    } 
  });
  //lol

};

useEffect(()=>{
  Axios.get("http://localhost:3001/login").then((response)=>{
   if (response.data.loggedIn === true){
    // setLoginStatus(response.data.user[0].username);
    setLogin1(true)
   } 
  });
},);


  return (
    login1=== false ?  
    <div className="whole">
    <section className="vh-100 login" style={{backgroundColor: 'white'}}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{borderRadius: '1rem'}}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img src= "./eating.jpg"
                  alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} style={{padding: '5px'}} />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
  
                  <form>
  
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                      <span className="h1 fw-bold mb-0" style={{fontSize: '60px'}}>Grubby</span>
                    </div>
  
                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
  
                    <div className="form-outline mb-4">
                      <input type="text" onChange={(e)=>{setUsername(e.target.value);}} className="form-control form-control-lg" />
                      <label className="form-label　input" htmlFor="form2Example17">Username</label>
                    </div>
  
                    <div className="form-outline mb-4">
                      <input type="password" onChange={(e)=>{setPassword(e.target.value);}} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form2Example27">Password</label>
                    </div>
  
                    <div className="pt-1 mb-4">
                      <button className="btn btn-dark btn-lg btn-block" type="button" onClick={login}>Login</button>
                    </div>
                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#register">Register here</a></p>
                  </form>
                  <h1 className = "login">{loginStatus}</h1>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      <section className="vh-100" id="register" style={{backgroundColor: 'white'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{borderRadius: '1rem'}}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
    
                    <form>
    
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                        <span className="h1 fw-bold mb-0">Grubby</span>
                      </div>
    
                      <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Create a new account!</h5>
    
                      <div className="form-outline mb-4">
                        <input type="text" onChange={(e)=>{setUsernameReg(e.target.value);}} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form2Example17">Username</label>
                      </div>
    
                      <div className="form-outline mb-4">
                        <input type="password" onChange={(e)=>{setPasswordReg(e.target.value);}} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>
    
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={register}>Register</button>
                      </div>
                    </form>

                  </div>
                </div>
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={require('./eating.jpeg').default}
                    alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} style={{padding: '5px'}}/>
                </div>
              </div>
              <h1 className = "registration">{loginStatus1}</h1>
            </div>
          </div>
        </div>

      </div>
    </section>
    </div>
        : <GoogleMap/>

  )
}
export default App;
