import axios from 'axios';
import React, { useState } from 'react'
import Constants from '../../../Constants';
import { BrowserRouter as Router, Routes, Route, Link,useHistory  } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




export default function Login() {

    const navigate = useNavigate();

    const [input, setImput] = useState({});
    const [passNotMatched, setpassNotMatched] = useState(false);
    const[isSubmitting, setisSubmitting] = useState(false);

    const handleInput=(e)=>{
        setImput( prevState=>({...prevState,[e.target.name]: e.target.value}));
        
    }

    const checkEnterPress =(e)=>{
        if(e.key==='Enter')
        {
            handleLogin();
        }
    }

    const  handleLogin=()=>{

        /* console.log(`${Constants.BASE_URL}`); */
        console.log(isSubmitting);
        if(!isSubmitting)
        {
            setisSubmitting(true);
            console.log(isSubmitting);
            axios.post(`${Constants.BASE_URL}/User/Login`,input).then(res=>{
                console.log(res.data); 
                localStorage.setItem('Token', res.data.Token) ;
                localStorage.setItem('RefreshToken',res.data.RefreshToken );  
                localStorage.setItem('BranchKey',21);
                
               
                navigate("/client");       
                
            })
            .catch(function(error) {

                if(error.message === 'Request failed with status code 401')
                {
                    setpassNotMatched(true);      
                }
                console.log(error);
                
            });

            
            setisSubmitting(false);
            
        }
    }

  return (
    <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        {/* <form> */}
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputId" 
                                                type={'text'}
                                                name = {'UserName'}
                                                value={input.userId}
                                                onChange={handleInput}  
                                                placeholder="User ID" />
                                                <label htmlFor="inputUserid">User Id</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword" 
                                                onChange={handleInput}
                                                onKeyDown={checkEnterPress}
                                                type={'password'}
                                                name={'Password'}
                                                value={input.password}
                                                 placeholder="Password" />
                                                <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                               
                                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                            </div>
                                            {
                                                passNotMatched && <><div className="text-danger">Password not mached</div></>
                                            }
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <button className="btn btn-primary"  onClick={handleLogin} >
                                                    {isSubmitting&& <span className="spinner-border spinner-border-sm"></span>}Login</button>
                                            </div>
                                       {/*  </form> */}
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
  )
}
