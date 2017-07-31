import React from 'react';
import {Router,Route,hashHistory,browserHistory,IndexRoute} from 'react-router';
import Home from '../home/home.jsx';
import LeaveApplication from '../leaveApplication/leaveApplication.jsx';
import BusinesstripCreate from '../businesstripApplication/businesstripCreate.jsx';
import MeetingList from '../meetingApplication/meetingList.jsx';
import MyFlow from '../myFlow/myFlow.jsx';
import AllApp from '../home/allApp.jsx';
import BusinesstripApplication from '../businesstripApplication/businesstripApplication.jsx';
import BusinesstripTraffic from '../businesstripApplication/businesstripTraffic.jsx';
import BusinesstripTips from '../businesstripApplication/businesstripTips.jsx';
import BusinesstripHotel from '../businesstripApplication/businesstripHotel.jsx';
import Contact from '../contact/contact.jsx';
class IndexPage extends React.Component{
    render(){
        return <Router history={hashHistory}>
                <Route path="/" component={Home}></Route>
                <Route path="/allApp" component={AllApp}/>
                <Route path="/myFlow" component={MyFlow}/>
                <Route path="/leaveApplication" component={LeaveApplication}/>
                <Route path="/businesstripCreate" component={BusinesstripCreate}/>
                <Route path="/businesstripCreate/businesstripApplication" component={BusinesstripApplication}/>
                <Route path="/businesstripCreate/businesstripTraffic" component={BusinesstripTraffic}/>
                <Route path="/businesstripCreate/businesstripTraffic/businesstrip-tips" components={BusinesstripTips}/>
                <Route path="/businesstripCreate/businesstripHotel" component={BusinesstripHotel}/>
                <Route path="/meetingList" component={MeetingList}/>
                <Route path="/contact" component={Contact}/>
            </Router>
    }
}
export default IndexPage;