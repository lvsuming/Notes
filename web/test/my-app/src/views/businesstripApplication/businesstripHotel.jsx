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
let cacheData = sessionStorage.getItem('cacheData') ?  JSON.parse(decodeURIComponent(sessionStorage.getItem('cacheData'))): {},
    hotelCacheData = (!base.isEmptyObject(cacheData)&&!base.isEmptyObject(cacheData.businesstripHotelData)) ? cacheData.businesstripHotelData : {
        timestamp: Date.now(),
        data : []
    },
    num = 0, //行程数
    curNum = 0; //当前操作的行程数

var timeOutHandler;
function saveCacheData(e,key,value,num) {
    var nowTime = new Date().getTime(),
        targetDom = e ? (e.target || e) : null;
    if(targetDom){
        let form = targetDom.closest('form');
        curNum = form.id ? Number(form.id.replace('form',''))-1 : 1;
        var id = targetDom.id.replace(curNum,''),
            val = targetDom.value || targetDom.innerHTML;
        appendObj();
        hotelCacheData.data[curNum][id] = val;
    }else if(key && value){
        var num = base.getUrlParam('num') || num;
        if(num) curNum = num-1;
        if(!hotelCacheData.data[curNum]) appendObj(curNum);
        hotelCacheData.data[curNum][key] = value;
    }

    hotelCacheData.timestamp = nowTime;
    cacheData.businesstripHotel = hotelCacheData;
    clearTimeout(timeOutHandler);
    timeOutHandler = setTimeout(function () {
        sessionStorage.cacheData = JSON.stringify(cacheData);
    },500);
    checkForm();

    function appendObj() {
        if(!(curNum+'')) return;
        if(hotelCacheData.data.length<=curNum) hotelCacheData.data.splice(curNum, 0, {});
        if(hotelCacheData.data.length<=curNum) appendObj();
    }
}
let checkForm = function (param) {
    //console.log(param);
};

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
                callback:function(indexArr, data){
                    if(data && data.length>0) {
                        let fdId = data[data.length - 1].id,
                            fdName = data[data.length - 1].value,
                            obj = {
                                fdId: fdId,
                                fdName: fdName
                            };
                        $('input[name=fd_hotel_reserve_type]').value = fdId;
                        saveCacheData(null, 'fd_hotel_reserve_type', obj, i);
                        let stateData = self.props.data[i];
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
        let self=this,
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
                callback:function(indexArr, data){
                    if(data && data.length>0){
                        $('form')[i].querySelector('input[name=fd_hotel_type'+i+']').value = data[0].id; //curNum
                        var fd_transport = {
                            fdId : data[0].id,
                            fdName: data[0].value
                        };
                        saveCacheData(null,'fd_hotel_type',fd_transport,i);
                        let stateData = self.props.data[i];
                        stateData.fd_hotel_type = fd_transport;
                        self.props.setRootState({
                            data: stateData
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
                callback:function(indexArr, data){
                    if(data && data.length>0){
                        var val = data[data.length-1].value;
                        $('form')[i-1].querySelector('input[name='+fieldName+']').value = val;
                        saveCacheData(null,fieldName,val,i);
                        let stateData = self.props.data;
                        stateData[fieldName] = val;
                        self.props.setRootState({
                            data: stateData
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
        //common.commonFun.dateTimePicker('#fd_in_time'+this.state.data.num,'date');

    }
    changeInTime(num,date,dateString){
        if(!date) return;
        let inTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm:ss'),
            outTime;
        saveCacheData(null,'fd_in_time',inTime,num);
        outTime = hotelCacheData.data[num-1]&&hotelCacheData.data[num-1].fd_out_time ? hotelCacheData.data[num-1].fd_out_time : null;
        this.calcStayDays(inTime,outTime,num);
    }
    changeOutTime(num,date,dateString){
        if(!date) return;
        var outTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm:ss'),
            inTime;
        saveCacheData(null,'fd_out_time',outTime,num);
        inTime = hotelCacheData.data[num-1]&&hotelCacheData.data[num-1].fd_in_time ? hotelCacheData.data[num-1].fd_in_time : null;
        this.calcStayDays(inTime,outTime,num);
    }
    calcStayDays(inTime,outTime,num){
        if(!inTime || !outTime) return;
        var stayTime = new Date(outTime).getTime()-new Date(inTime).getTime(),
            stayDays = stayTime/1000/86400;
        $('input[name=fd_days]')[0].value = stayDays;
    }
    disabledDate(num,current) {
        console.log(hotelCacheData.data);
        let inTime = hotelCacheData.data.length>0&&num ? hotelCacheData.data[num-1].fd_in_time : null;
        let boolean = inTime ? (current && current.valueOf() < new Date(inTime).getTime()-6400000) : current && current.valueOf() < Date.now();
        return boolean
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
                    <input type="hidden" name="fd_hotel_reserve_type"/>
                    <input type="text" id={"fd_hotel_reserve_type"+num} className="meeting_type select_bg" placeholder="请选择(必填)" readOnly/>
                </div>
                <div className="row xiecheng" style={{display: 'none'}}>
                    <a href="http://m.ctrip.com/html5/">
                        <span className="btn-xiecheng">携程</span>
                    </a>
                    <h6 className="blue">(选择携程预订，需要进入  携程官网  查找标准酒店，再填写申请单，审批后由行政人员预订。)</h6>
                </div>
                <Row title="预定酒店名称" className="userDefined" name="fd_hotel_name" placeholder="" data-num={num}></Row>
                <Row title="房费价格" type="number" className="userDefined" name="fd_price" placeholder="" data-num={num}></Row>
                <Row title="酒店类型" className="agreement" name="fd_hotel_type" placeholder="" readOnly="true" selectMore="true" data-num={num}></Row>
                <Row title="入住人" name="fd_name" placeholder="请填写(必填)" data-num={num}></Row>
                <Row title="入住城市" name="fd_city" placeholder="" readOnly="true" selectMore="true" data-num={num}></Row>
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
                <Row title="入住天数" type="number" name="fd_days" placeholder=" " readOnly="true" data-num={num}></Row>
            </article></form>
        )
    }
}
class Articles extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        //this.props = props;
    }
    //componentWillReceiveProps(nextProps) {
    //    //this.setState();
    //    this.props.setRootState({
    //        data: nextProps.data
    //    });
    //}

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
            delJourney: this.delJourney
        }
    }
    setRootState(obj) {
        this.setState(obj);
        console.log(obj);
    }
    addJourney(){
        let num = this.state.data.length,
            data = this.state.data;
        console.log(data);
        data.push({
            'num': num+1
        });
        this.setRootState({
            data : data
        })
    }
    componentWillMount(){
        this.addJourney();
    }
    componentDidMount(){
        var dom = $('form input,form textarea');
        [...dom].forEach(function (item,index) {
            item.addEventListener('input',saveCacheData);
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
    render(){
        return <div>
            <Articles data={this.state.data} delJourney={this.delJourney.bind(this)} setRootState={this.setRootState.bind(this)}/>
            <div className="row addJourney mb9" style={{marginBottom: 9+'rem'}} onClick={this.addJourney.bind(this)}></div>
            <div className="row fixed bg-gray">
                <button type="button" className="btn-submit grid-1 disabled">确定</button>
            </div>
        </div>
    }
}
export default Page;
