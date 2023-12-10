import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'
import Nav from '../../layout/Nav';
import SideBar from '../../layout/SideBar';
import Footer from '../../layout/Footer';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import AsyncSelect from 'react-select/async';


export default function MotorCertificate() {

  const [input,setInput] = useState(
    {
      CoverNoteNo: '',
      SumeInsured:0,
      Rate: 0,
      ExtraPercent:0,
      Extrapercent2:0,
      TotalAmount:0,

      DocumentDate: new Date().toISOString().substring(0, 10),
      FromDate: new Date().toISOString().substring(0, 10),
      ToDate: new Date().toISOString().substring(0, 10)
      
    }
  );

  

  const [selectedClient,setClient] = useState(null);
    
    
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

    const handleClientChangte=(e)=>{
      setclientaddress(e.address);
      
    }

    const handleBranchNameChangte=(e)=>{
      console.log(e);
      
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

    const [clients, setclients] = useState([]);
    const [banks, setBanks] = useState([]);
    const [bankBranches, setBankBranches] = useState([]);
    const [branchAddress, setbranchAddress] = useState('');
    const [clientNames, setClientNames] = useState([]);
    const [producerNames, setProducerNames] = useState([]);
    const [agentNames, setAgentNames] = useState([]);
    const [clientaddress, setclientaddress] = useState('');
    const [companies,setCompanies] = useState([]);
    const [branchNames,setBranchNames] = useState([]);
    
    const [startDate, setStartDate] = useState(new Date());

   //for react select async
   const [inputValue, setValue] = useState('');
   const [selectedValue, setSelectedValue] = useState(null);

   // handle input change event
 const handleInputChange = value => {
   setValue(value);
 };

 // handle selection
 const handleChange = e => {
   //console.log(e);
   setSelectedValue(e.ClientKey);
   setclientaddress(e.address);
   
 }

 

 const loadOptions = (inputValue, callback) => {
   if(inputValue==='')
   {
     axios.get(`${Constants.BASE_URL}/Client/clients`,auth)
     .then((response) => {
       const options = []
       response.data.forEach((cl) => {
         options.push({
           label: cl.ClientName,
           value: cl.ClientKey,
           address: cl.ClientAddress
         })
       })
       callback(options);
     })    

   }
   else{
   //setValue(inputValue.replace('/','~') );
   var searchkey = inputValue.replaceAll('/','~');
   console.log(inputValue);
   console.log(searchkey);
   axios.get(`${Constants.BASE_URL}/Client/search/${searchkey}`,auth)
     .then((response) => {
       const options = []
       response.data.forEach((cl) => {
         options.push({
           label: cl.ClientName,
           value: cl.ClientKey,
           address: cl.ClientAddress
         })
       })
       callback(options);
     })
   }
 }  

   const  loadClients=()=>{
      axios.get(`${Constants.BASE_URL}/Client/Clients`,auth)
            .then(res=>{
                    setclients(res.data);    
                    
                    /*make list for react-select */
                    const options = res.data.map(d => ({
                      "value" : d.ClientKey,
                      "label" : d.ClientName + " | " + d.ClientAddress,
                      "address": d.ClientAddress
                    }))
                    setClientNames(options)                    

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

    const  loadBankBranches=(e)=>{
      
      axios.get(`${Constants.BASE_URL}/BankBranch/BankBranches/${e.target.value}`,auth)
            .then(res=>{
                  setBankBranches(res.data);  
                  console.log(res.data);
                  /*make list for react-select */
                  const options = res.data.map(d => ({
                    "value" : d.BranchName,
                    "label" : d.BranchName,
                    "address": d.BranchAddress
                  }))
                  setBranchNames(options);
                  console.log(options);

                }
            )
            .catch(function(error) {
              if(error.message === 'Request failed with status code 404')
              {
                setBankBranches([]);                
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

    const loadBranchAddress =(e)=>{
      
      axios.get(`${Constants.BASE_URL}/BankBranch/${e.target.value}`,auth)
            .then(res=>{             
                
                  setbranchAddress(res.data.BranchAddress);    
                }
            )
            .catch(function(error) {
              if(error.message === 'Request failed with status code 404')
              {
                setbranchAddress('');
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

    const loadCompanies=()=>{
      axios.get(`${Constants.BASE_URL}/InsuranceCompany/InsuranceCompanies`,auth)
          .then(res=>{
                setCompanies(res.data);                    
              }
          )
          .catch(function(error) {
  
              
              if(error.message==='Request failed with status code 404')
              {
                setCompanies([]);
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

    useEffect(()=>{
            
            
            loadClients();

            loadBanks();
            loadCompanies();
            

    },[] )

    
    const [covisible, setCovisible] = useState(false);
    const toggleCoInsurance=(e)=>{
      setCovisible(e.target.checked);      
      

    }

    const [exportVisible, setexportVisible] = useState(false);
    const toggleExport=(e)=>{
      setexportVisible(e.target.checked);            

    }

    const handleDate=(e)=>
    {
      console.log(e.target.value);
    }
    
    const calculateTotalAmout=(e)=>{

      setInput( prevState=>({...prevState,[e.target.name]: e.target.value})) ;
      var Tamount = 0;
      Tamount = ((input.SumeInsured * input.Rate) + (input.SumeInsured * input.Rate)*input.ExtraPercent/100) + ((input.SumeInsured * input.Rate) + (input.SumeInsured * input.Rate)*input.ExtraPercent/100)*input.Extrapercent2/100; 
      

      setInput( prevState=>({...prevState, TotalAmount: Tamount})); 

    }

    useEffect(()=>{     
      
       
      
},[input] )

  return (
    <>
      <>
        <div className='container'>
        <h1 className="mt-4">Motor</h1>
        
        <div className="card col-md-12">
        <div className="card-header bg-info">Motor Certificate</div>
          
          

          <div className="card-body">
          <div className='row border p-2' style={{backgroundColor:'LightGray'}} >
          <div className="col-md-2">Motor Bill Type</div>          
          <div className="col-md-2">
            <select className="form-select" aria-label="Group" id='BusinessClass'
                  name='BusinessClass'
                  value = {input.BusinessClass}
                  onChange={handleInput}
                  >
                  <option value={0} >Select</option> 
                  <option value={1} >PV</option> 
                  <option value={2} >MC</option> 
                  <option value={3} >CV</option> 
              </select>
          </div>

          <div className="col-md-2 my-1">Search Bill No</div>
            <div className="col-md-2 ">
            <input type="text" className="form-control" id='SearchBillNo' autoComplete="off"
                  name='SearchBillNo'  
                  value={input.SearchBillNo}
                  onChange={handleInput}
                  placeholder='Bill No' />
          </div>
          <div className="col-md-2 my-1">Search CN</div>

          
          <div className="col-md-2 my-1">
            <input type="text" className="form-control" id='SearchCN' autoComplete="off"
                  name='SearchCN'  
                  value={input.SearchCN}
                  onChange={handleInput}
                  placeholder='CN No' />
          </div>
        </div>
          <div className='row gx-2'>
            <div className="col-md-6 py-2" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}} >

            <div className="row "> 

            <div className='col-md-3 my-2'>Bill No</div>
            <div className='col-md-6 my-1'>
                <input type="text" className="form-control" id="CoverNoteNo" autoComplete="off" 
                name="CoverNoteNo"
                value={input.CoverNoteNo}
                onChange={handleInput}                
                placeholder="Cover Note No" />
            </div>
            <div className='col-md-3 my-1'>
                <Form.Group controlId="DocumentDate">                    
                    <Form.Control type="date" name="DocumentDate" placeholder="Date" 
                      value={input.DocumentDate}
                      onChange={handleInput}
                    />
                </Form.Group>
            </div>

            <div className='col-md-3 my-2'>Insured Name</div>
            <div className='col-md-9 my-1'>
              <AsyncSelect
                  cacheOptions
                  defaultOptions
                  value={selectedValue}
                  
                  loadOptions={loadOptions}
                  onInputChange={handleInputChange}
                  onChange={handleChange}
                />
            </div>

            <div className='col-md-3 my-2'>Address</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='clientaddress' autoComplete="off"
                name='clientaddress'  
                value={clientaddress}
                onChange={handleInput}
                placeholder='Address' />
            </div>

            <div className='col-md-3 my-2'>Bank</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group" id='BankId'
              name='BankId'
              value = {input.BankId}
              onChange={loadBankBranches}
              >
              <option value={0} >Select</option> 
                {banks.map((option) => (
                  <option value={option.BankId}>{option.BankName}</option>
                ))}

              </select>
            </div>

            <div className='col-md-3 my-2'>Bank Branch</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group"
              name='BankBranch'
              value={input.ClientTypeTwo}
              onChange={loadBranchAddress}
              >
                <option value={0}>Select</option> 
                {bankBranches.map((option) => (
                  <option value={option.BranchId}>{option.BranchName}</option>
                ))}
              </select>
            </div>

            <div className='col-md-3 my-2'>Address</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='BranchAddress' autoComplete="off"
                name='BranchAddress'  
                value={branchAddress}
                
                readOnly
                placeholder='Address' />
            </div>

            <div className='col-md-3 my-2'>Type of Insurance</div>
            <div className='col-md-9 my-1'>
            <select className="form-select" aria-label="Group" id='InsuranceType'
                  name='InsuranceType'
                  value = {input.InsuranceType}
                  onChange={handleInput}
                  >
                  <option value={1} >Comprehensive</option>           
                  <option value={2} >Act Liability Insurance</option> 
                          
              </select>
            </div>

            

            <div className='col-md-3 my-2'>Description of Vehicle</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id='VehicleDescription' autoComplete="off" 
                name='VehicleDescription'
                
                value={input.VehicleDescription}
                onChange={handleInput}                
                placeholder=''  />
            </div>

            <div className='col-md-3 my-2'>Registration Number</div>
            <div className='col-md-9 my-1'>
            <input type="text" className="form-control" id='RegistrationNumber' autoComplete="off" 
                name='RegistrationNumber'
                
                value={input.RegistrationNumber}
                onChange={handleInput}                
                placeholder='Registration Number'  />
            </div>

            <div className='col-md-3 my-2'>Engine Number</div>
            <div className='col-md-9 my-1'>
            <input type="text" className="form-control" id='EngineNumber' autoComplete="off" 
                name='EngineNumber'
                
                value={input.RegistrationNumber}
                onChange={handleInput}                
                placeholder='Engine Number'  />
            </div>
            
            <div className='col-md-3 my-2'>Chassis Number</div>
            <div className='col-md-9 my-1'>
            <input type="text" className="form-control" id='ChassisNumber' autoComplete="off" 
                name='ChassisNumber'
                
                value={input.ChassisNumber}
                onChange={handleInput}                
                placeholder='Chassis Number'  />
            </div>

            <div className='col-md-3 my-2'>Make</div>
            <div className='col-md-5 my-1'>
              <input type="text" className="form-control" id='Make' autoComplete="off" 
                name='Make'                
                value={input.Make}
                onChange={handleInput}                
                placeholder='Make'  />
            </div>
            <div className='col-md-2 my-2'>Model</div>
            <div className='col-md-2 my-1'>
            <input type="text" className="form-control" id='Model' autoComplete="off" 
                name='Model'                
                value={input.Model}
                onChange={handleInput}                
                placeholder='Model'  />
            </div>
            <div className='col-md-3 my-2'>Reg. Year</div>
            <div className='col-md-3 my-1'>
              <input type="text" className="form-control" id='RegistrationYear' autoComplete="off" 
                name='RegistrationYear'                
                value={input.RegistrationYear}
                onChange={handleInput}                
                placeholder=''  />
            </div>
            <div className='col-md-3 my-2'>H.P/C.C/TON</div>
            <div className='col-md-3 my-1'>
            <input type="text" className="form-control" id='Power' autoComplete="off" 
                name='Power'                
                value={input.Power}
                onChange={handleInput}                
                placeholder=''  />
            </div>            

            <div className='col-md-3 my-2'>Period From</div>
            <div className='col-md-4 my-1'>
              <Form.Group controlId="PeriodFrom">                    
                  <Form.Control type="date"  name="FromDate" placeholder="yyyy-mm-dd"
                    value={input.FromDate}
                    onChange={handleInput}
                  />
              </Form.Group>
              
              
            </div>

            <div className='col-md-1 my-2'>To</div>
            <div className='col-md-4 my-1'>
              <Form.Group controlId="PeriodTo">                    
                  <Form.Control type="date"  name="ToDate" placeholder="dd-mm-yyyy" 
                    value={input.ToDate}
                    onChange={handleDate}
                  />
              </Form.Group>
            </div>

            
            <div className='col-md-3 my-2'>Producer Name</div>
            <div className='col-md-9 my-1'>
              <Select options={producerNames}
              id='clientKey'
              name='clientKey'
              onChange={handleClientChangte}
              isMulti={false}
              />
            </div>

            <div className='col-md-3 my-2'>Renewal Cert No</div>
            <div className='col-md-9 my-1'>
              <input type="text" className="form-control" id="RenewalCertNo" autoComplete='off' 
                name='RenewalCertNo'
                value={input.RenewalCertNo}
                placeholder='Renewal Cert No'

              />
            </div>

            <div className='col-md-3 my-2'>Limitation as to use</div>
            <div className='col-md-9 my-1'>
              <input type="text" className="form-control" id="Limitation" autoComplete='off' 
                name='Limitation'
                value={input.Limitation}
                placeholder='Limitation'
                
              />
            </div>

            <div className='col-md-12'>
                  <hr/>
            </div>

                <div className='col-md-4 my-2'>Co-Insurance</div>
                <div className='col-md-2 my-1 '>
                  <input type="checkbox" className="form-check-input my-2" id='isCoInsurance' autoComplete="off"
                      name='isCoInsurance' 
                      value={input.MarineAmount}
                      onChange={toggleCoInsurance} />
                </div>
                
                {
                  covisible &&  <>
                    <div className='col-md-2 my-2'>Per</div>
                    <div className='col-md-4 my-1 '>
                      <input type="number" className="form-control" id='coInsurencePer' autoComplete="off"
                          name='coInsurencePer' 
                          value={input.MarineAmount}
                          onChange={handleInput}
                          placeholder='' />
                    </div>

                    <div className='col-md-4 my-2'>We are Leader</div>
                    <div className='col-md-8 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isWeLeader' autoComplete="off"
                          name='isWeLeader' 
                          value={input.MarineAmount}
                          onChange={handleInput} />
                    </div>

                    <div className='col-md-4 my-2'>Leader Name</div>
                    <div className='col-md-8 my-1 '>
                      <select className="form-select" aria-label="Group" id='coInsurarID'
                      name='coInsurarID'
                      value = {input.ConpanyId}
                      onChange={handleInput}
                      >
                      <option value={0} >Select</option> 
                         {companies.map((option) => (
                          <option value={option.CompanyId}>{option.CompanyName}</option>
                        ))} 
                        

                      </select>
                    </div>
                    <div className='col-md-4 my-2'>Document No</div>
                    <div className='col-md-8 my-1 '>
                      <input type="text" className="form-control" id='coDocNo' autoComplete="off"
                          name='coDocNo' 
                          value={input.MarineAmount}
                          onChange={handleInput}
                          placeholder='' />
                    </div>
                    
                  </>
                }

            <div><hr/></div>
            <div className='col-md-12 text-center'>Deductable Risks</div>
            <div className='col-md-4 my-1'>Theft</div> 
            <div className="col-md-1 my-1">
              <input type='checkbox' className='form-check-input' id='IsTheftDeduct' 
                  name='IsTheftDeduct'
                  value={input.IsTheftDeduct}
                  onChange={handleInput}
                  />
            </div>
            <div className='col-md-3'>
              <div className='input-group '> 

                      <input type="text" className="form-control" id='TheftPercent' autoComplete="off"  readOnly
                        name='TheftPercent' 
                        value={0.25}
                        
                        placeholder='' />
                  <span className="input-group-text" >%</span>
                  
                </div>
            </div> 
            <div className="col-md-4">
              <input type="text" className="text form-control" id='TheftDeductAmount' readOnly
              name='TheftDeductAmount' 
              value={input.TheftDeductAmount}
              />
            </div>

            <div className='col-md-4 my-1'>Flood & Cyclone</div> 
            <div className="col-md-1 my-1">
              <input type='checkbox' className='form-check-input' id='IsTheftDeduct' 
                  name='IsTheftDeduct'
                  value={input.IsTheftDeduct}
                  onChange={handleInput}
                  />
            </div>
            <div className='col-md-3'>
              <div className='input-group '> 

                      <input type="text" className="form-control" id='TheftPercent' autoComplete="off"  readOnly
                        name='TheftPercent' 
                        value={0.25}
                        
                        placeholder='' />
                  <span className="input-group-text" >%</span>
                  
                </div>
            </div> 
            <div className="col-md-4">
              <input type="text" className="text form-control" id='TheftDeductAmount' readOnly
              name='TheftDeductAmount' 
              value={input.TheftDeductAmount}
              />
            </div>

            <div className='col-md-4 my-1'>Riot & Strike</div> 
            <div className="col-md-1 my-1">
              <input type='checkbox' className='form-check-input' id='IsRiotDeduct' 
                  name='IsRiotDeduct'
                  value={input.IsRiotDeduct}
                  onChange={handleInput}
                  />
            </div>
            <div className='col-md-3'>
              <div className='input-group '> 

                      <input type="text" className="form-control" id='RiotPercent' autoComplete="off"  readOnly
                        name='RiotPercent' 
                        value={0.50}
                        
                        placeholder='' />
                  <span className="input-group-text" >%</span>
                  
                </div>
            </div> 
            <div className="col-md-4">
              <input type="text" className="text form-control" id='RiotAmount' readOnly
              name='RiotAmount' 
              value={input.RiotAmount}
              />
            </div>

            <div className='col-md-4 my-1'>Earthquake</div> 
            <div className="col-md-1 my-1">
              <input type='checkbox' className='form-check-input' id='IsEarthquakeDeduct' 
                  name='IsEarthquakeDeduct'
                  value={input.IsEarthquakeDeduct}
                  onChange={handleInput}
                  />
            </div>
            <div className='col-md-3'>
              <div className='input-group '> 

                      <input type="text" className="form-control" id='EarthquakePercent' autoComplete="off"  readOnly
                        name='EarthquakePercent' 
                        value={0.25}
                        
                        placeholder='' />
                  <span className="input-group-text" >%</span>
                  
                </div>
            </div> 
            <div className="col-md-4">
              <input type="text" className="text form-control" id='EarthauakeAmount' readOnly
              name='EarthauakeAmount' 
              value={input.TheftDeductAmount}
              />
            </div>


          </div>
        </div> 
            
            
            <div className="col-md-5 mx-2" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}}>
              <div className="row">
                
                
                <div className='col-md-12 my-1'> 
                  <select className="form-select" aria-label="Group" id='Tarifftype'
                      name='Tarifftype'
                      value = {input.Tarifftype}
                      onChange={handleInput}
                      >
                      <option value={0} >Tariff Type</option> 
                         {/* {companies.map((option) => (
                          <option value={option.CompanyId}>{option.CompanyName}</option>
                        ))}  */}
                        

                      </select>
                </div>
                
                <div className='col-md-12 my-1'> 
                  <select className="form-select" aria-label="Group" id='VehicleGroup'
                      name='VehicleGroup'
                      value = {input.VehicleGroup}
                      onChange={handleInput}
                      >
                      <option value={0} >Group of Vehicle</option> 
                         {/* {companies.map((option) => (
                          <option value={option.CompanyId}>{option.CompanyName}</option>
                        ))}  */}
                        

                      </select>
                </div>
                
                <div className='col-md-12 my-1'> 
                  <select className="form-select" aria-label="Group" id='VehicleType'
                      name='VehicleType'
                      value = {input.VehicleType}
                      onChange={handleInput}
                      >
                      <option value={0} >Type of Vehicle</option> 
                         {/* {companies.map((option) => (
                          <option value={option.CompanyId}>{option.CompanyName}</option>
                        ))}  */}
                        

                      </select>
                </div>
                
                <div className='col-md-12 my-1'> 
                  <select className="form-select" aria-label="Group" id='Capacity'
                      name='Capacity'
                      value = {input.Capacity}
                      onChange={handleInput}
                      >
                      <option value={0} >Capacity</option> 
                         {/* {companies.map((option) => (
                          <option value={option.CompanyId}>{option.CompanyName}</option>
                        ))}  */}
                        

                      </select>
                </div>

                <div className='col-md-7 my-2'>Insured Amount</div>
                <div className='col-md-5 '>
                <input type="number" className="form-control " id='SumAssured' autoComplete="off"
                    name='SumAssured' 
                    value={input.SumAssured}
                    onChange={handleInput}
                    placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Basic</div>
                <div className='col-md-5 my-1 '>
                  <input type="text" className="form-control" id='Basic' autoComplete="off"
                      name='Basic' 
                      value={input.Basic}
                      onChange={handleInput}
                      placeholder='' />
                </div>               
                  
                

                <div className='col-md-7 my-1'>Own Damage Premium (2.65%)</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='TaxWithRate' autoComplete="off"
                      name='TaxWithRate' 
                      value={input.TaxWithRate}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-1'>Less Excl Perils</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='TaxWithRate' autoComplete="off"
                      name='TaxWithRate' 
                      value={input.TaxWithRate}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7  my-1 '>                
                  <div className='input-group '>                  
                  <span className="input-group-text" >(+)ODP</span>
                      <input type="text" className="form-control" id='LoadingPercentODP' autoComplete="off"  
                        name='LoadingPercentODP' 
                        value={input.LoadingPercentODP}
                        onChange={handleInput}
                        placeholder='' />
                  <span className="input-group-text" >% ACTL</span>                                       
                  <input type="text" className="form-control" id='LoadingPercentACTL' autoComplete="off"  
                        name='LoadingPercentACTL' 
                        value={input.LoadingPercentACTL}
                        onChange={handleInput}
                        placeholder='' />
                        <span className="input-group-text" >%</span>
                  </div>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='NoClaimDiscountACTL' autoComplete="off"
                      name='NoClaimDiscountACTL' 
                      value={input.NoClaimDiscountACTL}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Add duty fee</div>
                <div className='col-md-3  my-1 '>                
                  <div className='input-group '>                  
                      <input type="text" className="form-control" id='DutyFeePercent' autoComplete="off"  
                        name='DutyFeePercent' 
                        value={input.DutyFeePercent}
                        onChange={handleInput}
                        placeholder='' />

                      <span className="input-group-text" >%</span>                 
    
                  </div>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='DutyFee' autoComplete="off"
                      name='DutyFee' 
                      value={input.DutyFee}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-4  my-1 '>                
                  <div className='input-group '>                  
                      <input type="text" className="form-control" id='AVLPercent' autoComplete="off"  
                        name='AVLPercent' 
                        value={input.AVLPercent}
                        onChange={handleInput}
                        placeholder='' />

                      <span className="input-group-text " >% AVLS</span>                 
    
                  </div>
                </div>
                <div className='col-md-3  my-1 '> 
                    <input type='text' className='form-control' id='AVLComment' autoComplete='off'
                    name='AVLComment'
                    value={input.AVLComment}
                    onChange={handleInput}
                    /> 
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='ALVDiscount' autoComplete="off"
                      name='ALVDiscount' 
                      value={input.DutyFee}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-7  my-1 '>                
                  <div className='input-group '>                  
                  <span className="input-group-text" >(-)Technometer</span>
                      <input type="text" className="form-control" id='TechnoPercent' autoComplete="off"  
                        name='TechnoPercent' 
                        value={input.TechnoPercent}
                        onChange={handleInput}
                        placeholder='' />
                  <span className="input-group-text" >%</span>                                       
    
                  </div>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='TechnoDiscount' autoComplete="off"
                      name='TechnoDiscount' 
                      value={input.DutyFee}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className="col-md-4 ">
                  <input type="text"  className="form-control"  id='DiscountComment' autoComplete="off"  
                          name='DiscountComment' 
                          value={input.DiscountComment}
                          onChange={handleInput}
                          placeholder='Other Discount' />
                </div>
                <div className='col-md-3 my-0'>
                  <div className="input-group">                  
                        <input type="text" className="form-control md-3" id='DiscountPercent' autoComplete="off"  
                        name='DiscountPercent' 
                        value={input.DiscountPercent}
                        onChange={handleInput}
                        placeholder='' />
                        <span className="input-group-text" >%</span>                                       
                  </div>
                </div>
                
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='DiscountAmount' autoComplete="off"
                      name='DiscountAmount' 
                      value={input.DiscountAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Annual Premium</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='AnnualPremium' autoComplete="off"
                      name='AnnualPremium' 
                      value={input.AnnualPremium}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Act Liability Premium</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='ActLiability' autoComplete="off"
                      name='ActLiability' 
                      value={input.ActLiability}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-7  my-1 '>                
                  <div className='input-group '>                  
                    <span className="input-group-text" >Passenger</span>
                      <input type="text" className="form-control" id='NoOfPassenger' autoComplete="off"  
                        name='NoOfPassenger' 
                        value={input.NoOfPassenger}
                        onChange={handleInput}
                        placeholder='' />
                    <span className="input-group-text" >Amount</span>                                       
                    <input type="text" className="form-control" id='PerPassenger' autoComplete="off"  
                        name='PerPassenger' 
                        value={input.PerPassenger}
                        onChange={handleInput}
                        placeholder='' />
                        
                  </div>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='TechnoDiscount' autoComplete="off"
                      name='TechnoDiscount' 
                      value={input.DutyFee}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                
                <div className='col-md-7  my-1 '>                
                  <div className='input-group '>                  
                  <span className="input-group-text" >Driver</span>
                      <select className="form-select" aria-label="Group" id='coInsurarID'
                      name='coInsurarID'
                      value = {input.ConpanyId}
                      onChange={handleInput}
                      >
                        <option value="1">Owner</option>
                        <option value="2">Paid Driver</option>
                        <option value="3">Driver & Helper</option>
                        <option value="4">Contractor</option>
                        <option value="5">Driver & Helper & Contractor</option>
                        <option value="6">Helper</option>
                        <option value="7">Driver Normal</option>
                      </select>
                  
                  </div>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='DriverAmount' autoComplete="off"
                      name='DriverAmount' 
                      value={input.DriverAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7  my-1 '>                
                  <div className='input-group '>                  
                  <span className="input-group-text" >(-)NCB</span>
                      <input type="text" className="form-control" id='NoClaimPercentODP' autoComplete="off"  
                        name='NoClaimPercentODP' 
                        value={input.NoClaimPercentODP}
                        onChange={handleInput}
                        placeholder='ODP' />
                  <span className="input-group-text" >% ACTL</span>                                       
                  <input type="text" className="form-control" id='NoClaimPercentACTL' autoComplete="off"  
                        name='NoClaimPercentACTL' 
                        value={input.NoClaimPercentACTL}
                        onChange={handleInput}
                        placeholder='' />
                        <span className="input-group-text" >%</span>
                  </div>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='NoClaimDiscountACTL' autoComplete="off"
                      name='NoClaimDiscountACTL' 
                      value={input.NoClaimDiscountACTL}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                

                <div className='col-md-7  my-1 '>                
                  <input type='checkbox' className="form-check-input " id='IsRoadUser' 
                  name='IsRoadUser'
                  value={input.IsRoadUser}
                  onChange={handleInput}
                  />
                  <label  htmlFor="IsRoadUser"> Road User</label>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='RoadUserAmount' autoComplete="off"
                      name='RoadUserAmount' 
                      value={input.RoadUserAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7  my-1 '>Net Premium</div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='NetPremiumAmount' autoComplete="off"
                      name='NetPremiumAmount' 
                      value={input.NetPremiumAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7  my-1 '>                
                  <input type='checkbox' className="form-check-input " id='IsVat' 
                  name='IsVat'
                  value={input.IsVat}
                  onChange={handleInput}
                  />
                  <label  htmlFor="IsVat"> 15% VAT on Net Premium</label>
                </div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='VATAmount' autoComplete="off"
                      name='VATAmount' 
                      value={input.VATAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7  my-1 '>Gross Premium</div>
                <div className='col-md-5 my-1 '>
                  
                  <input type="number" className="form-control" id='GrossPremium' autoComplete="off"
                      name='GrossPremium' 
                      value={input.GrossPremium}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                
                

                
              
              
                
                <div className='col-md-3 my-1'>Signature</div>
                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="coDocNo">&nbsp; 1st </label>
                  
                </div>

                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="coDocNo">&nbsp; 2nd </label>
                </div>

                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="coDocNo"> 3rd </label>
                </div>
                <div><hr/></div>
                <div className="col-md-4 my-2">MR No</div>
                <div className='col-md-3 my-1'>
                  <input className='form-control' type='text' id="MrNo" 
                  name='MrNo'
                  value={input.MRNo}
                  onChange={handleInput}
                  
                  />
                </div>                
                <div className='col-md-5  my-1'>
                  <Form.Group controlId="PeriodFrom">                    
                    <Form.Control type="date"  name="FromDate" placeholder="Date" 
                      value={input.FromDate}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4 my-2">Payment Mode</div>
                <div className='col-md-8 my-1'>
                <select className="form-select" aria-label="Group"
                name='BankBranch'
                value={input.ClientTypeTwo}
                onChange={handleInput}
                >
                  <option value={''}>Select</option> 
                  <option value={'Cash'}>Cash</option> 
                  <option value={'Cheque'}>Cheque</option>
                  <option value={'Bank Draft'}>Credit Advice</option>
                  <option value={'DD'}>DD</option>
                  <option value={'DD'}>Deposit Premium</option>
                  <option value={'DD'}>Pay Order</option>
                  <option value={'DD'}>Bank Guarantee</option>
                  <option value={'DD'}>Fund Transfer</option>
                  <option value={'DD'}>BEFTN/EFTN</option>
                  <option value={'DD'}>Cash/CA/CQ/PO/Dranf No</option>
                  
                </select>
              </div>
                
                <div className='col-md-4 my-2'>Bank</div>
                <div className='col-md-8 my-1'>
                <select className="form-select" aria-label="Group" id='BankId'
                name='BankId'
                value = {input.BankId}
                onChange={loadBankBranches}
                >
                <option value={0} >Select</option> 
                  {banks.map((option) => (
                    <option value={option.BankId}>{option.BankName}</option>
                  ))}

                </select>
              </div>

              <div className='col-md-4 my-2'>Bank Branch</div>
              <div className='col-md-8 my-1'>
                <Select options={branchNames}
                id='BranchName'
                name='BranchName'
                onChange={handleBranchNameChangte}
                isMulti={false}
                />
              </div>

              <div className="col-md-4 my-2">Cheque No</div>
              <div className='col-md-8'>
                <input className='form-control' type='text' id="ChequeNo" 
                name='ChequeNo'
                value={input.ChequeNo}
                onChange={handleInput}
                
                />
              </div>
              
              <div className="col-md-4 my-1">Cheque Date</div>
                  <div className='col-md-8'>
                    <Form.Group controlId="PeriodFrom">                    
                      <Form.Control type="date"  name="ChequeDate"   placeholder="yyyy-mm-dd"
                        value={input.FromDate}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </div>
              
              
            

              </div>
            </div>

           
            <div className='col-md my-2'>
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> Save</button>
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> New Entry</button>
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> Copy From CN</button> 
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> Copy From Bill</button> 
              <button type="button" className="btn btn-secondary mx-2"> Cancel</button>              
              <button type="button" className="btn btn-primary mx-2"><i className="fa-regular fa-file-pdf"></i>PDF</button>
              
            </div>
          </div>
        </div>
        </div>
        </div>
        
    </>
    </>
  )
}
