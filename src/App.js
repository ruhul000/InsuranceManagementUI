import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/styles.css';
import Master from './components/layout/Master';

import Login from './components/module/auth/Login';
import ClientNew from './components/module/ClientNew';
import ClientList from './components/module/ClientList';
import ClientEdit from './components/module/ClientEdit';

import { createBrowserRouter,createRoutesFromElements,Route,Link,RouterProvider } from 'react-router-dom';
import BankList from './components/module/BankList';
import BankNew from './components/module/BankNew';
import BankEdit from './components/module/BankEdit';
import BankBranchList from './components/module/BankBranchList';
import BankBranchNew from './components/module/BankBranchNew';
import BankBranchEdit from './components/module/BankBranchEdit';
import InsuranceCompanyList from './components/module/master/InsuranceCompanyList';
import InsuranceCompanyNew from './components/module/master/InsuranceCompanyNew';
import InsuranceCompanyEdit from './components/module/master/InsuranceCompanyEdit';
import MarineCargoCoverNoteNew from './components/module/MarineCargo/MarineCargoCoverNoteNew';
import MarineCargoPolicyNew from './components/module/MarineCargo/MarineCargoPolicyNew';
import MarineCargoAddendum from './components/module/MarineCargo/MarineCargoAddendum';
import CompanyInfo from './components/module/master/CompanyInfo';
import CompanyBranch from './components/module/master/CompanyBranch';
import MoneyReceiptNew from './components/module/accounts/MoneyReceiptNew';
import BankDeposit from './components/module/accounts/BankDeposit';
import MotorCertificate from './components/module/motor/MotorCertificate';






 function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([

      <Route>
        <Route path='/' element={<Root />} > 
          <Route path='/Client' element=<ClientList/> />
          <Route path='/ClientNew' element=<ClientNew/> />
          <Route path='/Client/Edit/:id' element=<ClientEdit/> />
          <Route path='/Bank' element=<BankList/> />
          <Route path='/BankNew' element=<BankNew/> />
          <Route path='/Bank/Edit/:id' element=<BankEdit/> />
          <Route path='/BankBranch' element=<BankBranchList/> />
          <Route path='/BankBranchNew' element=<BankBranchNew/> />
          <Route path='/BankBranch/Edit/:id' element=<BankBranchEdit/> />
          <Route path='/InsuranceCompany' element=<InsuranceCompanyList/> />
          <Route path='/InsuranceCompanyNew' element=<InsuranceCompanyNew/> />
          <Route path='/InsuranceCompany/Edit/:id' element=<InsuranceCompanyEdit/> />
          <Route path='/MarineCargo/Covernote' element=<MarineCargoCoverNoteNew/> />
          <Route path='/MarineCargo/Amendment' element=<MarineCargoAddendum/> />
          <Route path='/MarineCargo/Policy' element=<MarineCargoPolicyNew/> />
          <Route path='/Company' element=<CompanyInfo/> />
          <Route path='/CompanyBranch' element=<CompanyBranch/> />
          <Route path='/Accounts/MR' element=<MoneyReceiptNew/> />
          <Route path='/Accounts/BankDeposit' element=<BankDeposit/> />
          <Route path='/motor/certificate' element=<MotorCertificate/> />

        </Route>
        <Route path='/login' element=<Login/> />

        
      </Route>
      
    ])
  )

  return (
         <>
            <RouterProvider router={router}/>
         </>
  );
}
export default App;
const Root=()=>{
  return( 
      <Master/>
    )
}
