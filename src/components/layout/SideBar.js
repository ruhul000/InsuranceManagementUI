import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {

    
  return (
        
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <a className="nav-link" href="index.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-bars"></i></div>
                                Master
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link p-0 m-1" to="/Company" relative="path"> Company</Link>
                                <Link className="nav-link p-0 m-1" to="/CompanyBranch" relative="path"> Branch</Link>
                                <Link className="nav-link p-0 m-1" to="/client" relative="path"> Client</Link>
                                
                                <Link className="nav-link p-0 m-1" to="/Bank" relative="path"> Bank</Link>                                    
                                <Link className="nav-link p-0 m-1" to="/BankBranch" relative="path"> Bank Branch</Link>
                                <Link className="nav-link p-0 m-1" to="/InsuranceCompany" relative="path"> Insurance Company</Link>
                                    
                                    
                                </nav>
                            </div>  

                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseAccounts" aria-expanded="false" aria-controls="collapseAccounts">
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-dollar-sign"></i></div>
                                Accounts
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseAccounts" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link p-0 m-1" to="/Accounts/MR" relative="path"> Money Receipt</Link>
                                <Link className="nav-link p-0 m-1" to="/Accounts/BankDeposit" relative="path"> Bank Deposit</Link>
                                    
                                </nav>
                            </div>  
                                                      
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseMarine" aria-expanded="false" aria-controls="collapseMarine">
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-ship"></i></div>
                                Marine
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseMarine" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">   
                                    <Link className="nav-link p-0 m-1" to="/MarineCargo/Covernote" relative="path"> Cargo Cover Note</Link>      
                                    <Link className="nav-link p-0 m-1" to="/MarineCargo/Amendment" relative="path"> Cargo Amendment</Link>      
                                    <Link className="nav-link p-0 m-1" to="/MarineCargo/Policy" relative="path"> Cargo Policy</Link>      
                                </nav>
                                
                            </div>    
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseMotor" aria-expanded="false" aria-controls="collapseMotor">
                                <div className="sb-nav-link-icon"><i className="fa fa-car" aria-hidden="true"></i></div>
                                Motor
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseMotor" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">   
                                    <Link className="nav-link p-0 m-1" to="/motor/certificate" relative="path"> Motor Certificate</Link>     
                                    
                                </nav>
                                
                            </div>                          
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Pages
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapsePages" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/Login" relative="path"> Login</Link>                                            
                                            <a className="nav-link" href="register.html">Register</a>
                                            <a className="nav-link" href="password.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="401.html">401 Page</a>
                                            <a className="nav-link" href="404.html">404 Page</a>
                                            <a className="nav-link" href="500.html">500 Page</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                            <div className="sb-sidenav-menu-heading">Addons</div>
                            <a className="nav-link" href="charts.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Charts
                            </a>
                            <a className="nav-link" href="tables.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tables
                            </a>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div>
        
  )
}
