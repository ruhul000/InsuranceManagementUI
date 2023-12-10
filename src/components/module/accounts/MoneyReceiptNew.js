import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';


export default function MoneyReceiptNew() {

    const [banks, setBanks] = useState([]);    
    const [errors,setErrors] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [input,setInput] = useState(
    {
        CompanyId: 0,        
        CompanyName: '',
        status:true
    });

    const clearForm=()=>
    {
        setInput(
            {
                CompanyId: 0,        
                CompanyName: '',
                status:true
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

if(localStorage.getItem('Token') !== 'undefined')
{
  var authKey = localStorage.getItem('Token');
}

const auth = {
  headers: {
    'Authorization': 'bearer ' + authKey 
  }
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
      <h1 className="mt-4">Money Receipt</h1>
      
      <div className="card col-md-12">
      <div className="card-header container-fluid bg-info">
          <div className="row">
              <div className="col-md-10 my-0">
                  Money Receipt
              </div>
              <div className="col-md-2 my-0 float-right">
                 {/*  <Link to="/InsuranceCompany" >
                      <button className="btn btn-primary"  >List</button>                        
                  </Link>   */}                          
              </div>
          </div>
      </div>
        
        <div className="card-body">
        <div className='row border p-2' style={{backgroundColor:'LightGray'}} >
          <div className="col-md-2">Search Money Receipt</div>
          <div className="col-md-2">Class Name</div>
          <div className="col-md-2">
            <select className="form-select" aria-label="Group" id='BusinessClass'
                  name='BusinessClass'
                  value = {input.BusinessClass}
                  onChange={handleInput}
                  >
                  <option value={0} >Select</option> 
                  <option value={2} >Fire</option> 
                  <option value={3} >Motor</option> 
                  <option value={4} >Marine Cargo</option> 
                  <option value={5} >Marine Hull</option> 
                  <option value={6} >Miscellaneous</option>                 

              </select>
          </div>

          <div className="col-md-2 my-1">MR No</div>
            <div className="col-md-2 ">
            <input type="text" className="form-control" id='SearchMRNo' autoComplete="off"
                  name='SearchMRNo'  
                  value={input.SearchMRNo}
                  onChange={handleInput}
                  placeholder='MR No' />
          </div>
          <div className="col-md-2"></div>

          <div className="col-md-2 my-2">Doc No</div>
          <div className="col-md-4 my-1">
            <input type="text" className="form-control" id='SearchMRNo' autoComplete="off"
                  name='SearchMRNo'  
                  value={input.SearchMRNo}
                  onChange={handleInput}
                  placeholder='Doc No' />
          </div>
          <div className="col-md-2 my-2">Policy No</div>
          <div className="col-md-4 my-1">
            <input type="text" className="form-control" id='SearchMRNo' autoComplete="off"
                  name='SearchMRNo'  
                  value={input.SearchMRNo}
                  onChange={handleInput}
                  placeholder='Policy No' />
          </div>
          <div className="col-md-2 my-2">End No</div>
          <div className="col-md-4 my-1">
            <input type="text" className="form-control" id='SearchMRNo' autoComplete="off"
                  name='SearchMRNo'  
                  value={input.SearchMRNo}
                  onChange={handleInput}
                  placeholder='End No' />
          </div>
          <div className="col-md-2 my-2">Addn No</div>
          <div className="col-md-4 my-1" >
            <input type="text" className="form-control" id='SearchMRNo' autoComplete="off"
                  name='SearchMRNo'  
                  value={input.SearchMRNo}
                  onChange={handleInput}
                  placeholder='Addn No' />
          </div>


        </div>
        <div className='row gx-5'>
            <div className='col-md-2 my-2'>Document Type</div>
            <div className='col-md-4 my-1'>
              <select className="form-select" aria-label="Group"
                  name='DocumentType'
                  value={input.DocumentType}
                  onChange={handleInput}
                  >
                  <option value={0}>Select</option> 
                  <option value={1}>Fire</option>
                  <option value={2}>Motor</option> 
                  <option value={3}>Marine Cargo</option> 
                  <option value={4}>Marine Hull</option> 
                  <option value={5}>Engineering</option>  
                  <option value={6}>Miscellaneous</option>                    
                  </select>
            </div>
            <div className='col-md-2 my-2'>Date</div>
            <div className='col-md-4 my-1'>
              <Form.Group controlId="MrDate">                    
                  <Form.Control type="date"  name="MrDate" placeholder="yyyy-mm-dd"
                    value={input.MrDate}
                    onChange={handleInput}
                  />
              </Form.Group>
              
              
            </div>
          <div className='col-md-2 my-2'>Document No</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='DocumentNo' autoComplete="off"
                  name='DocumentNo'  
                  value={input.DocumentNo}
                  onChange={handleInput}
                  placeholder='Document No' />
          </div>
          <div className='col-md-2 my-2'>Policy No</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='PolicyNo' autoComplete="off"
                  name='PolicyNo'  
                  value={input.PolicyNo}
                  onChange={handleInput}
                  placeholder='Policy No' />
          </div>

          <div className='col-md-2 my-2'>Addendum No</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='AddendumNo' autoComplete="off"
                  name='DocumentNo'  
                  value={input.AddendumNo}
                  onChange={handleInput}
                  placeholder='Addendum No' />
          </div>
          <div className='col-md-2 my-2'>Endorsement No</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='EndorsementNo' autoComplete="off"
                  name='EndorsementNo'  
                  value={input.EndorsementNo}
                  onChange={handleInput}
                  placeholder='Endorsement No' />
          </div>

          <div className='col-md-2 my-2'>Party Name</div>
          <div className='col-md-4 my-1 '>
                <textarea   className="form-control" id='PartyName' autoComplete="off"
                name='PartyName'  
                value={input.PartyName}
                onChange={handleInput}
                placeholder='Party Name' />
            </div>

          <div className='col-md-2 my-2'>Net Premium</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='NetPremium' autoComplete="off"
                  name='NetPremium'  
                  value={input.NetPremium}
                  onChange={handleInput}
                  placeholder='Net Premium' />
          </div>

          <div className='col-md-2 my-2'>Vat Amount</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='VatAmount' autoComplete="off"
                  name='VatAmount'  
                  value={input.VatAmount}
                  onChange={handleInput}
                  placeholder='Vat Amount' />
          </div>

          <div className='col-md-2 my-2'>Stamp Duty</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='StamDuty' autoComplete="off"
                  name='StamDuty'  
                  value={input.StamDuty}
                  onChange={handleInput}
                  placeholder='Stam Duty' />
          </div>

          <div className='col-md-2 my-2'>S.C & Others</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='OtherCharge' autoComplete="off"
                  name='OtherCharge'  
                  value={input.OtherCharge}
                  onChange={handleInput}
                  placeholder='S.C & Others' />
          </div>

          <div className='col-md-2 my-2'>Gross</div>
          <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='GrossAmount' autoComplete="off"
                  name='GrossAmount'  
                  value={input.GrossAmount}
                  onChange={handleInput}
                  placeholder='Gross' />
          </div>

          <div className='col-md-2 my-2'>Payment Mode</div>
          <div className='col-md-4 my-1'>
              <select className="form-select" aria-label="Group" id='PaymentMode'
                name='PaymentMode'
                value = {input.PaymentMode}
                onChange={handleInput}
                >
                <option value={1} >Cash</option> 
                <option value={2} >Cheque</option> 
                <option value={3} >Credit Advance</option> 
                <option value={4} >DD</option> 
                <option value={5} >Deposit Premium</option> 
                <option value={6} >Pay Order</option> 
                <option value={7} >Bank Gurantee</option> 
                <option value={8} >Fund Transfer</option> 
                <option value={9} >Fund Transfer</option> 
                <option value={10} >BEFTN/EFTN</option>                 
                <option value={12} >Cash/CA/CQ/PA/Draft No</option> 

              </select>
            </div>
            <div className="col-md-6"></div>
            
            <div className='col-md-2 my-2'>Bank</div>
                <div className='col-md-4 my-1'>
                <select className="form-select" aria-label="Group" id='BankId'
                name='BankId'
                value = {input.BankId}
                onChange={handleInput}
                >
                <option key={0} value={0} >Select</option> 
                  {banks.map((option) => (
                    <option key={option.BankId} value={option.BankId}>{option.BankName}</option>
                  ))}

                </select>
              </div>

              <div className='col-md-2 my-2'>Bank Branch</div>
              <div className='col-md-4 my-1'>
                <input className="form-control" type='text' id='BranchName'
                  name='BranchName'
                  value={handleInput}
                  onChange={handleInput}
                />
              </div>

              <div className="col-md-2 my-2">Cheque No</div>
              <div className='col-md-4'>
                <input className='form-control' type='text' id="ChequeNo" 
                name='ChequeNo'
                value={input.ChequeNo}
                onChange={handleInput}
                
                />
              </div>
              
              <div className="col-md-2 my-1">Cheque Date</div>
                  <div className='col-md-4'>
                    <Form.Group controlId="PeriodFrom">                    
                      <Form.Control type="date"  name="ChequeDate"   placeholder="yyyy-mm-dd"
                        value={input.FromDate}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </div>          

          <div className='col-md my-2'>
          <button type="button" className="btn btn-primary " >Add New</button> 
            <button type="button" className="btn btn-primary mx-2" >Save</button> 
            <button type="button" className="btn btn-secondary "  >Cancel</button>
          </div>
        </div>
      </div>
      </div>
      </div>
    
 
  </>
  )
}
