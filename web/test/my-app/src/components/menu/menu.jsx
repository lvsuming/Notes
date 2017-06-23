import React from 'react';
import {Router} from 'react-router';
import MenuItem from './menuItem.jsx';
import  './menu.scss';
class Menu extends React.Component{
    render(){
        return <ul className="home-menu bg-white align-center clr">
            <MenuItem link="/leaveApplication" name="请假申请"/>
            <MenuItem link="/" name="出差申请"/>
            <MenuItem link="/" name="会议管理"/>
            <MenuItem link="/" name="工资查询"/>
            <MenuItem link="/" name="发起流程"/>
            <MenuItem link="/" name="全部应用"/>
        </ul>
    }
}
export default Menu;