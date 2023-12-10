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



{/*https://react-select.com/home */}


export default function MarineCargoAddendum() {

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
        else if(e.target.type === 'radio')
        {
          setInput( prevState=>({...prevState,[e.target.id]: e.target.checked}))
        }
        else
        {
            setInput( prevState=>({...prevState,[e.target.name]: e.target.value}))
        }

        
        console.log(input); 
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
      var tempClient = {"ClientName": inputValue}
      axios.post(`${Constants.BASE_URL}/Client/search`,tempClient,auth)
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

    const handleChangeType=(e)=>{
      console.log(e.target.id);
    }
    
   

  return (
    <>
        <div className='container'>
        <h1 className="mt-4">Marine Cargo</h1>
        
        <div className="card col-md-12">
        <div className="card-header bg-info">New Addendum</div>
          
          

          <div className="card-body">
        
          <div className='row gx-2'>
            <div className="col-md-7 py-2" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}} >
            <div className="row "> 

            <div className='col-md-3 my-2'>Addendum No</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id="AddendumNo" autoComplete="off" 
                name="AddendumNo"
                value={input.CoverNoteNo}
                onChange={handleInput}                
                placeholder="Addendum No" />
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
              <option key={0} value={0} >Select</option> 
                {banks.map((option) => (
                  <option key={option.BankId} value={option.BankId}>{option.BankName}</option>
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
                <option key={0} value={0}>Select</option> 
                {bankBranches.map((option) => (
                  <option key={option.BranchId} value={option.BranchId}>{option.BranchName}</option>
                ))}
              </select>
            </div>

            <div className='col-md-3 my-2'>Address</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='BranchAddress' autoComplete="off"
                name='BranchAddress'  
                value={branchAddress}
                
                placeholder='Address' readOnly />
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
                <option key={0} >Select</option> 
                <option key={1} value={'Chattogram'}>Chattogram</option> 
                <option key={2} value={'Chattogram Port'}>Chattogram Port</option> 
                <option key={3} value={'Chattogram Port/Dhaka Airport'}>Chattogram Port/Dhaka Airport</option> 
                <option key={4} value={'Chattogram Seaport'}>Chattogram Seaport</option> 
                <option key={5} value={'Chattogram Seaport/Benapole'}>Chattogram Seaport/Benapole</option> 
                <option key={6} value={'Chattogram/Shahjalal Int. Airport'}>Chattogram/Shahjalal Int. Airport</option> 
                <option key={7} value={'Benapole'}>Benapole</option> 
                <option key={8}  value={'Mongla'}>Mongla</option> 
                <option key={9}  value={'Shahjalal Int. Airport'}>Shahjalal Int. Airport</option>  
                <option key={10} value={'Shahjalal International Airport'}>Shahjalal International Airport</option> 
                <option key={11} value={'Hazrat Shahjalal Int. Airport'}>Hazrat Shahjalal Int. Airport</option>                     
                <option key={12} value={'Hazrat Shahjalal International Airport'}>Hazrat Shahjalal International Airport</option>                     
                
              </select>
            </div>

            <div className='col-md-3 my-2'>Transit By</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group"
                name='TransitBy'
                value={input.TransitBy}
                onChange={handleInput}
                >
                <option key={0}>Select</option> 
                <option key={1} value={'Air'}>Air</option> 
                <option key={2} value={'Air/Ship'}>Air/Ship</option> 
                <option key={3} value={'Air/Lory/Rail'}>Air/Lory/Rail</option> 
                <option key={4} value={'Ship'}>Ship</option> 
                <option key={5} value={'Ship/Lorry'}>Ship/Lorry</option> 
                <option key={6} value={'Ship/Air/Lorry'}>Ship/Air/Lorry</option> 
                <option key={7} value={'Ship/Air/Lorry/Rail'}>Ship/Air/Lorry/Rail</option> 
                <option key={8} value={'Ship/Lorry/Rail'}>Ship/Lorry/Rail</option> 
                <option key={9} value={'Ship(On deck)'}>Ship(On deck)</option>  
                <option key={10} value={'Ship(Under deck)'}>Ship(Under deck)</option> 
                <option key={11} value={'Lorry'}>Lorry</option>                     
                <option key={12} value={'Lorry/Air'}>Lorry/Air</option>                     
                <option key={13} value={'Lorry/Covered Van'}>Lorry/Covered Van</option>
                <option key={14} value={'Lorry/Ferry'}>Lorry/Ferry</option>
                <option key={15} value={'Lorry and Barge'}>Lorry and Barge</option>
                <option key={16} value={'Lorry/Truck'}>Lorry/Truck</option>
                <option key={17} value={'Truck'}>Truck</option>
                <option key={18} value={'Rail'}>Rail</option>
                <option key={19} value={'Rail/Lorry'}>Rail/Lorry</option>
                <option key={20} value={'Rail/Lorry/Truck'}>Rail/Lorry/Truck</option>
                <option key={21} value={'Barge'}>Barge</option>
                <option key={22} value={'Own Power'}>Own Power</option>
                <option key={23} value={'Long Belt Conveyor'}>Long Belt Conveyor</option>
              </select>
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
              <option key={0}>Select</option> 
              <option key={1} value={'USD'}>US-US$</option> 
              <option key={2} value={'BDT'}>Bangladesh-BDT</option> 
              <option key={3} value={'AED'}>U.A.E-AED</option> 
              <option key={4} value={'AUD'}>Australian - AUD</option> 
              <option key={5} value={'CAD'}>Canadian-CAD</option> 
              <option key={6} value={'CHF'}>Swiss-CHF</option> 
              <option key={7} value={'DKK'}>Danish-DKK</option> 
              <option key={8} value={'GBP'}>UK-GBP</option> 
              <option key={9} value={'HKD'}>Hong Kong-HKD</option>  
              <option key={10} value={'INR'}>Indian-INR</option> 
              <option key={11} value={'IRR'}>Iranian-IRR</option>                     
              <option key={12} value={'JPY'}>Japanese-JPY</option>                     
              <option key={13} value={'LKR'}>LKR</option>
              <option key={14} value={'MMK'}>Mayanmar-MMK</option>                   
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

            <div className='col-md-3 my-2'>Change Type</div>
            <div className='col-md-2 my-1 '>                  
                <input className="form-check-input" type="radio" id='Increase' autoComplete="off" 
                    name='changeType' 
                    value={input.MarineAmount}
                    onChange={handleChangeType}
                    placeholder='' />
                <label className="form-check-label" htmlFor="Gurantee">&nbsp;Increase </label>
                
              </div>
              <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='Decrease' autoComplete="off" 
                      name='changeType' 
                      value={input.MarineAmount}
                      onChange={handleChangeType}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="Decrease">&nbsp; Decrease </label>
                  
                </div>
                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='Cancel' autoComplete="off" 
                      name='changeType' 
                      value={input.MarineAmount}
                      onChange={handleChangeType}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="Gurantee">&nbsp; Cancel </label>                  
                </div>
                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='Others' autoComplete="off" 
                      name='changeType' 
                      value={input.MarineAmount}
                      onChange={handleChangeType}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="Gurantee">&nbsp; Others </label>
                  
                </div>

                <div className='col-md-4 my-1 '>                  
                  <input className="form-check-input" type="checkbox" id='Balance' autoComplete="off" 
                      name='Balance' 
                      value={input.Balance}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label text-danger" htmlFor="Balance" >&nbsp; Balance </label>
                  
                </div>
                <div className='col-md-4 my-1 '>                  
                  <input className="form-check-input" type="checkbox" id='NotUtilized' autoComplete="off" 
                      name='NotUtilized' 
                      value={input.NotUtilized}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label text-danger" htmlFor="NotUtilized">&nbsp; Not Utilized </label>
                  
                </div>
                <div className='col-md-4 my-1 '>                  
                  <input className="form-check-input" type="checkbox" id='FullCancel' autoComplete="off" 
                      name='FullCancel' 
                      value={input.FullCancel}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label text-danger" htmlFor="FullCancel">&nbsp; Full Cancel </label>
                  
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

                <div className='col-md-4 my-0'>Tax with Rate</div>
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
                      <option key={0} value={0} >Select</option> 
                         {companies.map((option) => (
                          <option key={option.CompanyId} value={option.CompanyId}>{option.CompanyName}</option>
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
                  <label className="form-check-label" htmlFor="Gurantee">&nbsp; B.G </label>
                  
                </div>

                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='Gurantee' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="coDocNo">&nbsp; DP </label>
                </div>

                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='coDocNo' autoComplete="off" 
                      name='Gurantee' 
                      value={input.MarineAmount}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="coDocNo">NO</label>
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
                  <option key={0} value={''}>Select</option> 
                  <option key={1} value={'Cash'}>Cash</option> 
                  <option key={2} value={'Cheque'}>Cheque</option>
                  <option key={3} value={'Bank Draft'}>Credit Advice</option>
                  <option key={4} value={'DD'}>DD</option>
                  <option key={5} value={'DD'}>Deposit Premium</option>
                  <option key={6} value={'DD'}>Pay Order</option>
                  <option key={7} value={'DD'}>Bank Guarantee</option>
                  <option key={8} value={'DD'}>Fund Transfer</option>
                  <option key={9} value={'DD'}>BEFTN/EFTN</option>
                  <option key={10} value={'DD'}>Cash/CA/CQ/PO/Dranf No</option>
                  
                </select>
              </div>
                
                <div className='col-md-4 my-2'>Bank Branch</div>
                <div className='col-md-8 my-1'>
                <select className="form-select" aria-label="Group" id='BankId'
                name='BankId'
                value = {input.BankId}
                onChange={loadBankBranches}
                >
                <option key={0} value={0} >Select</option> 
                  {banks.map((option) => (
                    <option key={option.BankId} value={option.BankId}>{option.BankName}</option>
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
