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
import AsyncSelect from 'react-select/async'
import { type } from '@testing-library/user-event/dist/type';
import { render } from '@testing-library/react';


{/*https://react-select.com/home */}


export default function MarineCargoPolicyNew() {

    const [input,setInput] = useState(
      {
        CoverNoteNo: '',
        CoverNoteDate: new Date().toISOString().substr(0, 10),
        FromDate: new Date().toISOString().substr(0, 10),
        ToDate: new Date().toISOString().substr(0, 10)
        
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
    console.log(e);
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
      .catch(function(error){}
      )     

    }
    else{
      //setValue(inputValue.replace('/','~') );
      var tempClient = {"ClientName": inputValue};
      axios.post(`${Constants.BASE_URL}/Client/search`, tempClient,auth)
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
      .catch(function(error){}
      ) 
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
    
   

  return (
    <>
        <div className='container'>
        <h1 className="mt-4">Marine Cargo</h1>
        
        <div className="card col-md-12">
        <div className="card-header bg-info">New Policy</div>
          
          

          <div className="card-body">
        
          <div className='row gx-2'>
            <div className="col-md-7 py-2" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}} >
            <div className="row "> 

            <div className='col-md-3 my-2'>Policy No</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id="CoverNoteNo" autoComplete="off" 
                name="CoverNoteNo"
                value={input.CoverNoteNo}
                onChange={handleInput}                
                placeholder="Policy No" />
            </div>

            <div className='col-md-3 my-2'>Cover Note No</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id="CoverNoteNo" autoComplete="off" 
                name="CoverNoteNo"
                value={input.CoverNoteNo}
                onChange={handleInput}                
                placeholder="Cover Note No" />
            </div>

            <div className='col-md-3 my-2'>Client</div>
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
                
                placeholder='Address' />
            </div>

            <div className='col-md-3 my-2'>Voyage From</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id='VoyageFrom' autoComplete="off" 
                name='VoyageFrom'
                defaultValue={'Any port of '}
                value={input.VoyageFrom}
                
                onChange={handleInput}                
                placeholder=''  />
            </div>

            <div className='col-md-3 my-2'>Voyage To</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id='VoyageTo' autoComplete="off" 
                name='VoyageTo'
                defaultValue={'Factory site at '}
                value={input.VoyageFrom}
                onChange={handleInput}                
                placeholder=''  />
            </div>

            <div className='col-md-3 my-2'>Via</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group"
                name='Via'
                value={input.Via}
                onChange={handleInput}
                >
                <option>Select</option> 
                <option value={'Chattogram'}>Chattogram</option> 
                <option value={'Chattogram Port'}>Chattogram Port</option> 
                <option value={'Chattogram Port/Dhaka Airport'}>Chattogram Port/Dhaka Airport</option> 
                <option value={'Chattogram Seaport'}>Chattogram Seaport</option> 
                <option value={'Chattogram Seaport/Benapole'}>Chattogram Seaport/Benapole</option> 
                <option value={'Chattogram/Shahjalal Int. Airport'}>Chattogram/Shahjalal Int. Airport</option> 
                <option value={'Benapole'}>Benapole</option> 
                <option value={'Mongla'}>Mongla</option> 
                <option value={'Shahjalal Int. Airport'}>Shahjalal Int. Airport</option>  
                <option value={'Shahjalal International Airport'}>Shahjalal International Airport</option> 
                <option value={'Hazrat Shahjalal Int. Airport'}>Hazrat Shahjalal Int. Airport</option>                     
                <option value={'Hazrat Shahjalal International Airport'}>Hazrat Shahjalal International Airport</option>                     
                
              </select>
            </div>

            <div className='col-md-3 my-2'>Transit By</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group"
                name='TransitBy'
                value={input.TransitBy}
                onChange={handleInput}
                >
                <option>Select</option> 
                <option value={'Air'}>Air</option> 
                <option value={'Air/Ship'}>Air/Ship</option> 
                <option value={'Air/Lory/Rail'}>Air/Lory/Rail</option> 
                <option value={'Ship'}>Ship</option> 
                <option value={'Ship/Lorry'}>Ship/Lorry</option> 
                <option value={'Ship/Air/Lorry'}>Ship/Air/Lorry</option> 
                <option value={'Ship/Air/Lorry/Rail'}>Ship/Air/Lorry/Rail</option> 
                <option value={'Ship/Lorry/Rail'}>Ship/Lorry/Rail</option> 
                <option value={'Ship(On deck)'}>Ship(On deck)</option>  
                <option value={'Ship(Under deck)'}>Ship(Under deck)</option> 
                <option value={'Lorry'}>Lorry</option>                     
                <option value={'Lorry/Air'}>Lorry/Air</option>                     
                <option value={'Lorry/Covered Van'}>Lorry/Covered Van</option>
                <option value={'Lorry/Ferry'}>Lorry/Ferry</option>
                <option value={'Lorry and Barge'}>Lorry and Barge</option>
                <option value={'Lorry/Truck'}>Lorry/Truck</option>
                <option value={'Truck'}>Truck</option>
                <option value={'Rail'}>Rail</option>
                <option value={'Rail/Lorry'}>Rail/Lorry</option>
                <option value={'Rail/Lorry/Truck'}>Rail/Lorry/Truck</option>
                <option value={'Barge'}>Barge</option>
                <option value={'Own Power'}>Own Power</option>
                <option value={'Long Belt Conveyor'}>Long Belt Conveyor</option>
              </select>
            </div>

            <div className='col-md-3 my-2'>Bill of Lading</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id='BillofLading' autoComplete="off" 
                name='BillofLading'
                
                value={input.BillofLading}
                
                onChange={handleInput}                
                placeholder=''  />
            </div>

            <div className='col-md-3 my-2'>B/L Date</div>
            <div className='col-md-4 my-1'>
              <Form.Group controlId="PeriodFrom">                    
                  <Form.Control type="date"  name="BLDate" id="BLDate" 
                    value={input.BLDate}
                    onChange={handleInput}
                  />
              </Form.Group>             
              
            </div>
            <div className='col-md-2 my-2'>Sailing Date</div>
            <div className='col-md-3 my-1'>
              <Form.Group controlId="PeriodFrom">                    
                  <Form.Control type="date"  name="BLDate" id="BLDate" 
                    value={input.BLDate}
                    onChange={handleInput}
                  />
              </Form.Group>             
              
            </div>

            <div className='col-md-3 my-2'>L/C No</div>
            <div className='col-md-4 my-1'>
                <input type="text" className="form-control" id='LCNo' autoComplete="off" 
                name='LCNo'
                
                value={input.LCNo}
                
                onChange={handleInput}                
                placeholder=''  />
            </div>
            <div className='col-md-2 my-2'>L/C Date</div>
            <div className='col-md-3 my-1'>
              <Form.Group controlId="PeriodFrom">                    
                  <Form.Control type="date"  name="LCDate" id="LCDate" 
                    value={input.LCDate}
                    onChange={handleInput}
                  />
              </Form.Group>             
              
            </div>

            <div className='col-md-3 my-2'>Invoice No</div>
            <div className='col-md-4 my-1'>
                <input type="text" className="form-control" id='InvoiceNo' autoComplete="off" 
                name='InvoiceNo'
                
                value={input.InvoiceNo}
                
                onChange={handleInput}                
                placeholder=''  />
            </div>
            <div className='col-md-2 my-2'>Invoice Date</div>
            <div className='col-md-3 my-1'>
              <Form.Group controlId="PeriodFrom">                    
                  <Form.Control type="date"  name="InvoiceDate" id="InvoiceDate" 
                    value={input.InvoiceDate}
                    onChange={handleInput}
                  />
              </Form.Group>             
              
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

            <div className='col-md-2 my-2'>To</div>
            <div className='col-md-3 my-1'>
            <Form.Group controlId="PeriodTo">                    
                <Form.Control type="date"  name="ToDate" placeholder="dd-mm-yyyy" 
                  value={input.ToDate}
                  onChange={handleDate}
                />
            </Form.Group>
            </div>

            <div className='col-md-3 my-2'>Foreign Currency</div>
            <div className='col-md-3 my-1'>
              <input type="Number" className="form-control" id='ForeignCurrencyAmt' autoComplete="off"
              name='ForeignCurrencyAmt'  
              value={input.ForeignCurrencyAmt}
              onChange={handleInput}
              placeholder='' />
            </div>
            <div className='col-md-1 my-3'>Ext%</div>
            <div className='col-md-1 my-1 '>
            <input className="form-check-input my-3" type="checkbox"  id='chkExtra' autoComplete="off" 
            name='chkExtra' 
            value={input.chkExtra}
            />
            </div>
            <div className='col-md-2 my-1'>
              <input type="Number" className="form-control" id='Test1' autoComplete="off"
              name='Test1'  
              value={input.Test1}
              onChange={handleInput}
              placeholder='' />
            </div>
            <div className='col-md-2 my-1 mx-0'>
              <input type="Number" className="form-control" id='Test2' autoComplete="off"
              name='Test2'  
              value={input.Test2}
              onChange={handleInput}
              placeholder='' />
            </div>

            <div className='col-md-3 my-2'>Currency Name</div>
            <div className='col-md-3 my-1'>
            <select className="form-select" aria-label="Group"
              name='CurrencyID'
              value={input.CurrencyID}
              onChange={handleInput}
              >
              <option>Select</option> 
              <option value={'USD'}>US-US$</option> 
              <option value={'BDT'}>Bangladesh-BDT</option> 
              <option value={'AED'}>U.A.E-AED</option> 
              <option value={'AUD'}>Australian - AUD</option> 
              <option value={'CAD'}>Canadian-CAD</option> 
              <option value={'CHF'}>Swiss-CHF</option> 
              <option value={'DKK'}>Danish-DKK</option> 
              <option value={'GBP'}>UK-GBP</option> 
              <option value={'HKD'}>Hong Kong-HKD</option>  
              <option value={'INR'}>Indian-INR</option> 
              <option value={'IRR'}>Iranian-IRR</option>                     
              <option value={'JPY'}>Japanese-JPY</option>                     
              <option value={'LKR'}>LKR</option>
              <option value={'MMK'}>Mayanmar-MMK</option>                   
            </select>
            </div>

            <div className='col-md-2 my-2'>Rate</div>
            <div className='col-md-3 my-1'>
              <input type="Number" className="form-control" id='Rate' autoComplete="off"
              name='Rate'  
              value={input.Rate}
              onChange={handleInput}
              placeholder='' />
            </div>

            <div className='col-md-3 my-2'>Total Amount</div>
            <div className='col-md-3 my-1'>
              <input type="text" className="form-control" id='TotalAmount' autoComplete="off"
              name='TotalAmount'  
              value={input.TotalAmount}
              /* onChange={handleInput} */
              placeholder='' />
            </div>

            <div className='col-md-2 my-2'>MR No</div>
            <div className='col-md-3 my-1'>
              <input type="text" className="form-control" id='MoneyReceiptNo' autoComplete="off"
              name='MoneyReceiptNo'  
              value={input.TotalAmount}
              onChange={handleInput}
              placeholder='' />
            </div>

            <div className='col-md-3 my-2'>Interest covered</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='Coverage' autoComplete="off"
                name='Coverage'  
                value={input.ClientAddress}
                onChange={handleInput}
                placeholder='Interest covered' />
            </div>
            <div className='col-md-3 my-2'>Risks</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='Risks' autoComplete="off"
                name='Risks'  
                value={input.ClientAddress}
                onChange={handleInput}
                placeholder='Risks' />
            </div>
            <div className='col-md-3 my-2'>Remarks</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='Remarks' autoComplete="off"
                name='Remarks'  
                value={input.ExtraClauses}
                onChange={handleInput}
                placeholder='Remarks' />
            </div>

            </div>
            </div> 
            
            
            <div className="col-md-4 mx-3" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}}>
              <div className="row">
                <div className='col-md-4 my-3'>Date</div>
                <div className='col-md-8 my-1'>
                  <Form.Group controlId="CoverNoteDate">                    
                      <Form.Control type="date" name="CoverNoteDate" placeholder="Date" pattern="\d{4}-\d{2}-\d{2}"
                        value={input.CoverNoteDate}
                        onChange={handleInput}
                      />
                  </Form.Group>
                </div>

               

                <div className='col-md-4 my-2'>Discount</div>
                <div className='col-md-3 '>
                <input type="number" className="form-control" id='Discount' autoComplete="off"
                    name='Discount' 
                    value={input.Discount}
                    onChange={handleInput}
                    placeholder='' />
                </div>

                <div className='col-md-2 my-2'>S.D.</div>
                <div className='col-md-3  '>
                  <input type="number" className="form-control" id='SD' autoComplete="off"
                      name='SD' 
                      value={input.SD}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-1'>Tax with Rate</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='TaxWithRate' autoComplete="off"
                      name='TaxWithRate' 
                      value={input.TaxWithRate}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Marine @</div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='MarineAmount' autoComplete="off"
                      name='MarineAmount' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='MarineAmount2' autoComplete="off"
                      name='MarineAmount2' 
                      value={input.MarineAmount2}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-0'>War & SRCC</div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='MarineAmount' autoComplete="off"
                      name='MarineAmount' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='MarineAmount2' autoComplete="off"
                      name='MarineAmount2' 
                      value={input.MarineAmount2}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Net Premium</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='NetPremium' autoComplete="off"
                      name='NetPremium' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-3'>VAT</div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='VatPercent' autoComplete="off"
                      name='VatPercent' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='VatAmount' autoComplete="off"
                      name='VatAmount' 
                      value={input.MarineAmount2}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-3'>Stamp Duty</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='StampDuty' autoComplete="off"
                      name='StampDuty' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Grand Total</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='GrandTotal' autoComplete="off"
                      name='GrandTotal' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
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
                <div className='col-md-2 my-2'>Export</div>
                <div className='col-md-1 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isWeLeader' autoComplete="off"
                          name='isWeLeader' 
                          value={input.MarineAmount}
                          onChange={toggleExport} />
                    </div>
                <div className='col-md-2 my-2'>Open</div>
                <div className='col-md-1 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isWeLeader' autoComplete="off"
                          name='isWeLeader' 
                          value={input.MarineAmount}
                          onChange={handleInput} />
                    </div>
                <div className='col-md-3 my-2'>As Open</div>
                <div className='col-md-1 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isWeLeader' autoComplete="off"
                          name='isWeLeader' 
                          value={input.MarineAmount}
                          onChange={handleInput} />
                    </div>

                { exportVisible && <>
                <div className='col-md-7 my-2'>Single Carry Limit By Ship</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='coDocNo' autoComplete="off"
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Single Carry Limit By Air</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='coDocNo' autoComplete="off"
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Single Carry Limit By Lorry</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='coDocNo' autoComplete="off"
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Single Carry Limit By Train</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='coDocNo' autoComplete="off"
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                </>
              }
                <div><hr/></div>
                
                <div className='col-md-3 my-1'>Gurantee</div>
                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='Gurantee' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" for="Gurantee">&nbsp; B.G </label>
                  
                </div>

                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='Gurantee' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" for="coDocNo">&nbsp; DP </label>
                </div>

                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='Gurantee' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" for="coDocNo">NO</label>
                </div>
              
              
                
                <div className='col-md-3 my-1'>Signature</div>
                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" for="coDocNo">&nbsp; 1st </label>
                  
                </div>

                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" for="coDocNo">&nbsp; 2nd </label>
                </div>

                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='coDocNo' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" for="coDocNo"> 3rd </label>
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
                
                <div className='col-md-4 my-2'>Bank Branch</div>
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
  )
}
