import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import base,{$} from '../../components/base';
import common from '../../components/common';
import Row from '../../components/base/row.jsx';

let cacheData = sessionStorage.getItem('cacheData') ?  JSON.parse(decodeURIComponent(sessionStorage.getItem('cacheData'))): {},
    businesstripTrafficData = (!base.isEmptyObject(cacheData)&&!base.isEmptyObject(cacheData.businesstripTrafficData)) ? cacheData.businesstripTrafficData : {};
let saveCacheData = function(e,key,value) {
    if(key && (value || value==='')){
        businesstripTrafficData[key] = value;
    }
    if(key && !value){
        delete businesstripTrafficData[key];
        return;
    }
    var nowTime = new Date().getTime(),
        $targetDom = e ? $(e.target) : null;
    if($targetDom){
        var id = $targetDom.attr('id'),
            val = $targetDom.val() || $targetDom.text();
        businesstripTrafficData[id] = val;
    }
    businesstripTrafficData.timestamp = nowTime;
    cacheData.businesstripTrafficData = businesstripTrafficData;
    sessionStorage.setItem('cacheData',JSON.stringify(cacheData));
    checkForm();
};
let checkForm = function () {

};

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data
        }
    }
    bindTravellerType(){
        var resultData = [
                {id:1,value:'行政人员预定'},
                {id:2,value:'自行预定'}
            ],
            travellerDeptPara = {
                trigger : 'fd_traffic_type',    //num
                title : '交通预定类型',
                dataArr: resultData,
                callback:function(indexArr, data){
                    if(data && data.length>0){
                        var fdId = data[data.length-1].fdId,
                            fdName = data[data.length-1].fdName,
                            obj = {
                                fdId:fdId,
                                fdName:fdName
                            };
                        $('input[name=fd_traffic_type]').value = fdId;
                        saveCacheData(null,'fd_traffic_type',obj);
                    }
                }
            };
        common.commonFun.mobileSelect(travellerDeptPara);
    };

    bindTrafficTool() {
        var dataArr = [
                {id:1,value:'飞机'},
                {id:2,value:'火车'},
                {id:3,value:'汽车'}
            ],
            trafficToolPara = {
                trigger : 'fd_transport',   //num
                title : '交通工具',
                dataArr: dataArr,
                callback:function(indexArr, data){
                    if(data && data.length>0){
                        $('form')[0].querySelector('input[name=fd_transport]').value = data[0].id; //curNum
                        var fd_transport = {
                            fdId : data[0].id,
                            fdName: data[0].value
                        };
                        saveCacheData(null,'fd_transport',fd_transport);
                    }
                }
            };
        common.commonFun.mobileSelect(trafficToolPara);
    }
    checkCardID(e){
        var dom = e ? e.fd_cardID : null,
            val = dom ? dom.value : '',
            reg = /^[1-9]\d{5}((19|20)[0-9]{2})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        !reg.test(val) ? dom.addClass('error') : dom.removeClass('error');
    }
    componentDidMount(){
        this.bindTravellerType();
        this.bindTrafficTool();
    }
    render(){
        var domIconDel;
        if(this.state.data.num!==1) domIconDel=<span className="icon-del" onClick={this.props.delJourney.bind(this)}></span>;
        return(<article data-id={this.state.data?this.state.data.num:1}>
                <div className="row flex">
                    <span className="blue">行程单 ({this.state.data?this.state.data.num:1})</span>
                    {domIconDel}
                </div>
                <div className="row flex">
                    <Link to="/businesstripCreate/businesstripTraffic/businesstrip-tips">
                        <label className="icon-tip-business">交通预定类型</label>
                    </Link>
                    <input type="hidden" name="fd_traffic_type"/>
                    <input type="text" id="fd_traffic_type" className="meeting_type select_bg" placeholder="请选择(必填)" readOnly/>
                </div>
                <Row title="证件号码" name="fd_cardID" placeholder="自行预定可不填证件号" onChange={this.checkCardID}></Row>
                <div className="row flex">
                    <Link to="/businesstripCreate/businesstripTraffic/businesstrip-tips">
                        <label>交通工具</label>
                    </Link>
                    <input type="hidden" name="fd_transport"/>
                    <input type="text" id="fd_transport" className="meeting_type select_bg" placeholder="请选择(必填)" readOnly/>
                </div>
                <Row title="出发城市" name="fd_travel_from" placeholder="请选择(必填)" selectMore="true" readOnly="true"></Row>
                <Row title="目的城市" name="fd_travel_to" placeholder="请选择(必填)" selectMore="true" readOnly="true"></Row>
                <div className="row flex">
                    <label htmlFor="fd_departure_time">出发时间</label>
                    <input type="datetime" id="fd_departure_time" name="fd_departure_time" value="" className="meeting_start select_bg align-right" placeholder="请选择(必填)" readOnly/>
                </div>
                <Row title="预定时段" name="fd_preset_time" placeholder="无特殊要求" ></Row>
            </article>
        )
    }
}
Article.propTypes = {
    data: PropTypes.object || null,
};
class Articles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.data
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }
    render(){
        var self=this;
        return (<div>
            {this.state.data.map((item,index) => {
                return <Article data={item} key={index} delJourney={self.props.delJourney}></Article>
            })}
        </div>)
    }
}
class Page extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
            delJourney: this.delJourney
        }
    }
    addJourney(){
        let num = this.state.data.length,
            data = this.state.data;
        data.push({
            'num': num+1
        });
        this.setState({
            data : data
        });
    }
    componentWillMount(){
        this.addJourney();
    }
    delJourney(e){
        let data = this.state.data;
        let target = e.target;
        let index = target.parentNode.parentNode.getAttribute('data-id');
        data.splice(Number(index)-1,1);
        this.setState({
            data : data
        });
    }
    render(){
        return <form>
            <Articles data={this.state.data} delJourney={this.delJourney.bind(this)}/>
            <div className="row addJourney mb9" style={{marginBottom: 9+'rem'}} onClick={this.addJourney.bind(this)}></div>
            <div className="row fixed bg-gray">
                <button type="button" className="btn-submit grid-1 disabled">确定</button>
            </div>
        </form>
    }
}
export default Page;
