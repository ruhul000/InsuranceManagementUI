import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';

export default function BankDeposit() {
    
    const [input,setInput] = useState(
    {
        CompanyId: 0,        
        CompanyName: '',
        status:true
    });

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

  return (
    <>
    <div className='container'>
      <h1 className="mt-4">Bank Deposit</h1>
      
      <div className="card col-md-12">
      <div className="card-header container-fluid bg-info">
          <div className="row">
              <div className="col-md-10 my-0">
                  Bank Deposit
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
            <div className='col-md-2 my-2'>MR No</div>
            <div className='col-md-4 my-1'>
              <input type="text" className="form-control" id='MRNo' autoComplete="off"
              name='MRNo' 
              value={input.MRNo}
              onChange={handleInput}
              placeholder='MR No'
              />
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
          <div className='col-md-2 my-2'>Account Name</div>
                <div className='col-md-4 my-1'>
                <select className="form-select" aria-label="Group" id='BankId'
                name='BankId'
                value = {input.BankId}
                onChange={handleInput}
                >
                <option value={0}>Select</option>

                </select>
              </div>

          <div className='col-md-2 my-2'>Deposit Premium</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='DepositPremium' autoComplete="off"
                  name='DepositPremium'  
                  value={input.DepositPremium}
                  onChange={handleInput}
                  placeholder='Deposit Premium' />
          </div>
          <div className='col-md-2 my-2'>Deposit VAT</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='DepositVAT' autoComplete="off"
                  name='DepositVAT'  
                  value={input.DepositVAT}
                  onChange={handleInput}
                  placeholder='Deposit VAT' />
          </div>

          <div className='col-md-2 my-2'>Deposit Stamp</div>
          <div className='col-md-4 my-1 '>
                <input  type='number'  className="form-control" id='DepositStamp' autoComplete="off"
                name='DepositStamp'  
                value={input.DepositStamp}
                onChange={handleInput}
                placeholder='Deposit Stamp' />
            </div>

          <div className='col-md-2 my-2'>Client VAT</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='ClientVAT' autoComplete="off"
                  name='ClientVAT'  
                  value={input.ClientVAT}
                  onChange={handleInput}
                  placeholder='Client VAT' />
          </div>

          <div className='col-md-2 my-2'>Extra</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='ExtraAmount' autoComplete="off"
                  name='ExtraAmount'  
                  value={input.ExtraAmount}
                  onChange={handleInput}
                  placeholder='Extra Amount' />
          </div>

          <div className='col-md-2 my-2'>Deposit Gross</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='GrossDeposit' autoComplete="off"
                  name='GrossDeposit'  
                  value={input.GrossDeposit}
                  onChange={handleInput}
                  placeholder='Gross Deposit' />
          </div>

          <div className='col-md-2 my-2'>Surcharge</div>
          <div className='col-md-4 my-1'>
              <input type="number" className="form-control" id='Surcharge' autoComplete="off"
                  name='Surcharge'  
                  value={input.Surcharge}
                  onChange={handleInput}
                  placeholder='Surcharge' />
          </div>          

          <div className='col-md-2 my-2'>Deposit type</div>
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
            
            <div className='col-md-2 my-2'>Deposit Date</div>
            <div className='col-md-4 my-1'>
              <Form.Group controlId="MrDate">                    
                  <Form.Control type="date"  name="MrDate" placeholder="yyyy-mm-dd"
                    value={input.MrDate}
                    onChange={handleInput}
                  />
              </Form.Group>
            </div>
            <div className='col-md-2 my-2'>Credit Date</div>
            <div className='col-md-4 my-1'>
              <Form.Group controlId="MrDate">                    
                  <Form.Control type="date"  name="MrDate" placeholder="yyyy-mm-dd"
                    value={input.MrDate}
                    onChange={handleInput}
                  />
              </Form.Group>
            </div>
            
            <div className='col-md-2 my-2'>Deposit Slip No</div>
                <div className='col-md-4 my-1'>
                <input type="text" className="form-control"  id='DepositSlipNo' autoComplete='false'
                  name='DepositSlipNo'
                  value={input.DepositSlipNo}
                  onChange={handleInput}
                  placeholder='Deposit Slip No'
                
                />

              </div> 

          
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row p-1 border">
              <div className="card col-md-12 text-center" style={{backgroundColor:'lightGrey'}}>BUSINESS</div>
              <div className="col-md-3 my-2">Net Premium</div>
              <div className="col-md-3 my-1">
                <input type="number" className="form-control" id='NetPremium' autoComplete='false'
                name='NetPremium'
                value={input.NetPremium}
                readOnly
                />
              </div>
              <div className="col-md-3 my-2">VAT Amount</div>
              <div className="col-md-3 my-1">
                <input type="number" className="form-control" id='VATAmount' autoComplete='false'
                name='VATAmount'
                value={input.VATAmount}
                readOnly
                />
              </div>

              <div className="col-md-3 my-2">Stamp Duty</div>
              <div className="col-md-3 my-1">
                <input type="number" className="form-control" id='NetPremium' autoComplete='false'
                name='NetPremium'
                value={input.NetPremium}
                readOnly
                />
              </div>
              <div className="col-md-3 my-2">Gross</div>
              <div className="col-md-3 my-1">
                <input type="number" className="form-control" id='VATAmount' autoComplete='false'
                name='VATAmount'
                value={input.VATAmount}
                readOnly
                />
              </div>
              
              <div className="col-md-3 my-2">Class Name</div>
              <div className="col-md-3 my-1">
                <input type="text" className="form-control" id='NetPremium' autoComplete='false'
                name='NetPremium'
                value={input.NetPremium}
                readOnly
                />
              </div>

              <div className="col-md-3 my-2">Producer</div>              
              <div className="col-md-3 my-1">
                <input type="text" className="form-control" id='VATAmount' autoComplete='false'
                name='VATAmount'
                value={input.VATAmount}
                readOnly
                />
              </div>

            </div>
          </div>
          <div className="col-md-6 ">
            <div className="row p-1 border">
              <div className="card col-md-12 text-center" style={{backgroundColor:'lightGrey'}}>
                Payment Option
              </div>
              
              <div className="col-md-4 my-2" >Payment Mode</div>
              <div className="col-md-8 my-1">
                <select  className="form-select" name="PaymentMode" id="PaymentMode"
                  onChange={handleInput}
                >
                  <option value="{0}">Select</option>
                </select>
              </div>

              <div className="col-md-4 my-2" >Bank</div>
              <div className="col-md-8 my-1">
                <select  className="form-select" name="BankID" id="BankID"
                  onChange={handleInput}
                >
                  <option value="{0}">Select</option>
                </select>
              </div>

              <div className="col-md-4 my-2" >Branch</div>
              <div className="col-md-8 my-1">
                <input type="text" className="form-control" id='BankBranch' autoComplete='false'
                name='BankBranch'
                onChange={handleInput}
                />
              </div>

              <div className="col-md-4 my-2" >Cheque No</div>
              <div className="col-md-4 my-1">
                <input type="text" className="form-control" id='BankBranch' autoComplete='false'
                name='BankBranch'
                onChange={handleInput}
                />
              </div>
              <div className='col-md-4 my-1'>
                <Form.Group controlId="MrDate">                    
                    <Form.Control type="date"  name="MrDate" placeholder="yyyy-mm-dd"
                      value={input.MrDate}
                      onChange={handleInput}
                    />
                </Form.Group>
              </div>
              
              
            </div>
          </div>
        </div>
        <div className="row">
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
