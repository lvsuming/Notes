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
                        stateData.fd_hotel_reserve_type.value = obj;
                        switch (fdId){
                            case 1:
                            case 3:
                                stateData.fd_hotel_name.isValid = true;
                                stateData.fd_price.isValid = true;
                                stateData.fd_hotel_type.isValid = false;
                                stateData.fd_days.isValid = false;
                                break;
                            case 2:
                                stateData.fd_hotel_name.isValid = false;
                                stateData.fd_price.isValid = false;
                                stateData.fd_hotel_type.isValid = true;
                                stateData.fd_days.isValid = true;
                                break;
                            default:
                                break;
                        }
                        self.props.setRootState(self.props.data);
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
                        stateData.fd_hotel_type.value = fd_transport;
                        self.props.setRootState(self.props.data)
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
                        stateData[fieldName].value = val;
                        self.props.setRootState(self.props.data)
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
        let inTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm'),
            outTime;
        outTime = this.props.data[num-1].fd_out_time.value;
        this.calcStayDays(inTime,outTime,num);
        let stateData = JSON.parse(JSON.stringify(this.props.data[num-1]));
        stateData.fd_in_time.value = inTime;
        this.props.setRootState(stateData);
    }
    changeOutTime(num,date,dateString){
        if(!date) return;
        var outTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm'),
            inTime;
        inTime = this.props.data[num-1].fd_in_time.value;
        this.calcStayDays(inTime,outTime,num);
        let stateData = JSON.parse(JSON.stringify(this.props.data[num-1]));
        stateData.fd_out_time.value = outTime;
        this.props.setRootState(stateData);
    }
    calcStayDays(inTime,outTime,num){
        if(!inTime || !outTime) return;
        var stayTime = new Date(outTime).getTime()-new Date(inTime).getTime(),
            stayDays = Math.floor(stayTime/1000/86400);
        let stateData = JSON.parse(JSON.stringify(this.props.data[num-1]));
        stateData.fd_days.value = stayDays;
        this.props.setRootState(stateData);
    }
    disabledDate(num,current) {
        let inTime = this.props.data[num-1].fd_in_time.value;
        let boolean = inTime ? (current && current.valueOf() < new Date(inTime).getTime()-6400000) : current && current.valueOf() < Date.now();
        return boolean
    }
    saveInputValue(dom){
        var index = dom.closest('form').id.replace('form','');
        index = Number(index)-1;
        if(dom.type!=='hidden'){
            let data = JSON.parse(JSON.stringify(this.props.data)),
                name = dom.name,
                value = dom.value;
            data[index][name].value = value;
            this.props.setRootState(data);
        }
    }
    render(){
        let domIconDel,
            num = this.props.num ? this.props.num : 1,
            data = this.props.data[num-1];
        if(num!==1) domIconDel=<span className="icon-del" onClick={this.props.delJourney.bind(this)}></span>;
        return(<form id={'form'+num} style={{marginBottom: 10}}>
                <div className="row flex">
                    <span className="blue">行程单 ({num})</span>
                    {domIconDel}
                </div>
                <div className="row flex">
                    <label>预定类型</label>
                    <input type="text" id={"fd_hotel_reserve_type"+num} className="meeting_type select_bg" placeholder="请选择(必填)" value={data.fd_hotel_reserve_type?data.fd_hotel_reserve_type.value.fdName:''} readOnly/>
                </div>
                <div className={"row xiecheng "+(1===data.fd_hotel_reserve_type.value.fdId?'':'hide')}>
                    <a href="http://m.ctrip.com/html5/">
                        <span className="btn">携程</span>
                    </a>
                    <h6 className="blue">（选择携程预订，需要进入  携程官网  查找标准酒店，再填写申请单，审批后由行政人员预订。）</h6>
                </div>
                <Row title="预定酒店名称" name="fd_hotel_name" isValid={data.fd_hotel_name.isValid} placeholder="" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_hotel_name.value}></Row>
                <Row title="房费价格" type="number" name="fd_price" isValid={data.fd_price.isValid} placeholder="" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_price.value}></Row>
                <Row title="酒店类型" name="fd_hotel_type" isValid={data.fd_hotel_type.isValid} placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_hotel_type.value}></Row>
                <Row title="入住人" name="fd_name" isValid='true' placeholder="请填写(必填)" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_name.value}></Row>{/* readOnly="true" selectMore="true"*/}
                <Row title="入住城市" name="fd_city" isValid='true' placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_city.value}></Row>
                {/*<Row title="入住时间" type="datetime" name="fd_in_time" placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.changeDateTime.bind(this)}></Row>
                <Row title="退房时间" type="datetime" name="fd_out_time" placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.changeDateTime.bind(this)}></Row>*/}
                <div className="row flex">
                    <label>入住时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_in_time.value ? moment(data.fd_in_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeInTime.bind(this,num)}/>
                </div>
                <div className="row flex">
                    <label>退房时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_out_time.value ? moment(data.fd_out_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeOutTime.bind(this,num)} disabledDate={this.disabledDate.bind(this,num)}/>
                </div>
                <Row title="入住天数" type="number" name="fd_days" isValid={data.fd_days.isValid} placeholder=" " readOnly="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_days.value}></Row>
            </form>
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
                return <Article key={index} num={item.num} data={self.props.data} delJourney={self.props.delJourney} setRootState={self.props.setRootState.bind(self)}></Article>
            })}
        </div>)
    }
}
class Page extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
            delJourney: this.delJourney,
            timeOutHandler : null,
            isSubmit : false
        }
    }
    setRootState(obj) {
        this.setState({
            data : obj
        });
        this.saveCacheData(obj);
    }
    addJourney(){
        let num = this.state.data.length,
            dataValue = this.state.data;
        dataValue.push({
            'fd_hotel_reserve_type':{'value':''},
            'fd_hotel_name':{'value':'',isValid:false},
            'fd_price':{'value':'',isValid:false},
            'fd_hotel_type':{'value':'',isValid:false},
            'fd_name':{'value':''},
            'fd_city':{'value':''},
            'fd_in_time':{'value':''},
            'fd_out_time':{'value':''},
            'fd_days':{'value':0,isValid:false},
            'num': num+1
        });
        this.setRootState(dataValue)
    }
    saveCacheData(obj) {
        var cacheData = {};
        cacheData.timestamp = Date.now();
        cacheData.businesstripHotel = obj;
        clearTimeout(this.state.timeOutHandler);
        this.state.timeOutHandler = setTimeout(() => {
            sessionStorage.cacheData = JSON.stringify(cacheData);
        },500);
        if(!this.checkForm(false)) return;
    }
    getSessionData(){
        let cacheData = sessionStorage.cacheData ?  JSON.parse(decodeURIComponent(sessionStorage.cacheData)): null,
            hotelCacheData = cacheData ? cacheData.businesstripHotel : null;
        if(hotelCacheData){
            this.setState({data:hotelCacheData});
        }else{
            this.addJourney();
        }
    }
    checkForm(isPrompt) {
        let flag = true,
            data = this.state.data;
        data.forEach((item,index)=>{
            for(var j in item){
                if(j==='num') continue;
                let validData = item[j].isValid;
                if((validData===undefined || validData) && !item[j].value){
                    flag = false;
                }
            }
        });
        this.setState({isSubmit:flag});
        if(!flag && isPrompt){
            alert('请填写完整');
        }
        return flag;
    };
    submitForm(){
        if(!this.checkForm(true)) return;
        if(!this.state.isSubmit) return;
        this.context.router.push({
            pathname: '/businesstripCreate'
        });
    }
    delJourney(e){
        let data = this.state.data;
        let target = e.target;
        let index = target.closest('form').id.replace('form','');
        data.splice(Number(index)-1,1);
        this.setRootState(data);
    }
    componentWillMount(){
        this.getSessionData();
    }
    render(){
        return <div>
            <Articles data={this.state.data} delJourney={this.delJourney.bind(this)} setRootState={this.setRootState.bind(this)}/>
            <div className="row addJourney mb9" style={{marginBottom: 9+'rem'}} onClick={this.addJourney.bind(this)}></div>
            <div className="row fixed bg-gray">
                <button type="button" className={"btn-submit grid-1 "+(this.state.isSubmit?"":"disabled")} onClick={this.submitForm.bind(this)}>确定</button>
            </div>
        </div>
    }
}
Page.contextTypes = {
    router: Object.require
};
export default Page;
