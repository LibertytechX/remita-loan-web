import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.scss';

import ConfirmLoan from "./components/pages/ConfirmLoan";
import Loan from "./components/pages/Loan";
import LoanDisbursed from "./components/pages/LoanDisbursed";
import Questions from "./components/pages/Question";
import SupportCustomer from "./components/pages/customer_support";
import Main from "./components/pages/main";
import OTP from "./components/pages/otp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/loan" component={Loan} exact />
        <Route path="/otp" component={OTP} exact />
        <Route path="/confirm_loan" component={ConfirmLoan} exact />
        <Route path="/loan_disbursed" component={LoanDisbursed} exact />
        <Route path="/customersupport" component={SupportCustomer} exact />
        <Route path="/verify-question" component={Questions} exact />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
