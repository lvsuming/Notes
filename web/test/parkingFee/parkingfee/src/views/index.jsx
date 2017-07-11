import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import SelectCar from './selectCar/selectCar.jsx';
import ConfirmPay from './confirmPay/confirmPay.jsx';
class IndexPage extends React.Component{
    render(){
        return <Router history={hashHistory}>
                <Route path="/" component={SelectCar}/>
                <Route path="/confirmPay" component={ConfirmPay}/>
            </Router>
    }
}
export default IndexPage;