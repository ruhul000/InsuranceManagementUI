import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'
import { useNavigate,Link } from "react-router-dom";


export default function CompanyInfo() {

    const [buttonText, setButtonText] = useState('Save');
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [errors,setErrors] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [input,setInput] = useState(
    {
        ComKey: 0,        
        CompanyName: '',
        ShortName:'',
        Address:'',
        Phone:'',
        Fax: '',
        Mobile:'',
        Email:'',
        IssuingPlaceHO:'',
        Web :'',
        Logo:null,
        LogoFile:'',
        LHead:null,
        BannerFile:'',
        BackupType:true

    });

    const clearForm=()=>
    {
        setInput(
            {
              ComKey: 0,        
              CompanyName: '',
              ShortName:'',
              Address:'',
              Phone:'',
              Fax: '',
              Mobile:'',
              Email:'',
              IssuingPlaceHO:'',
              Web :'',
              Logo:null,
              LogoFile:'',
              LHead:null,
              BannerFile:'',
              BackupType:true
                
            }
        )
    }
    
    

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

    const loadCompany=(CompanyID)=>{
      axios.get(`${Constants.BASE_URL}/Company/`+ CompanyID, auth)
                .then(res=>{
                        setInput(res.data);
                        //console.log(input.Logo);
                        console.log(typeof(input.Logo));
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
    }

    const companySelectChanged=(e)=>{
      
      if(e.target.value > 0)
      {          
        setInput(prevState=>({...prevState,ComKey:e.target.value}));
        setIsUpdateMode(true);
        setButtonText("Update");
        loadCompany(e.target.value);
        
      }
      else
      {
        setInput(prevState=>({...prevState,ComKey:e.target.value}));
        setIsUpdateMode(false);
        setButtonText("Save");
        clearForm();
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

const handleSave =()=>{
  if(!isUpdateMode)
  {
    handleCreateCompany();
  }
  else
  {
    handleUpdateCompany();
  }
}
    const handleCreateCompany = ()=>{
        axios.post(`${Constants.BASE_URL}/Company/Create`,input,auth).then(res=>{
    
            if(res.status === 200)
            {
              Swal.fire(
                'Good job!',
                'Company is saved.',
                'success'
              )        
              
            }
              
          })
          .catch(function(error) {
            {
              Swal.fire(
                'Opps! Something wrong',
                error.message,
                'error'
              )
              console.log(error);
            }
        
            
          });

    }

    const handleUpdateCompany = ()=>{
      axios.put(`${Constants.BASE_URL}/Company/Update`,input,auth).then(res=>{
  
          if(res.status === 200)
          {
            Swal.fire(
              'Good job!',
              'Company is saved.',
              'success'
            )        
            
          }
            
        })
        .catch(function(error) {
          {
            Swal.fire(
              'Opps! Something wrong',
              error.message,
              'error'
            )
            console.log(error);
          }
      
          
        });

  }

   

      const  loadCompanies=()=>{
        axios.get(`${Constants.BASE_URL}/Company/Companies`,auth)
              .then(res=>{
                      setCompanies(res.data);                        
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
        
        loadCompanies();
    
    },[] )

    const convertToBase64 = (event) => {
      if (event.target.files && event.target.files[0])
      {
        const file = event.target.files[0];
        

        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
          var ImageData = reader.result;
          console.log(ImageData);
          //ImageData = ImageData.substring(23,ImageData.length-1);
        
          setInput( prevState=>({...prevState,[event.target.name]: reader.result}))  
        };
        

        console.log(input);
        

        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
      else
      {
        setInput( prevState=>({...prevState,[event.target.name]: null}))  
      }
    };
    
    
    

  return (
    <>
    
    <div className='container'>
      <h1 className="mt-4">Company</h1>
      
      <div className="card col-md-12">
      <div className="card-header container-fluid bg-info">
          <div className="row">
              <div className="col-md-10 my-0">
                  Company
              </div>
              <div className="col-md-2 my-0 float-right">
                 {/*  <Link to="/InsuranceCompany" >
                      <button className="btn btn-primary"  >List</button>                        
                  </Link>   */}                          
              </div>
          </div>
      </div>
        
        <div className="card-body">
      
        <div className='row gx-5'>
            <div className='col-md-2 my-2'>Select Company</div>
            <div className='col-md-10 my-1'>
            <select className="form-select" aria-label="Group"
                name='ComKey'
                value={input.ComKey}
                onChange={companySelectChanged}
                >
                <option value={0}  key={0}>Select</option> 
                {companies.map((option) => (
                        <option value={option.ComKey} key={option.ComKey}>{option.CompanyName}</option>
                    ))}
                </select>
            </div>
          <div className='col-md-2 my-2'>Company Name</div>
          <div className='col-md-6 my-1'>
              <input type="text" className="form-control" id='Name' autoComplete="off"
                  name='CompanyName'  
                  value={input.CompanyName}
                  onChange={handleInput}
                  placeholder='Company Name' />
          </div>
          <div className='col-md-2 my-2'>Short Name</div>
          <div className='col-md-2 my-1'>
              <input type="text" className="form-control" id='ShortName' autoComplete="off"
                  name='ShortName'  
                  value={input.ShortName}
                  onChange={handleInput}
                  placeholder='Short Name' />
          </div>

          <div className='col-md-2 my-2'>Address</div>
          <div className='col-md-10 my-1 '>
                <textarea   className="form-control" id='Address' autoComplete="off"
                name='Address'  
                value={input.Address}
                onChange={handleInput}
                placeholder='Address' />
            </div>

          <div className='col-md-2 my-2'>Phone</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='Phone' autoComplete="off"
                  name='Phone'  
                  value={input.Phone}
                  onChange={handleInput}
                  placeholder='Phone' />
          </div>

          <div className='col-md-2 my-2'>Fax</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='Fax' autoComplete="off"
                  name='Fax'  
                  value={input.Fax}
                  onChange={handleInput}
                  placeholder='Fax' />
          </div>

          <div className='col-md-2 my-2'>Mobile</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='Mobile' autoComplete="off"
                  name='Mobile'  
                  value={input.Mobile}
                  onChange={handleInput}
                  placeholder='Mobile' />
          </div>

          <div className='col-md-2 my-2'>E-Mail</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='Email' autoComplete="off"
                  name='Email'  
                  value={input.Email}
                  onChange={handleInput}
                  placeholder='Email' />
          </div>

          <div className='col-md-2 my-2'>Issuing Place</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='IssuingPlaceHO' autoComplete="off"
                  name='IssuingPlaceHO'  
                  value={input.IssuingPlaceHO}
                  onChange={handleInput}
                  placeholder='Issuing Place' />
          </div>

          <div className='col-md-2 my-2'>Web</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='Web' autoComplete="off"
                  name='Web'  
                  value={input.Web}
                  onChange={handleInput}
                  placeholder='Web' />
          </div>

          <div className='col-md-2 my-2'>Logo</div>
          <div className='col-md-4 my-1'>
              <input type="File" className="form-control" id='Logo' autoComplete="off" accept="image/png, image/jpeg"
                  name='Logo'  
                  
                  onChange={convertToBase64 }
                  placeholder='Logo' />

                  <img style={{width: "100px", height:"100 px"}} src={input.Logo} id='imgLogo' />
          </div>

          <div className='col-md-2 my-2'>Banner</div>
          <div className='col-md-4 my-1'>
              <input type="File" className="form-control" id='LHead' autoComplete="off" accept="image/png, image/jpeg"
                  name='LHead'  
                  
                  onChange={convertToBase64 }
                  placeholder='Banner' />

          <img style={{width: "100px", height:"100 px"}} src={input.LHead}  id='imgLhead'/>
          </div>

         
          

          <div className='col-md my-2'>
          <button type="button" className="btn btn-primary " >Add New</button> 
            <button type="button" className="btn btn-primary mx-2" onClick={handleSave}>{buttonText}</button> 
            <button type="button" className="btn btn-secondary "  >Cancel</button>
          </div>
        </div>
      </div>
      </div>
      </div>
 
  </>
  )
}
