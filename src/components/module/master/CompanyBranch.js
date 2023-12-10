import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'


export default function CompanyBranch() {

    const [buttonText, setButtonText] = useState('Save');
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [errors,setErrors] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [input,setInput] = useState(
    {
        ComKey: 0,
        BranchKey:0,
        BranchID: '',
        BranchOrderKey:0,
        Branch_Open_Date:null,
        BranchName:'',
        ShortName:'',
        ZoneKey:0,
        Address:'',
        Branch_Address_2:'',
        Branch_Address_3:'',
        Phone:'',
        Mobile:'',        
        Fax:'',
        EMail:'',
        EmpKeyIncharge:0,
        IssuingPlace:'',
        IssuingPlace_2:'',
        IssuingPlace_3:'',
        Computerized:true,
        Seal:null,
        Signatore_Name_A:'',
        Signatore_A:null,
        Signatore_Name_B:'',
        Signatore_B:null,
        Signatore_Name_C :'',
        Signatore_C:null,
        Status:true,
        BackupType:true

    });

    const clearForm=()=>
    {
      setIsUpdateMode(false);  
      setButtonText("Save");   
      setInput(
         {
            ComKey: 0,
            BranchKey:0,
            BranchID: '',
            BranchOrderKey:0,
            Branch_Open_Date:null,
            BranchName:'',
            ShortName:'',
            ZoneKey:0,
            Address:'',
            Branch_Address_2:'',
            Branch_Address_3:'',
            Phone:'',
            Mobile:'',        
            Fax:'',
            EMail:'',
            EmpKeyIncharge:0,
            IssuingPlace:'',
            IssuingPlace_2:'',
            IssuingPlace_3:'',
            Computerized:true,
            Seal:null,
            Signatore_Name_A:'',
            Signatore_A:null,
            Signatore_Name_B:'',
            Signatore_B:null,
            Signatore_Name_C :'',
            Signatore_C:null,
            Status:true,
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
        
        console.log(input);
    }

    const handleCompany=(e)=>{
        loadBranches(e.target.value);
        setInput( prevState=>({...prevState,[e.target.name]: e.target.value}));
    }

    const branchSelectChanged=(e)=>{
      setInput( prevState=>({...prevState,[e.target.name]: e.target.value}));
      if(e.target.value > 0)
      {          
        
        setIsUpdateMode(true);
        setButtonText("Update");          
        loadBranch(e.target.value);
        
      }
      else
      {
        
        setIsUpdateMode(false);        
        clearForm();
      }     
  
    }

    const loadBranch=(BranchKey)=>{
      axios.get(`${Constants.BASE_URL}/Branch/`+ BranchKey, auth)
                .then(res=>{
                        setInput(res.data);
                        console.log(res.data);
                        //console.log(typeof(input.Logo));
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

if(localStorage.getItem('Token') !== 'undefined')
{
  var authKey = localStorage.getItem('Token');
}

const auth = {
  headers: {
    'Authorization': 'bearer ' + authKey 
  }
}

const handleCreateBranch = ()=>{
  console.log(input);
  axios.post(`${Constants.BASE_URL}/Branch/Create`,input,auth).then(res=>{

      if(res.status === 200)
      {
        Swal.fire(
          'Good job!',
          'Branch is saved.',
          'success'
        )

        loadBranches(input.ComKey);        
        loadBranch(res.data.BranchKey);
        setIsUpdateMode(true);
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

const handleUpdateBranch = ()=>{
    axios.put(`${Constants.BASE_URL}/Branch/Update`,input,auth).then(res=>{

    if(res.status === 200)
    {
      Swal.fire(
        'Good job!',
        'Branch is saved.',
        'success'
      )        
      loadBranch(res.data.BranchKey);
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

    const handleSave =()=>{
      
      if(!isUpdateMode)
      {
        handleCreateBranch();
      }
      else
      {
        
        handleUpdateBranch();
        
      }
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

      const  loadBranches=(comkey)=>{
        
        axios.get(`${Constants.BASE_URL}/Branch/company/${comkey}`,auth)
              .then(res=>{
                        setBranches(res.data);    
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

      const convertToBase64 = (event) => {
        
        if (event.target.files && event.target.files[0])
        {          
          const file = event.target.files[0];
          
  
          const reader = new FileReader();
          reader.readAsDataURL(file);
          
          reader.onload = () => {
            var ImageData = reader.result;
            
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
    
    useEffect(()=>{
        
        loadCompanies();
    
    },[] )

  return (
    <>
    
    <div className='container'>
      <h1 className="mt-4">Branch</h1>
      
      <div className="card col-md-12">
      <div className="card-header container-fluid bg-info">
          <div className="row">
              <div className="col-md-10 my-0">
                  Branch
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
            <div className='col-md-4 my-1'>
            <select className="form-select" aria-label="Group"
                name='ComKey'
                value={input.ComKey}
                onChange={handleCompany}
                >
                <option value={0}>Select</option> 
                {companies.map((option) => (
                        <option value={option.ComKey} key={option.ComKey}>{option.CompanyName}</option>
                    ))}
                </select>
            </div>
            <div className='col-md-2 my-2'>Select Branch</div>
            <div className='col-md-4 my-1'>
            <select className="form-select" aria-label="Group"
                name='BranchKey'
                value={input.BranchKey}
                onChange={branchSelectChanged}
                >
                <option value={0}>Select</option> 
                {branches.map((option) => (
                        <option value={option.BranchKey} key={option.BranchKey}>{option.BranchName}</option>
                    ))}
                </select>
            </div>
          <div className='col-md-2 my-2'>Branch Name</div>
          <div className='col-md-6 my-1'>
              <input type="text" className="form-control" id='BranchName' autoComplete="off"
                  name='BranchName'  
                  value={input.BranchName}
                  onChange={handleInput}
                  placeholder='Branch Name' />
          </div>
          <div className='col-md-2 my-2'>Short</div>
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
              <input type="text" className="form-control" id='EMail' autoComplete="off"
                  name='EMail'  
                  value={input.EMail}
                  onChange={handleInput}
                  placeholder='Email' />
          </div>

          <div className='col-md-2 my-2'>Issuing Place</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='IssuingPlace' autoComplete="off"
                  name='IssuingPlace'  
                  value={input.IssuingPlace}
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

          <div className='col-md-2 my-2'>Seal</div>
          <div className='col-md-4 my-1'>
              <input type="File" className="form-control" id='Seal' autoComplete="off"
                  name='Seal'  
                  
                  onChange={convertToBase64 }
                  placeholder='Seal' />
              <img style={{width: "100px", height:"100 px"}} src={input.Seal}  id='imgSeal'/>
          </div>

          <div className='col-md-2 my-2'>Signature 1</div>
          <div className='col-md-4 my-1'>
              <input type="File" className="form-control" id='Signatore_A' autoComplete="off"
                  name='Signatore_A'  
                  
                  onChange={convertToBase64 }
                  placeholder='Signature1' />
              <img style={{width: "100px", height:"100 px"}} src={input.Signatore_A}  id='imgSignatore_A'/>
          </div>
          <div className='col-md-2 my-2'>Signature 2</div>
          <div className='col-md-4 my-1'>
              <input type="File" className="form-control" id='Signatore_B' autoComplete="off"
                  name='Signatore_B'  
                  
                  onChange={convertToBase64 }
                  placeholder='Signature2' />
              <img style={{width: "100px", height:"100 px"}} src={input.Signatore_B}  id='imgSignatore_B'/>
          </div>
          <div className='col-md-2 my-2'>Signature 3</div>
          <div className='col-md-4 my-1'>
              <input type="File" className="form-control" id='Signatore_C' autoComplete="off"
                  name='Signatore_C'  
                  
                  onChange={convertToBase64 }
                  placeholder='Signatore3' />
              <img style={{width: "100px", height:"100 px"}} src={input.Signatore_C}  id='imgSignatore_C'/>
          </div>
          
          

          <div className='col-md my-2'>
          <button type="button" className="btn btn-primary " onClick={clearForm} >Add New</button> 
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
