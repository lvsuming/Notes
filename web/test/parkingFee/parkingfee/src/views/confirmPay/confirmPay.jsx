import React from 'react';
import common from '../../common.jsx';
import './confirmPay.css';
//import Using ES6 syntax
import WeUI from 'react-weui';
//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {Button} = WeUI;
class ConfirmPay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            parkingName : decodeURIComponent(this.getUrlParam('parkName') || ''),
            carNo : decodeURIComponent(this.getUrlParam('carNo') || ''),
            startTime : '',
            stayTime : '',
            fee : ''
        }
    }

    //获取hash
    hash = function () {
        var hash = "";
        if(window.location.hash){
            var locationHash = window.location.hash;
            hash = locationHash.indexOf('?') > -1 ? locationHash.substr(locationHash.indexOf('?') + 1) : '';
        }else if(window.location.search){
            var locationSearch = window.location.search;
            hash = locationSearch.indexOf('?')>-1 ? locationSearch.substr(locationSearch.indexOf('?') + 1) : '';
        }
        return hash;
    };
    //获取url参数
    getUrlParam = function (key) {
        var urlHash = this.hash();
        if (key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = urlHash.match(reg);
            return r != null ? r[2] : null;
        } else {
            var url = /\?/.test(urlHash) ? urlHash.substr(urlHash.indexOf('?') + 1) : urlHash;
            var obj = {};
            url.split('&').forEach(function (item) {
                obj[item.split('=')[0]] = item.split('=')[1]
            });
            return obj;
        }
    };

    getParams(){
        var that = {
            url: '/',
            params : {
                'parkingName' : this.state.parkingName,
                'carNo' : this.state.carNo
            },
            successFunc : function (result) {
                this.setState({
                    startTime : result.startTime || '',
                    stayTime : result.stayTime || '',
                    fee : result.fee || ''
                })
            },
            errorFunc: function () {
                alert('获取信息失败');
            }
        };
        common.getFetch(that);
    }

    submitFun(){
        var that = {
            url: '/',
            params : {
                'parkingName' : this.state.parkingName,
                'carNo' : this.state.carNo,
                'startTime' : this.state.startTime,
                'stayTime' : this.state.stayTime,
                'fee' : this.state.fee
            },
            successFunc : function () {
                alert('提交成功')
            },
            errorFunc: function () {
                alert('提交失败')
            }
        };
        common.postFetch(that);
    }

    componentWillMount(){
        //this.getParams();
        this.setState({
            startTime : '2017-07-07  20:00:00',
            stayTime : '5小时56分钟',
            fee : '10'
        })
    }

    render(){
        return(<div>
                    <div className="feeDetails">
                    <p><strong>{this.state.parkingName}</strong></p>
                    <h2 className="carNo">{this.state.carNo}</h2>
                    <img src="./images/fee-photo.png" width="100%" height='150px' alt="" className="fl"/>
                    <div className="carInfo">
                        <dl>
                            <dt>入场时间</dt>
                            <dd><strong>{this.state.startTime}</strong></dd>
                        </dl>
                        <dl>
                            <dt>停留时间</dt>
                            <dd><strong>{this.state.stayTime}</strong></dd>
                        </dl>
                        <dl>
                            <dt>停车费用</dt>
                            <dd className="green"><strong>{this.state.fee}元</strong></dd>
                        </dl>
                    </div>
                </div>
                <div className="page_bd">
                    <Button onClick={this.submitFun.bind(this)}>确定</Button>
                </div>
            </div>
        );
    }
}
export default ConfirmPay;
