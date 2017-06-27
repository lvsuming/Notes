import React from 'react';
import TabsControl from '../../components/switchTab/TabsControl.jsx';
import '../../components/switchTab/switchTab.css';
class MyFlow extends React.Component{
    render(){
        return(
            <TabsControl name="myFlow">
                <div name="application" title="我的申请">1</div>
                <div name="pendingApproval" title="待我审批">2</div>
                <div name="hasApproved" title="我已审批">3</div>
            </TabsControl>
        );
    }
}
export default MyFlow;