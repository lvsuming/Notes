import React from 'react';
import MenuItem from '../../components/menu/menuItem.jsx';
import  '../../components/menu/menu.css';
class HomeBoard extends React.Component{
    render(){
        return <div>
            <h1 className="bg-white gray-1 bold" style={{padding: "2rem 2rem 0 2rem"}}>协同办公</h1>
            <ul className="home-menu bg-white align-center clr" style={{paddingBottom: 1+"rem"}}>
                <MenuItem link="/" name="发起流程" moduleName="process"/>
                <MenuItem link="/" name="会议管理" moduleName="meeting"/>
                <MenuItem link="/" name="资源借用" moduleName="resourceborrow"/>
                <MenuItem link="/" name="办公用品" moduleName="officesupplies"/>
                <MenuItem link="/" name="公文查询" moduleName="docquery"/>
            </ul>
            <div className="noticebar"></div>
            <h1 className="bg-white gray-1 bold" style={{padding: "2rem 2rem 0 2rem"}}>财务报销</h1>
            <ul className="home-menu bg-white align-center clr" style={{paddingBottom: 1+"rem"}}>
                <MenuItem link="/" name="费用报销" moduleName="feeexpense"/>
                <MenuItem link="/" name="差旅报销" moduleName="businessexpense"/>
                <MenuItem link="/" name="合同付款" moduleName="contractpayment"/>
                <MenuItem link="/" name="借款申请" moduleName="loanapplication"/>
                <MenuItem link="/" name="还款申请" moduleName="repayapplication"/>
            </ul>
            <div className="noticebar"></div>
            <h1 className="bg-white gray-1 bold" style={{padding: "2rem 2rem 0 2rem"}}>管理应用</h1>
            <ul className="home-menu bg-white align-center clr" style={{paddingBottom: 1+"rem"}}>
                <MenuItem link="/" name="日程管理" moduleName="agendamanage"/>
                <MenuItem link="/" name="任务管理" moduleName="taskmanage"/>
                <MenuItem link="/" name="合同管理" moduleName="contractmanage"/>
                <MenuItem link="/" name="流程管理" moduleName="flowmanage"/>
                <MenuItem link="/" name="论坛管理" moduleName="bbsmanage"/>
                <MenuItem link="/" name="固资管理" moduleName="fixedassets"/>
                <MenuItem link="/" name="新闻管理" moduleName="newsmanage"/>
                <MenuItem link="/" name="调查管理" moduleName="investmanage"/>
            </ul>
            <div className="noticebar"></div>
            <h1 className="bg-white gray-1 bold" style={{padding: "2rem 2rem 0 2rem"}}>其他应用</h1>
            <ul className="home-menu bg-white align-center clr" style={{paddingBottom: 1+"rem"}}>
                <MenuItem link="/" name="待办事宜" moduleName="todolist"/>
                <MenuItem link="/" name="规范制度" moduleName="regulation"/>
                <MenuItem link="/" name="知识中心" moduleName="knowledgecenter"/>
                <MenuItem link="/" name="工作沟通" moduleName="communication"/>
                <MenuItem link="/" name="优益多" moduleName="youyiduo"/>
            </ul>
        </div>
    }
}
export default HomeBoard;