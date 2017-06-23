import React from 'react';
import {Router} from 'react-router';
import  './homeBoard.css';
class HomeBoard extends React.Component{
    render(){
        return <ul className="home-board bg-white align-center">
            <a href="/sys/notify/mobile/index.jsp">
                <li className="grid-2 fl">
                    <div className="todolist"><div className="num hide"></div>待办事宜</div>
                </li>
            </a>
            <a href="../html/myFlow.html">
                <li className="grid-2 fl">
                    <div className="myprocess"><div className="num hide">2</div>我的流程</div>
                </li>
            </a>
        </ul>
    }
}
export default HomeBoard;