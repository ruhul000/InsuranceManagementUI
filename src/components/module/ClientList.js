import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from '../../Constants';
import Swal from 'sweetalert2'
import Nav from '../layout/Nav';
import SideBar from '../layout/SideBar';
import Footer from '../layout/Footer';
import { useNavigate,Link } from "react-router-dom";


export default function ClientList() {

    const [inputValue, setValue] = useState('');

    const handleInputChange = e => {
        setValue(e.target.value.replace('/','~') );
        
        
      };

    if(localStorage.getItem('Token') != 'undefined')
    {
        var authKey = localStorage.getItem('Token');    
    }

    const auth = {
    headers: {
            'Authorization': 'bearer ' + authKey 
        }
    }

    const [data, setData] = useState([]);

    const loadClients=()=>{
        console.log(inputValue);
        if(inputValue==='')
        {
            axios.get(`${Constants.BASE_URL}/Client/Clients`,auth)
            .then(res=>{
                    setData(res.data);                                                         
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
            else
            {
                var tempClient = {"ClientName": inputValue}
                axios.post(`${Constants.BASE_URL}/Client/search/`,tempClient,auth)
                .then(res=>{
                        setData(res.data);                        
                                        
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
    }


    useEffect(()=>{
            loadClients();

    },[inputValue] )

    
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
                    console.log(`${Constants.BASE_URL}/Client/${e}`);
                    axios.delete(`${Constants.BASE_URL}/Client/delete?clientKey=${e}`,auth).then(res=>{
                        
                        if(res.data === true)
                        {
                            loadClients();
                        }                  
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
                catch (error) {
                    console.error(error);
                }
            }
            
        })
    }
    
    const navigate = useNavigate();
    const LoadEditComponent =(e)=>{
        navigate("/client/Edit/"+e);
    }
		
		

  return (


    <>
      
                
      <div className='container'>
            <h1 className="mt-4">Client</h1>
        
            <div className="card col-md-12">
                <div className="card-header container-fluid bg-info">
                    <div className="row">
                        <div className="col-md-4 my-0">
                            Client List
                        </div>
                        <div className='col-md-6 my-0'>
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Search Client" aria-label="Search for..." aria-describedby="btnClientSearch"
                                onChange={handleInputChange}
                                />
                                <button className="btn btn-primary" id="btnClientSearch" type="button" onClick={loadClients}><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-md-2 my-0 float-right">
                            <Link to="/ClientNew" >
                                <button className="btn btn-primary"  ><i className="fa-solid fa-plus"></i> Add</button>                        
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
                                    <th>Mobile</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Contact Person</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((client, index)=>{
                                        return <tr key={index}>
                                            <td>{client.ClientKey}</td>
                                            <td>{client.ClientName}</td>
                                            <td>{client.ClientMobile}</td>
                                            <td>{client.ClientPhone}</td>
                                            <td>{client.ClientEMail}</td>
                                            <td>{client.ClientContractPer}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" ><i className="far fa-eye"></i></button>
                                                <button type="button" className="btn btn-success mx-1" onClick={()=> LoadEditComponent(client.ClientKey)} ><i className="fas fa-edit"></i></button>
                                                <button type="button" className="btn btn-danger mx-1"  onClick={() => ShowAlert(client.ClientKey)}  ><i className="far fa-trash-alt" ></i></button>
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
