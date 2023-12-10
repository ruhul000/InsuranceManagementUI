import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from '../../Constants';
import Swal from 'sweetalert2'
import Nav from '../layout/Nav';
import SideBar from '../layout/SideBar';
import Footer from '../layout/Footer';
import { useNavigate, Link } from "react-router-dom";
import DownloadLink from "react-download-link";


export default function BankList() {

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
    const [repH, setRepH ] = useState({"Title": "Bank List"})

    const loadBanks=()=>{
        axios.get(`${Constants.BASE_URL}/Bank/Banks`,auth)
            .then(res=>{
                    setData(res.data);
                    console.log(res.data);                    
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
    useEffect(()=>{
            loadBanks();

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
                    console.log(`${Constants.BASE_URL}/Bank/${e}`);
                    axios.delete(`${Constants.BASE_URL}/Bank/delete?BankId=${e}`,auth).then(res=>{
                        
                        if(res.data === true)
                        {
                            loadBanks();
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

    function saveAs(content, fileName) {
        const a = document.createElement("a");
        const isBlob = content.toString().indexOf("Blob") > -1;
        let url = content;
        if (isBlob) {
          url = window.URL.createObjectURL(content);
        }
        a.href = url;
        a.download = fileName;
        a.click();
        if (isBlob) {
          window.URL.revokeObjectURL(url);
        }
      }
    
    const DownloadFile =(e)=>{
        axios.post(`${Constants.BASE_URL}/Bank/GetAllBanks`, repH, auth,)
            .then(res=>{

                window.open('https://www.google.com', '_blank');
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

    const navigate = useNavigate();
    const LoadEditComponent =(e)=>{
        navigate("/bank/edit/"+e);
    }

  return (
     <>
                      
        <div className='container'>
            <h1 className="mt-4">Bank</h1>
        
            <div className="card col-md-12">
                
                <div className="card-header container-fluid bg-info" >
                    <div className="row">
                        <div className="col-md-8 my-0">
                            Bank List
                        </div>
                        
                        <div className="col-md-2 my-0 float-right">
                            <Link to="/BankNew" >
                                <button className="btn btn-primary"  >Add</button>                        
                            </Link>                            
                        </div>
                        <div className="col-md-2 my-0 float-right">
                            
                                <button className="btn btn-primary" onClick={DownloadFile}  >Download</button>                        
                            
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
                                    data.map((bank, index)=>{
                                        return <tr key={index}>
                                            <td>{bank.BankId}</td>
                                            <td>{bank.BankName}</td>                                            
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" ><i className="far fa-eye"></i></button>
                                                <button type="button" className="btn btn-success mx-1" onClick={()=> LoadEditComponent(bank.BankId)} ><i className="fas fa-edit"></i></button>
                                                <button type="button" className="btn btn-danger mx-1"  onClick={() => ShowAlert(bank.BankId)}  ><i className="far fa-trash-alt" ></i></button>
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
