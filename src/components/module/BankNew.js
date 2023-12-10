import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../Constants';
import Swal from 'sweetalert2'
import Nav from '../layout/Nav';
import SideBar from '../layout/SideBar';
import Footer from '../layout/Footer';
import { useNavigate,Link } from "react-router-dom";

export default function BankNew() {

    const [errors,setErrors] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [input,setInput] = useState(
    {
        BankId: 0,        
        BankName: ''      
    });

    const clearForm=()=>
    {
        setInput(
            {
                BankId: 0,        
                BankName: '' 
            }
        )
    }
    const navigate = useNavigate();

    const handleInput=(e)=>{
        if(e.target.type === 'checkbox')
        {
        setInput( prevState=>({...prevState,[e.target.name]: e.target.checked}))
        }
        else
        {
            setInput( prevState=>({...prevState,[e.target.name]: e.target.value}))
        }
        
    }

    if(localStorage.getItem('Token') !== 'undefined')
{
  var authKey = localStorage.getItem('Token');
}

const auth = {
  headers: {
    'Authorization': 'bearer ' + authKey 
  }
}

const handleCreateBank=()=>{

  
  axios.post(`${Constants.BASE_URL}/Bank/Create`,input,auth).then(res=>{
    
    if(res.status === 200)
    {
      Swal.fire(
        'Good job!',
        'Bank is saved.',
        'success'
      )

      navigate("/Bank");
    }
      
  })
  .catch(function(error) {
    
    if(error.response.status === 401)
    {
    Swal.fire(
        'Opps! Something wrong',
        'Your session is out!',
        'error'
      )
    }
    else
    {
      Swal.fire(
        'Opps! Something wrong',
        error.message,
        'error'
      )
    }

    
  });
}

  return (
    <>
      

      <div className='container'>
        <h1 className="mt-4">Bank</h1>
        
        <div className="card col-md-12">
        <div className="card-header container-fluid bg-info">
            <div className="row">
                <div className="col-md-10 my-0">
                    New Bank
                </div>
                <div className="col-md-2 my-0 float-right">
                    <Link to="/Bank" >
                        <button className="btn btn-primary"  >List</button>                        
                    </Link>                            
                </div>
            </div>
        </div>
          
          <div className="card-body">
        
          <div className='row gx-5'>
            <div className='col-md-2 my-2'>Bank Name</div>
            <div className='col-md-10 my-1'>
                <input type="text" className="form-control" id='BankName' autoComplete="off"
                    name='BankName'  
                    value={input.BankName}
                    onChange={handleInput}
                    placeholder='Bank Name' />
            </div>

            

            <div className='col-md my-2'>
              <button type="button" className="btn btn-primary " onClick={handleCreateBank}>Save</button> 
              <button type="button" className="btn btn-secondary mx-2" onClick={clearForm} >Cancel</button>
            </div>
          </div>
        </div>
        </div>
        </div>


   
    </>
  )
}
