import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'
import Nav from '../../layout/Nav';
import SideBar from '../../layout/SideBar';
import Footer from '../../layout/Footer';
import { useNavigate,Link, useParams } from "react-router-dom";


export default function InsuranceCompanyEdit() {

    const params = useParams();
    //console.log(params);
    
    if(localStorage.getItem('Token') !== 'undefined')
        {
        var authKey = localStorage.getItem('Token');
        
        }

        const auth = {
        headers: {
                'Authorization': 'bearer ' + authKey 
            }
        }

        const [input, setInput] = useState([]);
    
        useEffect(()=>{
                axios.get(`${Constants.BASE_URL}/InsuranceCompany/`+ params.id, auth)
                .then(res=>{
                        setInput(res.data);
                        console.log(res.data);                    
                    }
                )
                .catch(function(error) {
        
                    
                      Swal.fire(
                        'Opps! Something wrong',
                        error.message,
                        'error'
                      )
                    
                
                    console.log(error);
                    });
    
        },[] )

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
            console.log(input);
        }

        const handleCheck=(e)=>{
        setInput( prevState=>({...prevState,[e.target.name]: Number(e.target.checked)}))
        console.log(input);
        }

        const handleUpdateCompany=()=>{

            axios.put(`${Constants.BASE_URL}/InsuranceCompany/Update`,input,auth).then(res=>{
              
              if(res.status == 200)
              {
                Swal.fire(
                  'Good job!',
                  'Bank is Updated.',
                  'success'
                )
          
                navigate("/InsuranceCompany");
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
          
              console.log(error);
              });
          }

  return (
    <>
      
      <div className='container'>
        <h1 className="mt-4">Insurance Company</h1>
        
        <div className="card col-md-12">
        <div className="card-header container-fluid bg-info">
            <div className="row">
                <div className="col-md-10 my-0">
                    Update Insurance Company
                </div>
                <div className="col-md-2 my-0 float-right">
                    <Link to="/InsuranceCompany" >
                        <button className="btn btn-primary"  >List</button>                        
                    </Link>                            
                </div>
            </div>
        </div>
          
          <div className="card-body">
        
          <div className='row gx-5'>
            <div className='col-md-2 my-2'>Company Name</div>
            <div className='col-md-10 my-1'>
                <input type="text" className="form-control" id='CompanyName' autoComplete="off"
                    name='CompanyName'  
                    value={input.CompanyName}
                    onChange={handleInput}
                    placeholder='Company Name' />
            </div>

            

            <div className='col-md my-2'>
              <button type="button" className="btn btn-primary " onClick={handleUpdateCompany}>Update</button> 
              <button type="button" className="btn btn-secondary mx-2"  >Cancel</button>
            </div>
          </div>
        </div>
        </div>
        </div>


    
    </>
  )
}
