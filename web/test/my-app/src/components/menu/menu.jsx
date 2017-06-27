import React from 'react';
import MenuItem from './menuItem.jsx';
import  './menu.css';
class Menu extends React.Component{
    render(){
        return <ul className="home-menu bg-white align-center clr">
            <MenuItem link="/leaveApplication" name="请假申请" moduleName="leave"/>
            <MenuItem link="/businesstripCreate" name="出差申请" moduleName="evection"/>
            <MenuItem link="/meetingList" name="会议管理" moduleName="meeting"/>
            <MenuItem link="/" name="工资查询" moduleName="salary"/>
            <MenuItem link="/" name="发起流程" moduleName="process"/>
            <MenuItem link="/allApp" name="全部应用" moduleName="allapp"/>
        </ul>
    }
}
export default Menu;