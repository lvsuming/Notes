import React from 'react';
import {Link} from 'react-router';
import  './homeBoard.css';
import base from '../base';
class HomeBoard extends React.Component{
    getMytodoNum(){
        var _this = this;
        var body = 'type=all&pagenum';
        fetch( base.getUrl.getMytodoNum , { //+'&'+body
            method : "GET",
            credentials: 'include'
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (resultData) {
                    if(resultData.data && resultData.data.length>0){
                        _this.setState({
                            myTodoNum : JSON.parse(resultData.data).num
                        });
                    }
                });
            } else {
                console.log("Oops! You are not authorized.");
            }
        }, function (e) {
            console.log("Error submitting form!");
        });
    }
    getMyprocessNum(){
        var _this = this;
        var body = 'type=all&pagenum';
        fetch( base.getUrl.getMyprocessNum , { //+'&'+body
            method : "GET",
            credentials: 'include'
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (resultData) {
                    if(resultData.data && resultData.data.length>0){
                        _this.setState({
                            myProcessNum : JSON.parse(resultData.data).num
                        })
                    }
                });
            } else {
                console.log("Oops! You are not authorized.");
            }
        }, function (e) {
            console.log("Error submitting form!");
        });
    }
    componentDidMount(){
        this.getMytodoNum();
        this.getMyprocessNum();
    };
    render(){
        return <ul className="home-board bg-white align-center">
            <a href='/'>
                <li className="grid-2 fl">
                    <div className="todolist"><div className="num hide">{this.props.myTodoNum || 0}</div>待办事宜</div>
                </li>
            </a>
            <Link to='/myFlow' >
                <li className="grid-2 fl">
                    <div className="myprocess"><div className="num hide">{this.props.myProcessNum || 0}</div>我的流程</div>
                </li>
            </Link>
        </ul>
    }
}
export default HomeBoard;