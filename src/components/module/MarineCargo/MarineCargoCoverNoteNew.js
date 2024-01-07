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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



{/*https://react-select.com/home */}




export default function MarineCargoCoverNoteNew() {

    const [searchObj, setSearchObj] = useState(
      {
        Class_Name: 'Marine Cargo',
        Sub_Class_Name: 'Cover Note',
        BranchKey: 21,
        DocCode: 0,
        YearName: 0,

      });

    const handleSearch = (e)=>{
      var keynum = e.keyCode||e.which;
      if(keynum == 13) {
        
        axios.post(`${Constants.BASE_URL}/FinalMR/GetFinalMRByCodeBranchYear`,searchObj,auth)
      .then(res=> {                     
                        
            if(res.data != null )
            {              
              setInput( res.data);
              setInput( prevState=>({...prevState,'Action': 2}))
              
              //set client
              axios.get(`${Constants.BASE_URL}/client/` + res.data.ClientKey,auth)
              .then(cl=> {
                setSelectedClient({                
                  label:cl.data.ClientName,
                  value:cl.data.ClientKey,
                  address: cl.data.ClientAddress,
                });

                setclientaddress(cl.data.ClientAddress);
                console.log(clientaddress);

              })

              
              //set bank and branch value
              axios.get(`${Constants.BASE_URL}/BankBranch/` + res.data.BankKey,auth)
              .then(br=> {
                setInput( prevState=>({...prevState,"BankId": br.data.BankId}));
                
                loadBankBranches(br.data.BankId);
                setInput( prevState=>({...prevState,"BankBranchId": br.data.BranchId}));  

              })
              
              //set producer value
              for(var i=0; i< producerNames.length; i++)
              {
                if(producerNames[i].value === res.data.EmpKey)
                {
                  setSelectedProducer(producerNames[i]);
                  console.log(producerNames[i]);
                }
              }

              

              //set agent value
              for(var i=0; i< agentNames.length; i++)
              {
                if(agentNames[i].value === res.data.AgentKey)
                {
                  setSelectedAgent(agentNames[i]);
                }
              }
              
              
            }
            
          }
          
        ) 
        .catch(function(error){}
      ) 

      }
    }

    const [input,setInput] = useState(
      {
        Action:1,
        FinalMRKey: 0,
        FinalMRKeyREF: 0,
        BranchKey:21,
        Class_Name: 'Marine Cargo',
        Sub_Class_Name: 'Cover Note',
        YearName: new Date().getFullYear(),
        MRType : '',
        MRType_2: '',
        MRType_3 : '',
        MRType_4: '',
        MRCode: 0,
        MRCode_Dis: '',
        MRDate: null,
        DocCode: 0,
        DocNo: '',
        DocDate: new Date().toISOString().substring(0, 10),        
        CoverNoteNo: '',
        CNDate: null,
        PolicyNo: '',
        PODate: null,
        CoIns: false,
        ComKeyCoIns : 0,
        LeaderDocNo: '',
        CoInsPer : 0,
        We_Leader: false,
        SumInsured: 0,
        SumInsuredCoIns:0,
        MRNetPremium: 0,
        NetPremium:0,
        VatPer: 15,
        VatAmount: 0,
        StampDuty:50,
        OthersAmount:0,
        Ref_SumInsured:0,
        Ref_SumInsuredCoIns :0,
        Ref_NetPremium:0,
        Ref_VatAmount :0,
        Ref_StampDuty:0,
        Ref_ChargeAmount:0,
        Ref_DocNo:'',
        Ref_CoInsSumInsured :0,
        Ref_CoInsNetPremium:0,
        Active: true,
        DepositDate: null,
        Depo_NetPremium:0,
        Depo_NetPremium_CoIns :0,
        Depo_VatAmount: 0,
        Depo_StampDuty: 0,
        MR_Allowable: 0,
        Business: 0,
        ClientKey: 0,
        BankKey:0,
        ClientKey_Old: 0,
        BankKey_Old: 0,
        EmpKey: 0,
        AgentKey: 0,
        PeriodFrom:new Date().toISOString().substring(0, 10),
        PeriodTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().substring(0, 10),        
        
        
        Bank_Guarantee:0,        
        Coll_Our_Share: '',
        NewClient: 0,
        WithChargeAmount: 0,
        DocCancel: false,
        DocCancelDate: null,
        NotUtilized: false,
        DocEdit: false,
        ReinsuranceAmount: 0,
        ClaimAmount: 0,
        VoucherKey: 0,
        HO: false,
        Pay_Status: false,
        BoughKey: 0,
        TargetKey: 0,
        Remarks: '',
        PaymentType:'',
        CurrencyName: '',
        FCurrText: '',
        AmountInWord: '',
        BankName:'',
        BranchName:'',
        ChequeNo: '',
        ChequeDate: null,
        ChargeAmount: 0,

        Text_Field_1:'Any port of ',
        Text_Field_2:'Factory site at ',
        Text_Field_3:'',
        Text_Field_4:'',
        Text_Field_5:'',
        Text_Field_6:'',
        Text_Field_7:'',
        Text_Field_8:'',
        Text_Field_9:'',
        Text_Field_10:'',
        Text_Field_11:'',
        Text_Field_12:'',
        Text_Field_13:'',
        Text_Field_14:'',
        Text_Field_15:'',
        Num_Field_1: 0,
        Num_Field_2:0,
        Num_Field_3:0,
        Num_Field_4: 0,
        Num_Field_5: 0,
        Num_Field_6: 0,
        Num_Field_7: 0,
        Num_Field_8: 0,
        Num_Field_9: 0.05,
        Num_Field_10: 0,
        Num_Field_11: 0,
        Num_Field_12: 0,
        Num_Field_13: 0,
        Num_Field_14: 0,
        Num_Field_15: 0,

        LockData: true,



      }
    );
        
    
    const handleInput=(e)=>{
      console.log(e);

      if(e.target.type === 'checkbox')
        {
          setInput( prevState=>({...prevState,[e.target.name]: e.target.checked}))
        }
        else
        {
            setInput( prevState=>({...prevState,[e.target.name]: e.target.value}))
        }
        
    }

    const handleSearchInput=(e)=>{      
      
      setSearchObj( prevState=>({...prevState,[e.target.name]: e.target.value}))       
        
    }

    const handleAgent = (e)=>{
      setInput( prevState=>({...prevState,'AgentKey': e.value}));
      setSelectedAgent({
        "value": e.value,
        "label": e.label,
      })
    }

    const handleEmployee = (e)=>{      
      setInput( prevState=>({...prevState,'EmpKey': e.value}));
      setSelectedProducer({
        "value": e.value,
        "label": e.label,
      })
    }

    const handleCurrencyChange=(e)=>{
      
      var curRate = 0;
      var CurName = '';
      for(var i=0;i<currencies.length; i++)
      {
        

        if(currencies[i].CurrencyKey == e.target.value)
        { 
          CurName = currencies[i].CurrencyName;
          curRate = currencies[i].BankRate;
          

          //setInput( prevState=>({...prevState,'CurrencyName': 'US$'}));
          console.log(e.target);
        }
        
      }
      
      setInput( prevState=>({...prevState,'CurrencyName': CurName}));
      setInput( prevState=>({...prevState,'Num_Field_4': curRate}));
      calculateTotalAmount();
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
    const [employees, setEmployees] = useState([]);
    const [clientNames, setClientNames] = useState([]);
    const [producerNames, setProducerNames] = useState([]);
    const [agentNames, setAgentNames] = useState([]);
    const [clientaddress, setclientaddress] = useState('');
    const [companies,setCompanies] = useState([]);
    const [branchNames,setBranchNames] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    
    const [startDate, setStartDate] = useState(new Date());

    //for react select async
    const [inputValue, setValue] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedProducer, setSelectedProducer] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedBankBranch, setSelectedBankBranch] = useState(null);
    


    //tariff 
    const [cargoTariff, setCargoTariff] = useState({
      "TariffKey": 0,
      "Tariff_Catagory": "",
      "TypeOfRisk": "General",
      "ItemName": "",
      "TypeA": "",
      "TypeB": "",
      "TypeC": "",
      "Per": 0
    });
    const [tariffCategory, setTariffCategory] = useState([]);
    const [tariffType,setTariffType] = useState([{
      "TypeOfRisk":"General"
    },
    {
      "TypeOfRisk":"Special"
    }]);
    const [itemName, setItemName] = useState([]);
    const [typeA, setTypeA] = useState([]);
    const [typeB, setTypeB] = useState([]);
    const [typeC, setTypeC] = useState([]);


    const loadTariffCategory=()=>{
      
      axios.get(`${Constants.BASE_URL}/MarineCargoTariff/Category`,auth)
      .then(res=> {
          setTariffCategory(res.data);
          //console.log(tariffCategory);
          }
        )
        .catch(function(error){}
        )  


    }

    const handleTariffSelect=(e)=>{
      setCargoTariff( prevState=>({...prevState,[e.target.name]: e.target.value}));
      if(e.target.name == 'Tariff_Catagory' || e.target.name == 'TypeOfRisk')
      {
        setCargoTariff( prevState=>({...prevState,'ItemName': '','TypeA': '','TypeB': '','TypeC': '','Per':0}));

      }
      else if(e.target.name == 'ItemName')
      {
        setCargoTariff( prevState=>({...prevState,'TypeA': '','TypeB': '','TypeC': ''})); 
      }
      else if(e.target.name == 'TypeA')
      {
        setCargoTariff( prevState=>({...prevState,'TypeB': '','TypeC': ''}));
      }
      else if(e.target.name == 'TypeB')
      {
        setCargoTariff( prevState=>({...prevState,'TypeC': ''}));         
      }
      
    }

    const handlePercentChange=()=>{
      setInput(prevState=>({...prevState,'Num_Field_7':cargoTariff.Per}))
    }

    const loadItemNames=()=>{
      
      axios.post(`${Constants.BASE_URL}/MarineCargoTariff/ItemNames`,cargoTariff,auth)
      .then(res=> {
          setItemName(res.data);
          setTypeA([]);
          setTypeB([]);
          setTypeC([]);          
          
          }
          
        ) 
        .catch(function(error){}
      )         

    }

    const loadTypeA=()=>{
      
      axios.post(`${Constants.BASE_URL}/MarineCargoTariff/TypeA`,cargoTariff,auth)
      .then(res=> {
            setTypeA(res.data);
            setTypeB([]);
            setTypeC([]);
            
            if(res.data[0].Per>0)
            {              
              setInput( prevState=>({...prevState,'Num_Field_7': res.data[0].Per}));
            }
            else
            {
              setInput( prevState=>({...prevState,'Num_Field_7': 0}));
            }
          }
          
        ) 
        .catch(function(error){}
      )         

    }

    const loadTypeB=()=>{
      
      axios.post(`${Constants.BASE_URL}/MarineCargoTariff/TypeB`,cargoTariff,auth)
      .then(res=> {
            setTypeB(res.data);            
            setTypeC([]);
            
            if(res.data[0].Per>0)
            {              
              setInput( prevState=>({...prevState,'Num_Field_7': res.data[0].Per}));
            }
            else
            {
              setInput( prevState=>({...prevState,'Num_Field_7': 0}));
            }
          }
          
        ) 
        .catch(function(error){}
      )         

    }

    const loadTypeC=()=>{
      
      axios.post(`${Constants.BASE_URL}/MarineCargoTariff/TypeC`,cargoTariff,auth)
      .then(res=> {
            setTypeC(res.data);            
                        
            if(res.data[0].Per>0)
            {              
              setInput( prevState=>({...prevState,'Num_Field_7': res.data[0].Per}));
            }
            else
            {
              setInput( prevState=>({...prevState,'Num_Field_7': 0}));
            }
          }
          
        ) 
        .catch(function(error){}
      )         

    }

    const loadRate=()=>{
      
      axios.post(`${Constants.BASE_URL}/MarineCargoTariff/Rate`,cargoTariff,auth)
      .then(res=> {                     
                        
            if(res.data[0].Per>0)
            {              
              setInput( prevState=>({...prevState,'Num_Field_7': res.data[0].Per}));
            }
            else
            {
              setInput( prevState=>({...prevState,'Num_Field_7': 0}));
            }
          }
          
        ) 
        .catch(function(error){}
      )         

    }

    useEffect(() => {
      //console.log(cargoTariff);
      if(cargoTariff.ItemName == "")
      {
        loadItemNames();
      }
      else if(cargoTariff.TypeA == ""  )
      {
        loadTypeA();
      }
      else if(cargoTariff.TypeB == ""  )
      {
        loadTypeB();
      }
      else if(cargoTariff.TypeC == ""  )
      {
        loadTypeC();
      }
      else
      {
        loadRate();
      }
  }, [cargoTariff]);

   useEffect(() => {
    calculatePremium();
    
}, [input.MarinePer]); 

    // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };
 
  // handle selection
  const handleChange = e => {
    setInput( prevState=>({...prevState,"ClientKey": e.value}))
    setSelectedClient(e);
    setclientaddress(e.address);
    console.log(e);
    
    
  }

  const notify = () => toast("Wow so easy!");

  const showToast=(msg)=>{    

    toast.error(msg, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: false,
    });

  }

  const validateData = ()=>{
    var isValidate = true;
    toast.dismiss();
    if(input.ClientKey === 0)
    {
      showToast("Select Client.");
      isValidate = false;
    }
    else if(input.BankKey === 0)
    {
      showToast("Select Bank and Branch.");

      isValidate = false;
    }
    else if(input.Num_Field_1 === 0)
    {
      showToast("Input Foreign Currency.");
      isValidate = false;
    }
    else if(input.CurrencyName === 'Select' || input.CurrencyName === '' )
    {
      showToast("Select a Currency.");
      isValidate = false;
    }
    else if(input.Num_Field_4 === 0)
    {
      showToast("Currency rate is not given");
      isValidate = false;
    }
    else if(input.Text_Field_5 ==='')
    {
      showToast("Interest covered is empty.");
      isValidate = false;

    }
    else if(input.Text_Field_6 === '')
    {
      showToast("Risks is empty.");
      isValidate = false;
    }
    else if(input.Num_Field_7 === 0 || input.Num_Field_7 === '')
    {
      showToast("Select a tariff.");
      isValidate = false;
    }
    else if(input.CoIns === true && input.CoInsPer === 0)
    {
      showToast("Insert Co-Insurance percentage.");
      isValidate = false;
    }
    else if(input.CoIns === true & input.We_Leader === false && input.ComKeyCoIns ===0)
    {
      showToast("Select leader");
      isValidate = false;
    }
    else if(input.CoIns === true & input.We_Leader === false && input.LeaderDocNo === '')
    {
      showToast("Input Leader document No");
      isValidate = false;
    }
    else if(input.Action === 2 && input.LockData === true)
    {
      showToast('Document is locked.');
      isValidate = false;
    }
    
    return isValidate;
  }


  const SaveData = (e) =>
  { 
    var returnData = validateData();
    console.log(input);
    if(returnData === true)
    {
      if(input.Action===1)
      {
        axios.post(`${Constants.BASE_URL}/FinalMR/Create`,input,auth).then(res=>{
      
          if(res.status === 200)
          {          
            setInput(res.data);
            setInput( prevState=>({...prevState,'Action': 2}));
            Swal.fire(
              'Good job!',
              'Data is saved.',
              'success'
            )
            
            console.log(res.data);
            
          }
            
        })
        .catch(function(error){
          Swal.fire(
            error.response.data,
            error.message,
            'error'
          )

          //console.log(input);
          //console.log(error);
        }
        )    

      }
      else if(input.Action===2)
      {              
        axios.put(`${Constants.BASE_URL}/FinalMR/Update`,input,auth).then(res=>{
      
          if(res.status === 200)
          {          
            setInput(res.data);
            setInput( prevState=>({...prevState,'Action': 2}));
            Swal.fire(
              'Data Updated!',
              'Data is Updated.',
              'success'
            )
            
          }
            
        })
        .catch(function(error){
          Swal.fire(
            error.response.data,
            error.message,
            'error'
          )

          //console.log(input);
          //console.log(error);
        }
        )    

      }
    }
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
                      "label" : d.ClientName,
                      "address": d.ClientAddress
                    }))
                    setClientNames(options)                    

                }
            )
            .catch(function(error) {    
                
                 /*  Swal.fire(
                    'Opps! Something wrong',
                    error.message,
                    'error'
                  ) */
                
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

    const  loadEmployees=()=>{
      axios.get(`${Constants.BASE_URL}/Employee/Employees`,auth)
            .then(res=>{
                  setEmployees(res.data);  
                  //producer names for react-select.
                  const options = res.data.map(d => ({
                    "value" : d.EmpKey,
                    "label" : d.EmpName + ' ' + d.EmpSurName
                  }))
                  setProducerNames(options);

                }
            )
            .catch(function(error) {
                
                });
    }

    const  loadBankBranches=(e)=>{

      var BankId = 0;
      if(typeof(e) === 'number')
      {
        BankId = e;
      }
      else
      {
        BankId = e.target.value;
      }
      
      
      axios.get(`${Constants.BASE_URL}/BankBranch/BankBranches/${BankId}`,auth)
            .then(res=>{
                  setBankBranches(res.data);  
                  console.log(res.data);
                  /*make list for react-select */
                  const options = res.data.map(d => ({
                    "value" : d.BranchName,
                    "label" : d.BranchName,
                    "address": d.BranchAddress,
                    "BankId": d.BankId,
                    "BankName": d.BankName,
                  }))

                  setBranchNames(options);
                  

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

    const  loadAgents=()=>{
      axios.get(`${Constants.BASE_URL}/Agent/Agents`,auth)
            .then(res=>{

                    //Agents names for react-select.
                    const options = res.data.map(d => ({
                      "value" : d.AgentKey,
                      "label" : d.AgentName 
                    }))
              
                    setAgentNames(options);    
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

    const loadBranchAddress =(e)=>{
      
      axios.get(`${Constants.BASE_URL}/BankBranch/${e.target.value}`,auth)
            .then(res=>{ 
              
              setInput( prevState=>({...prevState,'BankKey': e.target.value}))
                
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

  const  loadCurrencies=()=>{
    axios.get(`${Constants.BASE_URL}/Currency/Currencies`,auth)
          .then(res=>{
                  setCurrencies(res.data);    
              }
          )
          .catch(function(error) {
                
              
              });
  }

  

    useEffect(()=>{            
            
          loadClients();
          loadBanks();
          loadCompanies();     
          loadEmployees(); 
          loadAgents();
          loadCurrencies();
          loadTariffCategory();
            

    },[] )

    
    const [covisible, setCovisible] = useState(false);
    const toggleCoInsurance=(e)=>{
      setCovisible(e.target.checked);   

      setInput( prevState=>({...prevState,'CoIns': e.target.checked}));

    }

    const [exportVisible, setexportVisible] = useState(false);
    const toggleExport=(e)=>{
      setexportVisible(e.target.checked);            

    }

    const handleDate=(e)=>
    {
      console.log(e.target.value);
    }
    
    const calculateTotalAmount=()=>{
      
      var Tamount = 0;
      Tamount = ((input.Num_Field_1 * input.Num_Field_4) + (input.Num_Field_1 * input.Num_Field_4)*input.Num_Field_2/100) + ((input.Num_Field_1 * input.Num_Field_4) + (input.Num_Field_1 * input.Num_Field_4)*input.Num_Field_2/100)*input.Num_Field_3/100; 
      Tamount = Math.round(Tamount);

      setInput( prevState=>({...prevState, 'SumInsured': Tamount})); 

      calculatePremium();

    }

    const calculatePremium=()=>
    {
      var tmpMarine = input.SumInsured * input.Num_Field_7 /100 ; // Num_Field_7 = MarineRate
      tmpMarine = tmpMarine - tmpMarine* input.Num_Field_5/100; //Num_Field_5 = discount
      tmpMarine = tmpMarine - tmpMarine * input.Num_Field_6/100; // Num_Field_6 = S.D (special discount)
      tmpMarine = Math.round(tmpMarine);

      setInput( prevState=>({...prevState, 'Num_Field_8': tmpMarine})); //Num_Field_8 = Marine Amount
      
      var tmpWar = input.SumInsured * input.Num_Field_9 /100; // Num_Field_9 = War Percent
      tmpWar = tmpWar - tmpWar * input.Num_Field_5/100;
      tmpWar = tmpWar - tmpWar * input.Num_Field_6/100;
      tmpWar = Math.round(tmpWar);
      setInput( prevState=>({...prevState, 'Num_Field_10': tmpWar})); // Num_Field_10 = War Amount

      var NetPremium =  tmpMarine + tmpWar;
      setInput( prevState=>({...prevState, 'NetPremium': NetPremium})); 

      var vat = Math.round( NetPremium * input.VatPer / 100); // 
      setInput( prevState=>({...prevState, 'VatAmount': vat}));
      
      var grandTotal = Math.round( tmpWar + tmpMarine + vat + Math.round(input.StampDuty));
      setInput( prevState=>({...prevState, 'MRNetPremium': grandTotal})); //MRNetPremium = Grand Total

      
    }

    
   

  return (
    <>
        <div className='container'>
        <h1 className="mt-4">Marine Cargo</h1>
        
        <div className="card col-md-12">
        <div className="card-header bg-info">New Cover Note</div>
          
          

          <div className="card-body">
            <div className='row border p-2' style={{backgroundColor:'LightGray'}} >

              <div className="col-md-2 my-1">Search CN No</div>
              <div className="col-md-2 ">
                <input type="number" className="form-control" id='DocCode' autoComplete="off"
                      name='DocCode'  
                      value={searchObj.DocCode}
                      onChange={handleSearchInput}
                      placeholder='CN No' />
              </div>
            <div className="col-md-2 my-1">Search Year</div>
            
            <div className="col-md-2 my-1">
              <input type="number" className="form-control" id='YearName' autoComplete="off"
                    name='YearName'  
                    value={searchObj.YearName}
                    onChange={handleSearchInput}
                    onKeyUp={handleSearch}
                    placeholder='Year' />
            </div>
          </div>
          <div className='row gx-2'>
            <div className="col-md-7 py-2" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}} >
            <div className="row "> 

            <div className='col-md-3 my-2'>Cover Note No</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id="DocNo" autoComplete="off" 
                name="DocNo"
                value={input.DocNo}
                onChange={handleInput}                
                placeholder="Cover Note No" />
            </div>

            <div className='col-md-3 my-2'>Client</div>
            <div className='col-md-9 my-1'>
                            
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  value={selectedClient}
                  
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
              value={input.BankBranchId}
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
                
                readOnly
                placeholder='Address' />
            </div>

            <div className='col-md-3 my-2'>Voyage From</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id='Text_Field_1' autoComplete="off" 
                name='Text_Field_1'                
                value={input.Text_Field_1}
                
                onChange={handleInput}                
                placeholder=''  />
            </div>

            <div className='col-md-3 my-2'>Voyage To</div>
            <div className='col-md-9 my-1'>
                <input type="text" className="form-control" id='Text_Field_2' autoComplete="off" 
                name='Text_Field_2'                
                value={input.Text_Field_2}
                onChange={handleInput}                
                placeholder=''  />
            </div>

            <div className='col-md-3 my-2'>Via</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group"
                name='Text_Field_3'
                value={input.Text_Field_3}
                onChange={handleInput}
                >
                <option key={'Select'}>Select</option> 
                <option key={'Chattogram'} value={'Chattogram'}>Chattogram</option> 
                <option key={'Chattogram Port'} value={'Chattogram Port'}>Chattogram Port</option> 
                <option key={'Chattogram Port/Dhaka Airport'} value={'Chattogram Port/Dhaka Airport'}>Chattogram Port/Dhaka Airport</option> 
                <option key={'Chattogram Seaport'} value={'Chattogram Seaport'}>Chattogram Seaport</option> 
                <option key={'Chattogram Seaport/Benapole'} value={'Chattogram Seaport/Benapole'}>Chattogram Seaport/Benapole</option> 
                <option key={'Chattogram/Shahjalal Int. Airport'} value={'Chattogram/Shahjalal Int. Airport'}>Chattogram/Shahjalal Int. Airport</option> 
                <option key={'Benapole'} value={'Benapole'}>Benapole</option> 
                <option key={'Mongla'} value={'Mongla'}>Mongla</option> 
                <option key={'Shahjalal Int. Airport'} value={'Shahjalal Int. Airport'}>Shahjalal Int. Airport</option>  
                <option key={'Shahjalal International Airport'} value={'Shahjalal International Airport'}>Shahjalal International Airport</option> 
                <option key={'Hazrat Shahjalal Int. Airport'} value={'Hazrat Shahjalal Int. Airport'}>Hazrat Shahjalal Int. Airport</option>                     
                <option key={'Hazrat Shahjalal International Airport'} value={'Hazrat Shahjalal International Airport'}>Hazrat Shahjalal International Airport</option>                     
                
              </select>
            </div>

            <div className='col-md-3 my-2'>Transit By</div>
            <div className='col-md-9 my-1'>
              <select className="form-select" aria-label="Group"
                name='Text_Field_4'
                value={input.Text_Field_4}
                onChange={handleInput}
                >
                <option>Select</option> 
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
              <Form.Group controlId="FromDate">                    
                  <Form.Control type="date"  name="PeriodFrom"  id="PeriodFrom"
                    value={typeof(PeriodFrom) === 'undefined'? null: input.PeriodFrom}
                    onChange={handleInput}
                  />
              </Form.Group>
              
              
            </div>

            <div className='col-md-1 my-2'>To</div>
            <div className='col-md-4 my-1'>
            <Form.Group controlId="ToDate">                    
                <Form.Control type="date"  name="PeriodTo"  id="PeriodTo"
                  value={typeof(input.PeriodTo) ==='undefined'? null : input.PeriodTo}
                  onChange={handleInput}
                />
            </Form.Group>
            </div>

            <div className='col-md-3 my-2'>Foreign Currency</div>
            <div className='col-md-3 my-1'>
              <input type="Number" className="form-control" id='Num_Field_1' autoComplete="off"
              name='Num_Field_1'  
              value={input.Num_Field_1}
              onChange={handleInput}
              onBlur={calculateTotalAmount}
              placeholder='' />
            </div>
            <div className='col-md-1 my-3'>Ext%</div>
            <div className='col-md-1 my-1 '>
            <input className="form-check-input my-3" type="checkbox"  id='chkExtra' autoComplete="off" 
            name='chkExtra' 
            value={input.chkExtra}
            onChange={handleInput}
            onBlur={calculateTotalAmount}
            />
            </div>
            <div className='col-md-2 my-1'>
              <input type="Number" className="form-control" id='Num_Field_2' autoComplete="off"
              name='Num_Field_2'  
              value={input.Num_Field_2}
              onChange={handleInput}
              onBlur={calculateTotalAmount}
              placeholder='' />
            </div>
            <div className='col-md-2 my-1 mx-0'>
              <input type="Number" className="form-control" id='Num_Field_3' autoComplete="off"
              name='Num_Field_3'  
              value={input.Num_Field_3}
              onChange={handleInput}
              onBlur={calculateTotalAmount}
              placeholder='' />
            </div>

            <div className='col-md-3 my-2'>Currency Name</div>
            <div className='col-md-3 my-1'>
            <select className="form-select" aria-label="Group"
              name='CurrencyKey'
              value={input.CurrencyKey}
              onChange={handleCurrencyChange}
              onBlur={calculateTotalAmount}
              >
              <option key={0} value={0} >Select</option> 
                  {currencies.map((option) => (
                    <option key={option.CurrencyKey} value={option.CurrencyKey} rate={option.Rate}>{option.CurrencyName}</option>
                  ))}                
            </select>
            </div>

            <div className='col-md-2 my-2'>Rate</div>
            <div className='col-md-3 my-1'>
              <input type="Number" className="form-control" id='Num_Field_4' autoComplete="off"
              name='Num_Field_4'  
              value={input.Num_Field_4}
              onChange={handleInput}
              onBlur={calculateTotalAmount}
              placeholder='' />
            </div>

            <div className='col-md-3 my-2'>Total Amount</div>
            <div className='col-md-3 my-1'>
              <input type="text" className="form-control" id='SumInsured' autoComplete="off"
              name='SumInsured'  
              value={input.SumInsured}
              /* onChange={handleInput} */
              readOnly

              placeholder='' />
            </div>

            <div className='col-md-2 my-2'>MR No</div>
            <div className='col-md-3 my-1'>
              <input type="text" className="form-control" id='MoneyReceiptNo' autoComplete="off"
              name='MoneyReceiptNo'  
              value={input.MoneyReceiptNo}
              onChange={handleInput}
              placeholder='' />
            </div>

            <div className='col-md-3 my-2'>Interest covered</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='Text_Field_5' autoComplete="off"
                name='Text_Field_5'  
                value={input.Text_Field_5}
                onChange={handleInput}
                placeholder='Interest covered' />
            </div>
            <div className='col-md-3 my-2'>Risks</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='Text_Field_6' autoComplete="off"
                name='Text_Field_6'  
                value={input.Text_Field_6}
                onChange={handleInput}
                placeholder='Risks' />
            </div>
            <div className='col-md-3 my-2'>Remarks</div>
            <div className='col-md-9 my-1'>
                <textarea   className="form-control" id='Remarks' autoComplete="off"
                name='Remarks'  
                value={input.Remarks}
                onChange={handleInput}
                placeholder='Remarks' />
            </div>
            <div className='col-md-3 my-2'>Producer Name</div>
            <div className='col-md-9 my-1'>
              <Select options={producerNames}
              id='EmpKey'
              name='EmpKey'
              onChange={handleEmployee}
              value={selectedProducer}
              
              isMulti={false}

              
              />
              
            </div>

            <div className='col-md-3 my-2'>Agent Name</div>
            <div className='col-md-9 my-1'>
              <Select options={agentNames}
              id='AgentKey'
              name='AgentKey'
              onChange={handleAgent}
              value={selectedAgent}
              isMulti={false}
              />
            </div>

            </div>
            </div> 
            
            
            <div className="col-md-4 mx-3" style={{border: "solid 1px", borderRadius:"5px", borderColor:"silver"}}>
              <div className="row">
                <div className='col-md-4 my-3'>Date</div>
                <div className='col-md-8 my-1'>
                  <Form.Group controlId="DocDate">                    
                      <Form.Control type="date" name="DocDate" placeholder="Date" 
                        value={typeof(input.DocDate) === 'undefined'? null : input.DocDate}
                        onChange={handleInput}
                      />
                  </Form.Group>
                </div>

                {/* <!-- Button trigger modal --> */}
                <div className='col-md-12 my-3'>
                  <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop" > Select Rate </button>
                </div>                

                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Select Tariff</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div >
                          <select className="form-select" aria-label="Group" id='Tariff_Catagory'
                          name='Tariff_Catagory'
                          value = {tariffCategory.Tariff_Catagory}
                          onChange={handleTariffSelect}
                          >
                          <option key={0} value={0} >Select</option> 
                            {tariffCategory.map((option) => (
                              <option key={option.Tariff_Catagory} value={option.Tariff_Catagory}>{option.Tariff_Catagory}</option>
                            ))}

                          </select>
                        </div>
                        <div >
                          <select className="form-select" aria-label="Group" id='TypeOfRisk'
                          name='TypeOfRisk'
                          value = {tariffType.TypeOfRisk}
                          onChange={handleTariffSelect}
                          >
                          
                            {tariffType.map((option) => (
                              <option key={option.TypeOfRisk} value={option.TypeOfRisk}>{option.TypeOfRisk}</option>
                            ))}

                          </select>
                        </div>
                        <div >
                          <select className="form-select" aria-label="Group" id='ItemName'
                          name='ItemName'
                          value = {itemName.ItemName}
                          onChange={handleTariffSelect}
                          >
                          <option key={0} value={''} >Select</option> 
                            {itemName.map((option) => (
                              <option key={option.ItemName} value={option.ItemName}>{option.ItemName}</option>
                            ))}

                          </select>
                        </div>
                        <div >
                          <select className="form-select" aria-label="Group" id='TypeA'
                          name='TypeA'
                          value = {itemName.TypeA}
                          onChange={handleTariffSelect}
                          >
                          <option key={0} value={''} >Select</option> 
                            {typeA.map((option) => (
                              <option key={option.TypeA} value={option.TypeA}>{option.TypeA}</option>
                            ))}

                          </select>
                        </div>

                        <div >
                          <select className="form-select" aria-label="Group" id='TypeB'
                          name='TypeB'
                          value = {itemName.TypeB}
                          onChange={handleTariffSelect}
                          >
                          <option key={0} value={''} >Select</option> 
                            {typeB.map((option) => (
                              <option key={option.TypeB} value={option.TypeB}>{option.TypeB}</option>
                            ))}

                          </select>
                        </div>

                        <div >
                          <select className="form-select" aria-label="Group" id='TypeC'
                          name='TypeC'
                          value = {itemName.TypeC}
                          onChange={handleTariffSelect}
                          >
                          <option key={0} value={''} >Select</option> 
                            {typeC.map((option) => (
                              <option key={option.TypeC} value={option.TypeC}>{option.TypeC}</option>
                            ))}

                          </select>
                        </div>

                        <div className='col-md-3 '>
                        <input type="number" className="form-control" id='Per' autoComplete="off"
                            name='Per' 
                            value={input.Num_Field_7}
                            //onChange={calculatePremium}
                            readOnly
                            placeholder='' />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={calculatePremium}  >OK</button>
                      </div>
                    </div>
                  </div>
                </div>


                <div className='col-md-4 my-2'>Discount</div>
                <div className='col-md-3 '>
                <input type="number" className="form-control" id='Num_Field_5' autoComplete="off"
                    name='Num_Field_5' 
                    value={input.Num_Field_5}
                    onChange={handleInput}
                    onBlur={calculatePremium}
                    placeholder='' />
                </div>

                <div className='col-md-2 my-2'>S.D.</div>
                <div className='col-md-3  '>
                  <input type="number" className="form-control" id='Num_Field_6' autoComplete="off"
                      name='Num_Field_6' 
                      value={input.Num_Field_6}
                      onChange={handleInput}
                      onBlur={calculatePremium}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-0'>Text with Rate</div>
                <div className='col-md-8 my-1 '>
                  <input type="text" className="form-control" id='Text_Field_7' autoComplete="off"
                      name='Text_Field_7' 
                      value={input.Text_Field_7}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Marine @</div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_7' autoComplete="off"
                      name='Num_Field_7' 
                      value={input.Num_Field_7}
                      onChange={handleInput}
                      onBlur={calculatePremium}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_8' autoComplete="off"
                      name='Num_Field_8' 
                      value={input.Num_Field_8}
                      onChange={handleInput}
                      onBlur={calculatePremium}
                      readOnly
                      placeholder='' />
                </div>
                <div className='col-md-4 my-0'>War & SRCC</div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_9' autoComplete="off"
                      name='Num_Field_9' 
                      value={input.Num_Field_9}
                      onChange={handleInput}
                      onBlur={calculatePremium}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_10' autoComplete="off"
                      name='Num_Field_10' 
                      value={input.Num_Field_10}
                      onChange={handleInput}
                      readOnly
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Net Premium</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='NetPremium' autoComplete="off"
                      name='NetPremium' 
                      value={input.NetPremium}
                      onChange={handleInput}
                      readOnly
                      placeholder='' />
                </div>

                <div className='col-md-4 my-3'>VAT</div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='VatPer' autoComplete="off"
                      name='VatPer' 
                      value={input.VatPer}
                      onChange={handleInput}
                      onBlur={calculatePremium}
                      placeholder='' />
                </div>
                <div className='col-md-4 my-1 '>
                  <input type="number" className="form-control" id='VatAmount' autoComplete="off"
                      name='VatAmount' 
                      value={input.VatAmount}
                      onChange={handleInput}
                      readOnly
                      placeholder='' />
                </div>

                <div className='col-md-4 my-3'>Stamp Duty</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='StampDuty' autoComplete="off"
                      name='StampDuty' 
                      value={input.StampDuty}
                      onChange={handleInput}
                      onBlur={calculatePremium}
                      placeholder='' />
                </div>

                <div className='col-md-4 my-2'>Grand Total</div>
                <div className='col-md-8 my-1 '>
                  <input type="number" className="form-control" id='MRNetPremium' autoComplete="off"
                      name='MRNetPremium' 
                      value={input.MRNetPremium}
                      onChange={handleInput}
                      readOnly
                      placeholder='' />
                </div>
                <div className='col-md-12'>
                  <hr/>
                </div>

                <div className='col-md-4 my-2'>Co-Insurance</div>
                <div className='col-md-2 my-1 '>
                  <input type="checkbox" className="form-check-input my-2" id='CoIns' autoComplete="off"
                      name='CoIns' 
                      value={input.CoIns}
                      onChange={toggleCoInsurance} />
                </div>
                
                {
                  covisible &&  <>
                    <div className='col-md-2 my-2'>Per</div>
                    <div className='col-md-4 my-1 '>
                      <input type="number" className="form-control" id='CoInsPer' autoComplete="off"
                          name='CoInsPer' 
                          value={input.CoInsPer}
                          onChange={handleInput}
                          placeholder='' />
                    </div>

                    <div className='col-md-4 my-2'>We are Leader</div>
                    <div className='col-md-8 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='We_Leader' autoComplete="off"
                          name='We_Leader' 
                          value={input.We_Leader}
                          onChange={handleInput} />
                    </div>

                    <div className='col-md-4 my-2'>Leader Name</div>
                    <div className='col-md-8 my-1 '>
                      <select className="form-select" aria-label="Group" id='ComKeyCoIns'
                      name='ComKeyCoIns'
                      value = {input.ComKeyCoIns}
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
                      <input type="text" className="form-control" id='LeaderDocNo' autoComplete="off"
                          name='LeaderDocNo' 
                          value={input.LeaderDocNo}
                          onChange={handleInput}
                          placeholder='' />
                    </div>
                    
                  </>
                }

                <div><hr/></div>
                <div className='col-md-2 my-2'>Export</div>
                <div className='col-md-1 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isExport' autoComplete="off"
                          name='isExport' 
                          value={input.isExport}
                          onChange={toggleExport} />
                    </div>
                <div className='col-md-2 my-2'>Open</div>
                <div className='col-md-1 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isOpen' autoComplete="off"
                          name='isOpen' 
                          value={input.isOpen}
                          onChange={handleInput} />
                    </div>
                <div className='col-md-3 my-2'>As Open</div>
                <div className='col-md-1 my-1 '>
                      <input type="checkbox" className="form-check-input my-2" id='isAsOpen' autoComplete="off"
                          name='isAsOpen' 
                          value={input.isAsOpen}
                          onChange={handleInput} />
                    </div>

                { exportVisible && <>
                <div className='col-md-7 my-2'>Single Carry Limit By Ship</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_11' autoComplete="off"
                      name='Num_Field_11' 
                      value={input.Num_Field_11}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Single Carry Limit By Air</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_12' autoComplete="off"
                      name='Num_Field_12' 
                      value={input.Num_Field_12}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Single Carry Limit By Lorry</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_13' autoComplete="off"
                      name='Num_Field_13' 
                      value={input.Num_Field_13}
                      onChange={handleInput}
                      placeholder='' />
                </div>

                <div className='col-md-7 my-2'>Single Carry Limit By Train</div>
                <div className='col-md-5 my-1 '>
                  <input type="number" className="form-control" id='Num_Field_14' autoComplete="off"
                      name='Num_Field_14' 
                      value={input.Num_Field_14}
                      onChange={handleInput}
                      placeholder='' />
                </div>
                </>
              }
                <div><hr/></div>
                
                <div className='col-md-3 my-1'>Gurantee</div>
                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='BG_Bank_Guarantee' autoComplete="off" 
                      name='Bank_Guarantee' 
                      value={1}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="BG_Bank_Guarantee">&nbsp; B.G </label>
                  
                </div>

                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='DP_Bank_Guarantee' autoComplete="off" 
                      name='Bank_Guarantee' 
                      value={2}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="DP_Bank_Guarantee">&nbsp; DP </label>
                </div>

                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='NO_Bank_Guarantee' autoComplete="off" 
                      name='Bank_Guarantee' 
                      value={3}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="NO_Bank_Guarantee">NO</label>
                </div>
              
              
                
                <div className='col-md-3 my-1'>Signature</div>
                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='Signature1' autoComplete="off" 
                      name='Signature' 
                      value={input.Signature}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="Signature1">&nbsp; 1st </label>
                  
                </div>

                <div className='col-md-3 my-1 '>                  
                  <input className="form-check-input" type="radio" id='Signature2' autoComplete="off" 
                      name='Signature' 
                      value={input.Signature}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="Signature2">&nbsp; 2nd </label>
                </div>

                <div className='col-md-2 my-1 '>                  
                  <input className="form-check-input" type="radio" id='Signature3' autoComplete="off" 
                      name='Signature' 
                      value={input.Signature}
                      onChange={handleInput}
                      placeholder='' />
                  <label className="form-check-label" htmlFor="Signature3"> 3rd </label>
                </div>
                <div><hr/></div>
                <div className="col-md-4 my-2">MR No</div>
                <div className='col-md-3 my-1'>
                  <input className='form-control' type='number' id="MRCode" 
                  name='MRCode'
                  value={input.MRCode}
                  onChange={handleInput}
                  
                  />
                </div>                
                <div className='col-md-5  my-1'>
                  <Form.Group controlId="DateMR">                    
                    <Form.Control type="date" id="MRDate"  name="MRDate" placeholder="Date" 
                      value={ typeof(input.MRDate) === 'undefined'? null : input.MRDate}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4 my-2">Payment Mode</div>
                <div className='col-md-8 my-1'>
                <select className="form-select" aria-label="Group"
                name='PaymentType'
                value={input.PaymentType}
                onChange={handleInput}
                >
                  <option key={1} value={''}>Select</option> 
                  <option key={2} value={'Cash'}>Cash</option> 
                  <option key={3} value={'Cheque'}>Cheque</option>
                  <option key={4} value={'Credit Advice'}>Credit Advice</option>
                  <option key={5} value={'DD'}>DD</option>
                  <option key={6} value={'Deposit Premium'}>Deposit Premium</option>
                  <option key={7} value={'Pay Order'}>Pay Order</option>
                  <option key={8} value={'Bank Guarantee'}>Bank Guarantee</option>
                  <option key={9} value={'Fund Transfer'}>Fund Transfer</option>
                  <option key={10} value={'BEFTN/EFTN'}>BEFTN/EFTN</option>
                  <option key={11} value={'Cash/CA/CQ/PO/Dranf No'}>Cash/CA/CQ/PO/Dranf No</option>
                  
                </select>
              </div>
                
                <div className='col-md-4 my-2'>Bank</div>
                <div className='col-md-8 my-1'>
                  <input type='text' className='form-control' id='BankName'
                  name='BankName'
                  value={input.BankName} 
                  onChange={handleInput}
                  />

                </div>

              <div className='col-md-4 my-2'>Bank Branch</div>
              <div className='col-md-8 my-1'>
                <input type='text' className='form-control' id='BranchName'
                  name='BranchName'
                  value={input.BranchName}
                  onChange={handleInput}
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
                    <Form.Group >                    
                      <Form.Control type="date"  name="ChequeDate"   placeholder="yyyy-mm-dd"
                        value={typeof(input.ChequeDate) ==='undefined'? null : input.ChequeDate}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </div>
              
              
            

              </div>
            </div>

           
            <div className='col-md my-2'>
              <button type="button" className="btn btn-primary mx-2" onClick={SaveData} ><i className="fa-light fa-floppy-disk"></i> Save</button>
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> New Entry</button>
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> Copy From CN</button> 
              <button type="button" className="btn btn-primary mx-2" ><i className="fa-light fa-floppy-disk"></i> Copy From Bill</button> 
              <button type="button" className="btn btn-secondary mx-2" onClick={calculateTotalAmount} > Cancel</button>              
              <button type="button" className="btn btn-primary mx-2" onClick={showToast}><i className="fa-regular fa-file-pdf"></i>PDF</button>
              <ToastContainer />
              
            </div>
          </div>
        </div>
        </div>
        </div>
        
    </>
  )
}
