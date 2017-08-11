import React from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import base,{$} from '../../components/base';
import common from '../../components/common';
import UserInfo from '../../components/userInfo/userInfo.jsx';
import '../../components/base/index.css';
import './businesstripCreate.css';
import BusinesstripApplication from './businesstripApplication.jsx';
import BusinesstripTraffic from './businesstripTraffic.jsx';
import BusinesstripHotel from './businesstripHotel.jsx';
import Row from '../../components/base/row.jsx';

class Article extends React.Component{
    render(){
        return <div>
            <div className="noticebar"></div>
            <div className="row flex">
                <span className="blue">{this.props.title}</span>
                <Link to={this.props.link}>
                    <input type="text" className="select_bg grid-2 align-right" placeholder="请选择(必填)" readOnly/>
                </Link>
            </div>
        </div>
    }
}
class RadioSwitch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEmergency : false
        }
    }
    radioSwitch(){
        let data = this.props.data;
        data.businesstripCreate.isEmergency = !data.businesstripCreate.isEmergency;
        this.setState({
            data : data
        });
        this.props.saveCacheData();
    }
    render(){
        let isEmergency = this.props.data.businesstripCreate.isEmergency;
        return <span id="fd_isEmergency" ref="fd_isEmergency" className={"icon-switch fl "+((isEmergency && isEmergency!='false')?'selected':'')} onClick={this.radioSwitch.bind(this)}></span>
    }
}
class BusinesstripDetails extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let self=this;
        return (<div className="createDetails">
            {self.props.data.map((item,index) => {
                return <div key={index} className="row clr">
                    <dl><dt>预定信息</dt><dd>{item.fd_hotel_reserve_type.value.fdName||''}</dd></dl>
                    <dl><dt>预定酒店</dt><dd>{item.fd_hotel_type.value.fdName||item.fd_hotel_name.value||''}</dd></dl>
                    <dl><dt>入住时间</dt><dd>{(new Date(item.fd_in_time.value).format('yyyy-MM-dd hh:mm')||'') +' 至 '+ (new Date(item.fd_out_time.value).format('yyyy-MM-dd hh:mm')||'')}</dd></dl>
                    <dl><dt>入住城市</dt><dd>{item.fd_city.value||''}</dd></dl>
                </div>
            })}
        </div>)
    }
}
class Page extends React.Component{
    constructor(){
        super();
        this.state = {
            data: {
                businesstripCreate : {
                    fd_company : {},
                    isEmergency : 'false',
                },
                businesstripTranfic : [],
                businesstripHotel : []
            },
            timeOutHandler: null,
            isSubmit : false
        }
    }
    saveCacheData() {
        var cacheData = sessionStorage.cacheData ? JSON.parse(decodeURIComponent(sessionStorage.cacheData)): {};
        cacheData.timestamp = Date.now();
        cacheData.businesstripCreate = this.state.data.businesstripCreate;
        clearTimeout(this.state.timeOutHandler);
        this.state.timeOutHandler = setTimeout(() => {
            sessionStorage.cacheData = JSON.stringify(cacheData);
        },500);
        if(!this.checkForm(false)) return;
    }
    getSessionData(){
        let cacheData = sessionStorage.cacheData ? JSON.parse(decodeURIComponent(sessionStorage.cacheData)): {},
            businesstripCreateData = cacheData ? cacheData.businesstripCreate : {},
            businesstripTranficData = cacheData ? cacheData.businesstripTranfic : [],
            businesstripHotelData = cacheData ? cacheData.businesstripHotel : [],
            fd_company = businesstripCreateData ? businesstripCreateData.fd_company : '';
        if(fd_company || businesstripCreateData || businesstripTranficData || businesstripHotelData){
            let data = this.state.data;
            if(businesstripCreateData) data.businesstripCreate = businesstripCreateData;
            if(businesstripTranficData) data.businesstripTranfic = businesstripTranficData;
            if(businesstripHotelData) data.businesstripHotel = businesstripHotelData;
            this.setState({data:data});
        }
    }
    bindTravellerDept(){
        var resultData = [{"fdId":"14c130bcc5929db071a3b734102943ff","fdName":"深圳市XXXX服务有限公司","type":2,"fdNo":"C00","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""},{"fdId":"14c325e2e968c8904526de344d3a7324","fdName":"深圳市XXXX网络技术有限公司","type":2,"fdNo":"C30","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""},{"fdId":"14c130bcc6c515a751fe33e4e56ad53d","fdName":"XXXX有限公司","type":2,"fdNo":"C20","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""},{"fdId":"15c4061d9c325f230dc309b439295bf4","fdName":"深圳市云智融科技有限公司","type":2,"fdNo":"C80","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""},{"fdId":"15a70e45c38e8618c6dfe3c4cccb1bed","fdName":"dept外包员工","type":2,"fdNo":"dept外包员工","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""},{"fdId":"158730edfd6e9e24d31dbed4ecbb252b","fdName":"武汉XXXX科技有限公司","type":2,"fdNo":"C50","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""},{"fdId":"14c130bcfb2e9efb4a864804c968cb53","fdName":"深圳市XXXX科技有限公司","type":2,"fdNo":"C34","parentId":"14c130bcfbe208754e430764bc283ee7","parentName":"XXXX","imgUrl":""}];
        var travellerDeptPara = {
            trigger : 'fd_company',
            title : '公司名称',
            dataArr: resultData,
            callback:function(indexArr, data){
                if(data && data.length>0){
                    var fdId = data[data.length-1].fdId,
                        fdName = data[data.length-1].fdName,
                        obj = {
                            fdId:fdId,
                            fdName:fdName
                        };
                    $('input[name=fd_company]').value = fdId;
                }
            }
        };
        if(resultData && resultData.length>0){
            common.commonFun.mobileSelect(travellerDeptPara);
        }
    }
    checkForm(isPrompt) {
        var flag = true,
            tips = '',
            content = '';
        let data = this.state.data;
        for(let x in data){
            if(x==='timestamp') continue;
            if(!data[x]){
                flag=false;
                return;
            }
        }
        if(!data.businesstripCreate || !data.businesstripTranfic || !data.businesstripHotel) flag = false;
        if(isPrompt && tips) alert(tips+'不能为空');
        else if(isPrompt && !data.businesstripCreate.fd_company) alert('请先选择公司');
        else if(isPrompt && !data.businesstripCreate) alert('请先填写出差详情');
        else if(isPrompt && data.businesstripTranfic.length===0) alert('请先填写交通预定');
        else if(isPrompt && data.businesstripHotel.length===0) alert('请先填写酒店预定');

        if(flag){
            $('button')[0].removeClass('disabled');
        }else{
            $('button')[0].addClass('disabled');
        }
        return flag;
    }
    submitForm(){
        if(!this.checkForm(true)) return;
    }
    componentWillMount(){
        this.getSessionData();
    }
    componentDidMount(){
        this.bindTravellerDept();
    }
    render(){
        return <form>
            <section className="mb9 block">
                <UserInfo></UserInfo>
                <div className="noticebar"></div>
                <Row title="公司名称" name="fd_company" readOnly="true" className="blue" isValid="true"></Row>
                <Article title="出差详情" link="/businesstripCreate/businesstripApplication"></Article>
                <div className="row clr hide" id="businesstripApplicationList"></div>
                <Article title="交通预定" link="/businesstripCreate/businesstripTraffic"></Article>
                <div className="row clr hide" id="businesstripTrafficList"></div>
                <Article title="酒店预定" link="/businesstripCreate/businesstripHotel"></Article>
                {/*<div className="row clr hide" id="businesstripHotelList"></div>*/}
                <BusinesstripDetails ref="businesstripHotelList" data={this.state.data.businesstripHotel}></BusinesstripDetails>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span>是否紧急</span>
                    <RadioSwitch data={this.state.data} saveCacheData={this.saveCacheData.bind(this)}></RadioSwitch>
                </div>
            </section>
            <div className="row fixed bg-gray">
                <button type="button" className="btn-submit grid-1 disabled" onClick={this.submitForm.bind(this)}>提交</button>
            </div>
        </form>
    }
}

class BusinesstripCreate extends React.Component{
    render(){
        return <Router history={hashHistory}>
            <Route path="/businesstripCreate" component={Page}/>
            <Route path="/businesstripCreate/businesstripApplication" component={BusinesstripApplication}/>
            <Route path="/businesstripCreate/businesstripTraffic" component={BusinesstripTraffic}/>
            <Route path="/businesstripCreate/businesstripHotel" component={BusinesstripHotel}/>
        </Router>
    }
}
export default BusinesstripCreate;