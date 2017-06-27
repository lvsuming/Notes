import React from 'react';
import {Router,Route,browserHistory} from 'react-router';
import Home from '../home/home.jsx';
import LeaveApplication from '../leaveApplication/leaveApplication.jsx';
import BusinesstripCreate from '../businesstripApplication/businesstripCreate.jsx';
import MeetingList from '../meetingApplication/meetingList.jsx';
import MyFlow from '../myFlow/myFlow.jsx';
import AllApp from '../home/allApp.jsx';
class IndexPage extends React.Component{
    render(){
        return <div>
            <Router history={browserHistory}>
                <Route path="/" component={Home}/>
                <Route path="/myFlow" component={MyFlow}/>
                <Route path="/leaveApplication" component={LeaveApplication}/>
                <Route path="/businesstripCreate" component={BusinesstripCreate}/>
                <Route path="/meetingList" component={MeetingList}/>
                <Route path="/allApp" component={AllApp}/>
            </Router>
        </div>
    }
}
export default IndexPage;