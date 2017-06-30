import React from 'react';
import {Router,Route,hashHistory,browserHistory,IndexRoute} from 'react-router';
import Home from '../home/home.jsx';
//import LeaveApplication from '../leaveApplication/leaveApplication.jsx';
//import BusinesstripCreate from '../businesstripApplication/businesstripCreate.jsx';
//import MeetingList from '../meetingApplication/meetingList.jsx';
//import MyFlow from '../myFlow/myFlow.jsx';
import AllApp from '../home/allApp.jsx';
class IndexPage extends React.Component{
    render(){
        return <Router history={hashHistory}>
                <Route path="/" component={Home}></Route>
                {/*<Route path="/allApp" component={AllApp}/>
                <Route path="/myFlow" component={MyFlow}/>
                 <Route path="/leaveApplication" component={LeaveApplication}/>
                 <Route path="/businesstripCreate" component={BusinesstripCreate}/>
                 <Route path="/meetingList" component={MeetingList}/>*/}
            </Router>
    }
}
export default IndexPage;