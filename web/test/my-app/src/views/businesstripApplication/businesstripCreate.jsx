import React from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import base,{$,getUrl} from '../../components/base';
import common from '../../components/common';
import UserInfo from '../../components/userInfo/userInfo.jsx';
import '../../components/base/index.css';
import './businesstripCreate.css';
import BusinesstripApplication from './businesstripApplication.jsx';
import BusinesstripTraffic from './businesstripTraffic.jsx';
import BusinesstripHotel from './businesstripHotel.jsx';
import Row from '../../components/base/row.jsx';
let cacheData = sessionStorage.getItem('cacheData') ?  JSON.parse(decodeURIComponent(sessionStorage.getItem('cacheData'))): {},
    businesstripCreateData = (!base.isEmptyObject(cacheData)&&!base.isEmptyObject(cacheData.businesstripCreate)) ? cacheData.businesstripCreate : {};

let saveCacheData = function(e,key,value) {
    if(key && (value || value==='')){
        businesstripCreateData[key] = value;
    }
    if(key && !value){
        delete businesstripCreateData[key];
        return;
    }
    var nowTime = new Date().getTime(),
        $targetDom = e ? $(e.target) : null;
    if($targetDom){
        var id = $targetDom.attr('id'),
            val = $targetDom.val() || $targetDom.text();
        businesstripCreateData[id] = val;
    }
    businesstripCreateData.timestamp = nowTime;
    cacheData.businesstripCreate = businesstripCreateData;
    sessionStorage.setItem('cacheData',JSON.stringify(cacheData));
    checkForm();
};

let checkForm = function(boolean) {
    var flag = true,
        form = document.getElementsByTagName('form')[0],
        para = base.unSerialize(decodeURIComponent(base.serialize('form'))),
        tips = '',
        content = '';
    for(var x in para){
        if(para[x]===''){
            if(x==='fd_isEmergency') break;
            var targetDom = document.querySelector('input[name='+x+']'),
                tip = targetDom ? targetDom.previousSibling.previousSibling.innerHTML : '';
            tips+=' '+tip;
            flag = false;
        }
    }
    if(!cacheData.applicationCreate || !cacheData.businesstripTranfic || !cacheData.businesstripHotel) flag = false;
    if(boolean && tips) common.poptip(tips+'不能为空');
    else if(boolean && content) common.poptip(content);
    else if(boolean && !cacheData.applicationCreate) common.poptip('请先填写出差详情');
    else if(boolean && !cacheData.businesstripTranfic) common.poptip('请先填写交通预定');
    else if(boolean && !cacheData.businesstripHotel) common.poptip('请先填写酒店预定');

    if(flag){
        $('button').removeClass('disabled');
    }else{
        $('button').addClass('disabled');
    }
    return flag;
};

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
        saveCacheData(null,'fd_isEmergency',!this.state.isEmergency+'');
        this.setState({
            isEmergency : !this.state.isEmergency
        });
        let dom = this.refs.fd_isEmergency,
            className = dom.className;
        if(this.state.isEmergency){
            dom.className = className + ' selected';
        }
        else{
            dom.className = className.replace('selected','');
        }
    }
    render(){
        return (<div>
            <input type="hidden" name="fd_isEmergency" value={this.state.isEmergency}/>
            <span id="fd_isEmergency" ref="fd_isEmergency" className="icon-switch fl" onClick={this.radioSwitch.bind(this)}></span>
        </div>)
    }
}

class Page extends React.Component{
    constructor(props){
        super(props);
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
                    saveCacheData(null,'fd_company',obj);
                }
            }
        };
        if(resultData && resultData.length>0){
            common.commonFun.mobileSelect(travellerDeptPara);
        }
    }

    componentDidMount(){
        this.bindTravellerDept();
    }

    render(){
        return <form>
            <section className="mb9 block">
                <UserInfo></UserInfo>
                <div className="noticebar"></div>
                <Row title="公司名称" name="fd_company" readOnly="true" className="blue"></Row>
                <Article title="出差详情" link="/businesstripCreate/businesstripApplication"></Article>
                <div className="row clr hide" id="businesstripApplicationList"></div>
                <Article title="交通预定" link="/businesstripCreate/businesstripTraffic"></Article>
                <div className="row clr hide" id="businesstripTrafficList"></div>
                <Article title="酒店预定" link="/businesstripCreate/businesstripHotel"></Article>
                <div className="row clr hide" id="businesstripHotelList"></div>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span>是否紧急</span>
                    <RadioSwitch></RadioSwitch>
                </div>
            </section>
            <div className="row fixed bg-gray">
                <button type="button" className="btn-submit grid-1 disabled">提交</button>
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