import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from '../../Constants';
import Swal from 'sweetalert2'
import Nav from '../layout/Nav';
import SideBar from '../layout/SideBar';
import Footer from '../layout/Footer';
import { useNavigate,Link } from "react-router-dom";

export default function BankBranchList() {

    const [inputValue, setValue] = useState({"BankName":"", "BranchName":""});

    const handleInputChange = (e) => {
                
        setValue( prevState=>({...prevState,[e.target.name]: e.target.value}))
        
      };

    const handleKeyUp =(e)=>{
        if(e.code === "Enter" || e.code ==="NumpadEnter")
        {
            loadBankBranches();
        }
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

    const [data, setData] = useState([]);

    const loadBankBranches=()=>{
        
        axios.post(`${Constants.BASE_URL}/BankBranch/Search`,inputValue,auth)
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
                
            
                console.log(error);
                });
    }

    useEffect(()=>{
        loadBankBranches();

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
                console.log(`${Constants.BASE_URL}/BankBranch/${e}`);
                axios.delete(`${Constants.BASE_URL}/BankBranch/delete?branchId=${e}`,auth).then(res=>{
                    
                    if(res.data === true)
                    {
                        loadBankBranches();
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
        navigate("/BankBranch/Edit/"+e);
    }


  return (
    <>
                      
        <div className='container'>
            <h1 className="mt-4">Bank Branch</h1>
        
            <div className="card col-md-12">
                {/* <div className="card-header">Bank Branch List</div> */}
                <div className="card-header container-fluid bg-info">
                    <div className="row">
                        <div className="col-md-3 my-0">
                            Branch List
                        </div>
                        <div className="col-md-3 my-0">
                            <input className='form-control' type='text' placeholder='Bank Name' id='BankName' name='BankName'
                                onChange={handleInputChange} 
                                onKeyUp={handleKeyUp}
                            />
                        </div>
                        <div className='col-md-4 my-0'>
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Search Branch" aria-label="Search for..." aria-describedby="btnClientSearch" id='BranchName' name='BranchName'
                                onChange={handleInputChange}
                                onKeyUp={handleKeyUp}
                                />
                                <button className="btn btn-primary" id="btnClientSearch" type="button" onClick={loadBankBranches}><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-md-2 my-0 float-right">
                            <Link to="/BankBranchNew" >
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
                                    <th>Bank Name</th>
                                    <th>Branch</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((branch, index)=>{
                                        return <tr key={index}>
                                            <td>{branch.BranchId}</td>
                                            <td>{branch.BankName}</td>
                                            <td>{branch.BranchName}</td>
                                            <td>{branch.BranchAddress}</td>                                            
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" ><i className="far fa-eye"></i></button>
                                                <button type="button" className="btn btn-success mx-1" onClick={()=> LoadEditComponent(branch.BranchId)} ><i className="fas fa-edit"></i></button>
                                                <button type="button" className="btn btn-danger mx-1"  onClick={() => ShowAlert(branch.BranchId)}  ><i className="far fa-trash-alt" ></i></button>
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
