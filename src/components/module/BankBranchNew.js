import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../Constants';
import Swal from 'sweetalert2'
import Nav from '../layout/Nav';
import SideBar from '../layout/SideBar';
import Footer from '../layout/Footer';
import { useNavigate,Link } from "react-router-dom";


export default function BankBranchNew() {

    const [banks, setBanks] = useState([]);
    const [errors,setErrors] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [input,setInput] = useState(
    {
        BranchId: 0,        
        BranchName: '',
        BankId: 0,
        BankName: '',
        BranchAddress: '',
        SwiftCode: '',
        RoutingNumber: '',
        Status: true,
        EntryUserID: 0,      
        EntryTime:  "2023-08-17T20:50:01.925Z",
        UpdateUserID:  0,
        UpdateTime:  "2023-08-17T20:50:01.925Z"
      
    });

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

const handleCheck=(e)=>{
  setInput( prevState=>({...prevState,[e.target.name]: Number(e.target.checked)}))
  
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

const handleCreateBankBranch=()=>{

  
  axios.post(`${Constants.BASE_URL}/BankBranch/Create`,input,auth).then(res=>{
    
    if(res.status === 200)
    {
      Swal.fire(
        'Good job!',
        'Bank is saved.',
        'success'
      )

      navigate("/BankBranch");
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

const  loadBanks=()=>{
    axios.get(`${Constants.BASE_URL}/Bank/Banks`,auth)
          .then(res=>{
                  setBanks(res.data);    
              }
          )
          .catch(function(error) {
  
              
                Swal.fire(
                  'Opps! Something wrong',
                  error.message,
                  'error'
                )
              
              });
  }

useEffect(()=>{
    
    loadBanks();

},[] )

  return (
    <>
      
      <div className='container'>
        <h1 className="mt-4">Bank Branch</h1>
        
        <div className="card col-md-12">
        {/* <div className="card-header">New Bank Branch</div> */}
        <div className="card-header container-fluid bg-info">
              <div className="row">
                  <div className="col-md-10 my-0">
                      New Branch
                  </div>
                  <div className="col-md-2 my-0 float-right">
                      <Link to="/BankBranch" >
                          <button className="btn btn-primary"  >List</button>                        
                      </Link>                            
                  </div>
              </div>
          </div>
          
          <div className="card-body">
        
          <div className='row gx-5'>
            <div className='col-md-2 my-2'>Bank Name</div>
            <div className='col-md-4 my-1'>
            <select className="form-select" aria-label="Group"
               name='BankId'
               value={input.BankId}
               onChange={handleInput}
              >
                <option value={0}>Select</option> 
                {banks.map((option) => (
                      <option key={option.BankId} value={option.BankId}>{option.BankName}</option>
                    ))}
              </select>
            </div>

            <div className='col-md-2 my-2'>Branch Name</div>
            <div className='col-md-4 my-1'>
                <input type="text" className="form-control" id='BranchName' autoComplete="off"
                name='BranchName'  
                value={input.BranchName}
                onChange={handleInput}
                placeholder='Branch Name' />
            </div>

            <div className='col-md-2 my-2'>Address</div>
            <div className='col-md-10 my-1'>
                <textarea   className="form-control" id='BranchAddress' autoComplete="off"
                name='BranchAddress'  
                value={input.BranchAddress}
                onChange={handleInput}
                placeholder='Address' />
            </div>

            <div className='col-md-2 my-2'>Swift Code</div>
            <div className='col-md-4 my-1'>
                <input type="text" className="form-control" id='SwiftCode' autoComplete="off"
                name='SwiftCode'  
                value={input.ClientMobile}
                onChange={handleInput}
                placeholder='Swift Code' />
            </div>

            <div className='col-md-2 my-2'>Routing Number</div>
            <div className='col-md-4 my-1'>
                <input type="text" className="form-control" id='RoutingNumber' autoComplete="off"
                    name='RoutingNumber'  
                    value={input.RoutingNumber}
                    onChange={handleInput}
                    placeholder='Routing Number' />
            </div>

            <div className='col-md my-2'>
              <button type="button" className="btn btn-primary " onClick={handleCreateBankBranch}>Save</button> 
              <button type="button" className="btn btn-secondary mx-2">Cancel</button>
            </div>
          </div>
        </div>
        </div>
        </div>


    
    </>
  )
}
