import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Constants from '../../../Constants';
import Swal from 'sweetalert2'
import Nav from '../../layout/Nav';
import SideBar from '../../layout/SideBar';
import Footer from '../../layout/Footer';
import { useNavigate,Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { type } from '@testing-library/user-event/dist/type';
import { render } from '@testing-library/react';
import DateTimePicker from 'react-datetime-picker';

export default function InsuranceCompanyList() {

    if(localStorage.getItem('Token') != 'undefined')
    {
    var authKey = localStorage.getItem('Token');
    console.log(authKey);
    }

    const auth = {
    headers: {
            'Authorization': 'bearer ' + authKey 
        }
    }

    const [data, setData] = useState([]);

    const loadCompanies=()=>{
        axios.get(`${Constants.BASE_URL}/InsuranceCompany/InsuranceCompanies`,auth)
            .then(res=>{
                    setData(res.data);                    
                }
            )
            .catch(function(error) {
    
                
                if(error.message==='Request failed with status code 404')
                {
                    setData([]);
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
            loadCompanies();

    },[] )

    
    const ShowAlert=(e)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value === true) {
                try{
                    
                    axios.delete(`${Constants.BASE_URL}/InsuranceCompany/delete?CompanyId=${e}`,auth).then(res=>{
                        
                        if(res.data === true)
                        {
                            loadCompanies();
                        }                  
                    }
                )
                .catch(function(error) {        
                    
                    if(error.message==='Request failed with status code 404')
                    {
                        setData([]);
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
                catch (error) {
                    console.error(error);
                }
            }
            
        })
    }
    
    const navigate = useNavigate();
    const LoadEditComponent =(e)=>{
        navigate("/InsuranceCompany/edit/"+e);
    }

  return (
    <>
                      
        <div className='container'>
            <h1 className="mt-4">Insurance Company</h1>
        
            <div className="card col-md-12">
                
                <div className="card-header container-fluid bg-info">
                    <div className="row">
                        <div className="col-md-10 my-0">
                            Company List
                        </div>
                        <div className="col-md-2 my-0 float-right">
                            <Link to="/InsuranceCompanyNew" >
                                <button className="btn btn-primary"  >Add</button>                        
                            </Link>                            
                        </div>
                    </div>
                </div>
                    
                    

          
                <div className="card-body">
        
                    <div className='mt-3'>

                        <table className="table table-striped">
                            <thead>
                                <tr className="table table-striped">
                                    <th>ID</th>
                                    <th>Name</th>                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((company, index)=>{
                                        return <tr key={index}>
                                            <td>{company.CompanyId}</td>
                                            <td>{company.CompanyName}</td>                                            
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" ><i className="far fa-eye"></i></button>
                                                <button type="button" className="btn btn-success mx-1" onClick={()=> LoadEditComponent(company.CompanyId)} ><i className="fas fa-edit"></i></button>
                                                <button type="button" className="btn btn-danger mx-1"  onClick={() => ShowAlert(company.CompanyId)}  ><i className="far fa-trash-alt" ></i></button>
                                            </td>

                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        
		
                                
        
                    </div>      
                </div>
            </div>
        </div>
       
       
    </>
  )
}
