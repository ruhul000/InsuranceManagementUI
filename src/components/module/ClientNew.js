import axios from 'axios';
import React, { useState } from 'react'
import Constants from '../../Constants';
import Swal from 'sweetalert2'
import Nav from '../layout/Nav';
import SideBar from '../layout/SideBar';
import Footer from '../layout/Footer';
import { useNavigate,Link } from "react-router-dom";



export default function ClientNew() {
  
  const [errors,setErrors] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [input,setInput] = useState(
    {
      ClientKey: 0,
      BranchKey: 0,
      ClientName: '',
      ClientNameExtar: '',
      ClientAddress: '',
      ClientMobile: '',
      ClientType: '',
      ClientTypeTwo: '',
      ClientSector: '',
      ClientVATNo: '',
      ClientBINNo: '',
      ClientTINNo: '',
      Client_VAT_Exemption: 0,
      GroupKey: 0,
      ClientPhone: '',
      ClientFax: '',
      ClientEMail: '',
      ClientRelation: '',
      ClientWeb: '',
      ClientContractPer: '',
      ClientDesignation: '',
      SpecDiscount: 0,
      EmpKeyDirectorRef: 0,
      Status: true,
      Int_A: 0,
      Int_B: 0,
      Int_C: 0,
      Int_D: 0,
      Str_A: '',
      Str_B: '',
      Str_C: '',
      Str_D: '',
      Date_A:  "2023-08-17T20:50:01.925Z",
      Date_B:  "2023-08-17T20:50:01.925Z",
      Date_C:  "2023-08-17T20:50:01.925Z",
      BackupType: true
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
    console.log(input);
}

const handleCheck=(e)=>{
  setInput( prevState=>({...prevState,[e.target.name]: Number(e.target.checked)}))
  console.log(input);
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

const handleCreateClient=()=>{

  console.log(`${Constants.BASE_URL}/Client/Create`); 
  axios.post(`${Constants.BASE_URL}/Client/Create`,input,auth).then(res=>{
    
    if(res.status == 200)
    {
      Swal.fire(
        'Good job!',
        'Client is saved.',
        'success'
      )

      navigate("/client");
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
        <h1 className="mt-4">Client</h1>
        
        <div className="card col-md-12">
        <div className="card-header container-fluid bg-info">
            <div className="row">
                <div className="col-md-10 my-0">
                    New Client
                </div>
                <div className="col-md-2 my-0 float-right">
                    <Link to="/Client" >
                        <button className="btn btn-primary"  > <i className="fa-solid fa-list"></i> List</button>                        
                    </Link>                            
                </div>
            </div>
        </div>
          
          <div className="card-body">
        
          <div className='row gx-5'>
            <div className='col-md-2 my-2'>Client Name</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientName' autoComplete="off" 
                name='ClientName'
                value={input.ClientName}
                onChange={handleInput}                
                placeholder='Client Name'  />
            </div>

            <div className='col-md-2 my-2'>Client Name Ex</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientNameExtar' autoComplete="off"
                name='ClientNameExtar'  
                value={input.ClientNameExtar}
                onChange={handleInput}
                placeholder='Client Name EX' />
            </div>

            <div className='col-md-2 my-2'>Address</div>
            <div className='col-md-4 '>
                <textarea   className="form-control" id='ClientAddress' autoComplete="off"
                name='ClientAddress'  
                value={input.ClientAddress}
                onChange={handleInput}
                placeholder='Address' />
            </div>

            <div className='col-md-2 my-2'>Client Mobile</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientMobile' autoComplete="off"
                name='ClientMobile'  
                value={input.ClientMobile}
                onChange={handleInput}
                placeholder='Client Mobile' />
            </div>

            <div className='col-md-2 my-2'>Client Type</div>
            <div className='col-md-4 '>
              <select className="form-select" aria-label="Group"
               name='ClientType'
               value={input.ClientType}
               onChange={handleInput}
              >
                <option>Select</option> 
                <option value={'Type 1'}>Type 1</option> 
                <option value={'Type 2'}>Type 2</option> 
                <option value={'Type 3'}>Type 3</option> 
                <option value={'Type 4'}>Type 4</option> 
                <option value={'Type 5'}>Type 5</option>

              </select>
            </div>
            

            <div className='col-md-2 my-2'>Client Type Two</div>
            <div className='col-md-4 '>
              <select className="form-select" aria-label="Group"
               name='ClientTypeTwo'
               value={input.ClientTypeTwo}
               onChange={handleInput}
              >
                <option>Select</option> 
                <option value={'Type 1'}>Type 1</option> 
                <option value={'Type 2'}>Type 2</option> 
                <option value={'Type 3'}>Type 3</option> 
                <option value={'Type 4'}>Type 4</option> 
                <option value={'Type 5'}>Type 5</option> 
              </select>
            </div>

            <div className='col-md-2 my-2'>Client Sector</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientSector' autoComplete="off"
                name='ClientSector'
                value={input.ClientSector}
                onChange={handleInput}  
                placeholder='Client Sector' />
            </div>

            <div className='col-md-2 my-2'>VAT NO</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientVATNo' autoComplete="off"
                name='ClientVATNo' 
                value={input.ClientVATNo}
                onChange={handleInput}
                placeholder='VAT No' />
            </div>

            <div className='col-md-2 my-2'>BIN NO</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientBINNo' autoComplete="off"
                name='ClientBINNo'  
                value={input.ClientBINNo}
                onChange={handleInput}
                placeholder='BIN NO' />
            </div>

            <div className='col-md-2 my-2'>TIN NO</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientTINNo' autoComplete="off"
                name='ClientTINNo'  
                value={input.ClientTINNo}
                onChange={handleInput}
                placeholder='TIN No' />
            </div>

            <div className='col-md-2 my-2'>VAT Examption</div>
            <div className='col-md-4 '>
              <input className="form-check-input my-3" type="checkbox"  id='Client_VAT_Exemption' autoComplete="off"
              name='Client_VAT_Exemption' 
              value={input.Client_VAT_Exemption}
              onChange={handleCheck}

              />
            </div>

            <div className='col-md-2 my-2'>Group</div>
            <div className='col-md-4 '>
              <select className="form-select" aria-label="Group"
              name='GroupKey'
              value={input.GroupKey}
              onChange={handleInput}
              >
                <option value={0}>Select Group</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
                <option value={4}>Four</option>
              </select>
            </div>

            <div className='col-md-2 my-2'>Telephone</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientPhone' autoComplete="off"
                name='ClientPhone'  
                value={input.ClientPhone}
                onChange={handleInput}
                placeholder='Telephone' />
            </div>

            <div className='col-md-2 my-2'>Fax</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientFax' autoComplete="off"
                name='ClientFax'  
                value={input.ClientFax}
                onChange={handleInput}
                placeholder='Fax No' />
            </div>

            <div className='col-md-2 my-2'>Email</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientEMail' autoComplete="off"
                name='ClientEMail'  
                value={input.ClientEMail}
                onChange={handleInput}
                placeholder='Email' />
            </div>

            <div className='col-md-2 my-2'>Relation</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientRelation' autoComplete="off"
                name='ClientRelation'  
                value={input.ClientRelation}
                onChange={handleInput}
                placeholder='Relation' />
            </div>

            <div className='col-md-2 my-2'>Web</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientWeb' autoComplete="off"
                name='ClientWeb'  
                value={input.ClientWeb}
                onChange={handleInput}
                placeholder='Web' />
            </div>

            <div className='col-md-2 my-2'>Contact Person</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientContractPer' autoComplete="off"
                name='ClientContractPer'  
                value={input.ClientContractPer}
                onChange={handleInput}
                placeholder='Contact Person' />
            </div>

            <div className='col-md-2 my-2'>Designation</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='ClientDesignation' autoComplete="off"
                name='ClientDesignation' 
                value={input.ClientDesignation}
                onChange={handleInput}
                 placeholder='Designation' />
            </div>

            <div className='col-md-2 my-2'>Special Discount</div>
            <div className='col-md-4 '>
                <input type="numeric" className="form-control" id='SpecDiscount' autoComplete="off"
                name='SpecDiscount'  
                value={input.SpecDiscount}
                onChange={handleInput}
                placeholder='Special Discount' />
            </div>

            <div className='col-md-2 my-2'>Employee</div>
            <div className='col-md-4 '>
              
              <select className="form-select" aria-label="Group"
              name='EmpKeyDirectorRef'
              value={input.EmpKeyDirectorRef}
              onChange={handleInput}
              >
                <option>Select</option> 
                <option value={1}>Employee 1</option> 
                <option value={2}>Employee 2</option> 
                <option value={3}>Employee 3</option> 
                <option value={4}>Employee 4</option> 
                <option value={5}>Employee 5</option> 
              </select>
            </div>

            <div className='col-md-2 my-2'>Status</div>
            <div className='col-md-4'>
              <input className="form-check-input my-3" type="checkbox" 
               id='Status' 
               name='Status' 
               checked={input.Status}               
               onChange={handleInput} 
               />
            </div>

           {/*  <div className='col-md-2 my-2'>Int A</div>
            <div className='col-md-1 '>
                <input type="text" className="form-control" id='Int_A' name='Int_A'  placeholder='' />
            </div>
            <div className='col-md-2 my-2'>Int B</div>
            <div className='col-md-1 '>
                <input type="text" className="form-control" id='Int_B' name='Int_B'  placeholder='' />
            </div>
            <div className='col-md-2 my-2'>Int C</div>
            <div className='col-md-1 '>
                <input type="text" className="form-control" id='Int_C' name='Int_C'  placeholder='' />
            </div>
            <div className='col-md-2 my-2'>Int D</div>
            <div className='col-md-1 '>
                <input type="text" className="form-control" id='Int_D' name='Int_D'  placeholder='' />
            </div>

            <div className='col-md-2 my-2'>Str A</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='Int_A' name='Int_A'  placeholder='' />
            </div>
            <div className='col-md-2 my-2'>Str B</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='Int_B' name='Int_B'  placeholder='' />
            </div>
            
            <div className='col-md-2 my-2'>Str C</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='Int_C' name='Int_C'  placeholder='' />
            </div>
            <div className='col-md-2 my-2'>Str D</div>
            <div className='col-md-4 '>
                <input type="text" className="form-control" id='Int_D' name='Int_D'  placeholder='' />
            </div> */}

            {/* <div className='col-md-2 my-2'>Date A</div>
            <div className='col-md-4 '>
                <Form.Group controlId="Date_A">                    
                    <Form.Control type="date" name="Date_A" placeholder="Date A" />
                </Form.Group>
            </div>

            <div className='col-md-2 my-2'>Date B</div>
            <div className='col-md-4 '>
                <Form.Group controlId="Date_B">                    
                    <Form.Control type="date" name="Date_B" placeholder="Date B" />
                </Form.Group>
            </div> */}
            <div className='col-md my-2'>
              <button type="button" className="btn btn-primary " onClick={handleCreateClient}>Save</button> 
              <button type="button" className="btn btn-secondary mx-2">Cancel</button>
            </div>
          </div>
        </div>
        </div>
        </div>


    
    </>
  )
}
