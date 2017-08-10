import React from 'react';
import PropTypes from 'prop-types';
import base,{$} from '../../components/base';
import common from '../../components/common';
import Row from '../../components/base/row.jsx';
import district from './district.min';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class Article extends React.Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        data: PropTypes.object || null,
    };
    bindHotelReserveType(){
        let self=this,
            i = self.props.num,
            resultData = [
                {id:1,value:'携程行政人员预定'},
                {id:2,value:'协议行政人员预定'},
                {id:3,value:'自行预定'}
            ],
            travellerDeptPara = {
                trigger : 'fd_hotel_reserve_type'+i,
                title : '酒店预定类型',
                dataArr: resultData,
                callback:(indexArr, data) => {
                    if(data && data.length>0) {
                        let fdId = data[data.length - 1].id,
                            fdName = data[data.length - 1].value,
                            obj = {
                                fdId: fdId,
                                fdName: fdName
                            };
                        let stateData = self.props.data[i-1];
                        stateData.fd_hotel_reserve_type = obj;
                        self.props.setRootState({
                            data: self.props.data
                        })
                    }
                }
            };
        common.commonFun.mobileSelect(travellerDeptPara);
    };
    bindHotelType() {
        let self = this,
            dataArr = [
                {id:'1',value:'深圳葵花公寓'},
                {id:'2',value:'武汉怡程酒店'},
                {id:'2',value:'深圳皇悦酒店'}
            ],
            i = self.props.num,
            trafficToolPara = {
                trigger : 'fd_hotel_type'+i,
                title : '酒店类型',
                dataArr : dataArr,
                callback:(indexArr, data) => {
                    if(data && data.length>0){
                        var fd_transport = {
                            fdId : data[0].id,
                            fdName: data[0].value
                        };
                        let stateData = self.props.data[i-1];
                        stateData.fd_hotel_type = fd_transport;
                        self.props.setRootState({
                            data: self.props.data
                        })
                    }
                }
            };
        common.commonFun.mobileSelect(trafficToolPara);
    }
    bindDistrict(fieldName) {
        let self=this,
            i = self.props.num,
            districtPara = {
                trigger : fieldName+i,
                title : '入住城市',
                dataArr : district,
                callback:(indexArr, data) => {
                    if(data && data.length>0){
                        var val = data[data.length-1].value;
                        let stateData = self.props.data[i-1];
                        stateData[fieldName] = val;
                        self.props.setRootState({
                            data: self.props.data
                        })
                    }
                }
            };
        common.commonFun.mobileSelect(districtPara);
    }
    componentDidMount(){
        this.bindHotelReserveType();
        this.bindHotelType();
        this.bindDistrict('fd_city');
    }
    changeInTime(num,date,dateString){
        if(!date) return;
        let inTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm:ss'),
            outTime;
        outTime = this.props.data[num-1].fd_out_time;
        this.calcStayDays(inTime,outTime,num);
        let stateData = this.props.data[num-1];
        stateData.fd_in_time = inTime;
        this.props.setRootState({
            data: this.props.data
        });
    }
    changeOutTime(num,date,dateString){
        if(!date) return;
        var outTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm:ss'),
            inTime;
        inTime = this.props.data[num-1].fd_in_time;
        this.calcStayDays(inTime,outTime,num);
        let stateData = this.props.data[num-1];
        stateData.fd_out_time = outTime;
        this.props.setRootState({
            data: this.props.data
        });
    }
    calcStayDays(inTime,outTime,num){
        if(!inTime || !outTime) return;
        var stayTime = new Date(outTime).getTime()-new Date(inTime).getTime(),
            stayDays = Math.floor(stayTime/1000/86400);
        //$('input[name=fd_days]')[0].value = stayDays;
        let stateData = this.props.data[num-1];
        stateData.fd_days = stayDays;
        this.props.setRootState({
            data: this.props.data
        });
    }
    disabledDate(num,current) {
        let inTime = this.props.data[num-1].fd_in_time;
        let boolean = inTime ? (current && current.valueOf() < new Date(inTime).getTime()-6400000) : current && current.valueOf() < Date.now();
        return boolean
    }
    saveInputValue(dom){
        var index = dom.closest('form').id.replace('form','');
        index = Number(index)-1;
        if(dom.type!=='hidden'){
            let data = this.props.data,
                name = dom.name,
                value = dom.value;
            data[index][name] = value;
            this.props.setRootState({data:data});
        }
    }
    render(){
        var domIconDel,
        num = this.props.num ? this.props.num : 1;
        if(num!==1) domIconDel=<span className="icon-del" onClick={this.props.delJourney.bind(this)}></span>;
        return(<form id={'form'+num}><article>
                <div className="row flex">
                    <span className="blue">行程单 ({num})</span>
                    {domIconDel}
                </div>
                <div className="row flex">
                    <label>预定类型</label>
                    <input type="hidden" name="fd_hotel_reserve_type" value={this.props.data[num-1].fd_hotel_reserve_type?this.props.data[num-1].fd_hotel_reserve_type.fdId:''}/>
                    <input type="text" id={"fd_hotel_reserve_type"+num} className="meeting_type select_bg" placeholder="请选择(必填)" value={this.props.data[num-1].fd_hotel_reserve_type?this.props.data[num-1].fd_hotel_reserve_type.fdName:''} readOnly/>
                </div>
                <div className="row xiecheng" style={{display: 'none'}}>
                    <a href="http://m.ctrip.com/html5/">
                        <span className="btn-xiecheng">携程</span>
                    </a>
                    <h6 className="blue">(选择携程预订，需要进入  携程官网  查找标准酒店，再填写申请单，审批后由行政人员预订。)</h6>
                </div>
                <Row title="预定酒店名称" name="fd_hotel_name" isValid={this.props.validData[num-1].fd_hotel_name} placeholder="" data-num={num} onChange={this.saveInputValue.bind(this)} value={this.props.data[num-1].fd_hotel_name}></Row>
                <Row title="房费价格" type="number" name="fd_price" isValid={this.props.validData[num-1].fd_price} placeholder="" data-num={num} onChange={this.saveInputValue.bind(this)} value={this.props.data[num-1].fd_price}></Row>
                <Row title="酒店类型" name="fd_hotel_type" isValid={this.props.validData[num-1].fd_hotel_type} placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={this.props.data[num-1].fd_hotel_type}></Row>
                <Row title="入住人" name="fd_name" isValid='true' placeholder="请填写(必填)" data-num={num} onChange={this.saveInputValue.bind(this)} value={this.props.data[num-1].fd_name}></Row>{/* readOnly="true" selectMore="true"*/}
                <Row title="入住城市" name="fd_city" isValid='true' placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={this.props.data[num-1].fd_city}></Row>
                {/*<Row title="入住时间" type="datetime" name="fd_in_time" placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.changeDateTime.bind(this)}></Row>
                <Row title="退房时间" type="datetime" name="fd_out_time" placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.changeDateTime.bind(this)}></Row>*/}
                <div className="row flex">
                    <label>入住时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder="请选择(必填)" onOk={this.changeInTime.bind(this,num)}/>
                </div>
                <div className="row flex">
                    <label>退房时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder="请选择(必填)" onOk={this.changeOutTime.bind(this,num)} disabledDate={this.disabledDate.bind(this,num)}/>
                </div>
                <Row title="入住天数" type="number" name="fd_days" isValid={this.props.validData[num-1].fd_days} placeholder=" " readOnly="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={this.props.data[num-1].fd_days}></Row>
            </article></form>
        )
    }
}
class Articles extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let self=this;
        return (<div>
            {self.props.data.map((item,index) => {
                return <Article key={index} num={item.num} data={self.props.data} validData={self.props.validData} delJourney={self.props.delJourney} setRootState={self.props.setRootState.bind(self)}></Article>
            })}
        </div>)
    }
}
class Page extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
            validData: [],
            delJourney: this.delJourney,
            timeOutHandler : null,
            isSubmit : false
        }
    }
    setRootState(obj) {
        this.setState(obj);
        this.saveCacheData(obj);
    }
    addJourney(){
        let num = this.state.data.length,
            data = this.state.data,
            validData = this.state.validData;
        data.push({
            'num': num+1
        });
        validData.push({
            fd_hotel_name : false,
            fd_price : false,
            fd_hotel_type : false,
            fd_days : false
        });
        this.setRootState({
            data : data,
            validData : validData
        })
    }
    saveCacheData(obj) {
        var cacheData = {};
        cacheData.timestamp = Date.now();
        cacheData.businesstripHotel = obj.data;
        clearTimeout(this.state.timeOutHandler);
        this.state.timeOutHandler = setTimeout(() => {
            sessionStorage.cacheData = JSON.stringify(cacheData);
        },500);
        this.checkForm(obj.data);
    }
    getSessionData(){
        let cacheData = sessionStorage.cacheData ?  JSON.parse(decodeURIComponent(sessionStorage.cacheData)): null,
            hotelCacheData = null ? cacheData.businesstripHotel : null;
        if(hotelCacheData) this.setState({data:hotelCacheData});
    }
    checkForm(data) {
        var flag = true;
        data.forEach((item,index) => {
            for(let k in item){
                var str = 'fd_hotel_reserve_type,fd_hotel_name,fd_price,fd_hotel_type,fd_name,fd_city,fd_in_time,fd_out_time,fd_days';
                if(str.indexOf(k)<0) flag = false;
            }
        });
        if(flag) this.setState({isSubmit:true})
    };
    submitForm(){
        if(!this.state.isSubmit) return;
        this.context.router.push({
            pathname: '/businesstripCreate'
        });
    }
    delJourney(e){
        let data = this.state.data;
        let target = e.target;
        let index = target.parentNode.parentNode.getAttribute('data-id');
        data.splice(Number(index)-1,1);
        this.setRootState({
            data : data
        });
    }
    componentWillMount(){
        this.getSessionData();
        this.addJourney();
    }
    componentDidMount(){

    }
    render(){
        return <div>
            <Articles data={this.state.data} validData={this.state.validData} delJourney={this.delJourney.bind(this)} setRootState={this.setRootState.bind(this)}/>
            <div className="row addJourney mb9" style={{marginBottom: 9+'rem'}} onClick={this.addJourney.bind(this)}></div>
            <div className="row fixed bg-gray">
                <button type="button" className={"btn-submit grid-1 "+(this.state.isSubmit?"":"disabled")} onClick={this.submitForm.bind(this)}>确定</button>
            </div>
        </div>
    }
}
Page.contextTypes = {
    router: Object
};
export default Page;
