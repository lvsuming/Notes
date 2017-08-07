import React from 'react';
import PropTypes from 'prop-types';
import base,{$} from '../../components/base';
import common from '../../components/common';
import Row from '../../components/base/row.jsx';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
let cacheData = sessionStorage.getItem('cacheData') ?  JSON.parse(decodeURIComponent(sessionStorage.getItem('cacheData'))): {},
    hotelCacheData = (!base.isEmptyObject(cacheData)&&!base.isEmptyObject(cacheData.businesstripHotelData)) ? cacheData.businesstripHotelData : {},
    num = 0, //行程数
    curNum = 0; //当前操作的行程数

var timeOutHandler;
function saveCacheData(e,key,value) {
    var nowTime = new Date().getTime(),
        $targetDom = e ? $(e.target || e) : null;
    if($targetDom){
        curNum = $targetDom.closest('form').index();
        var id = $targetDom.attr('id').replace(curNum,''),
            val = $targetDom.val() || $targetDom.text();
        appendObj();
        hotelCacheData.data[curNum][id] = val;
    }else if(key && value){
        var num = base.getUrlParam('num');
        if(num) curNum = num;
        if(!hotelCacheData.data[curNum]) appendObj(curNum);
        hotelCacheData.data[curNum][key] = value;
    }

    hotelCacheData.timestamp = nowTime;
    cacheData.businesstripHotel = hotelCacheData;
    clearTimeout(timeOutHandler);
    timeOutHandler = setTimeout(function () {
        sessionStorage.setItem('cacheData', JSON.stringify(cacheData));
    },500);
    checkForm();

    function appendObj() {
        if(!(curNum+'')) return;
        if(hotelCacheData.data.length<=curNum) hotelCacheData.data.splice(curNum, 0, {});
        if(hotelCacheData.data.length<=curNum) appendObj();
    }
}
let checkForm = function (param) {
    console.log(param);
};

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data
        }
    }
    static propTypes = {
        data: PropTypes.object || null,
    };
    bindHotelReserveType(){
        var self=this;
        var resultData = [
                {id:1,value:'携程行政人员预定'},
                {id:2,value:'协议行政人员预定'},
                {id:3,value:'自行预定'}
            ],
            travellerDeptPara = {
                trigger : 'fd_hotel_reserve_type'+self.state.data.num,
                title : '酒店预定类型',
                dataArr: resultData,
                callback:function(indexArr, data){
                    if(data && data.length>0){
                        var fdId = data[data.length-1].fdId,
                            fdName = data[data.length-1].fdName,
                            obj = {
                                fdId:fdId,
                                fdName:fdName
                            };
                        $('input[name=fd_hotel_reserve_type]').value = fdId;
                        saveCacheData(null,'fd_hotel_reserve_type',obj);
                    }
                }
            };
        common.commonFun.mobileSelect(travellerDeptPara);
    };

    bindHotelType() {
        var self=this;
        var dataArr = [
                {id:'1',value:'深圳葵花公寓'},
                {id:'2',value:'武汉怡程酒店'},
                {id:'2',value:'深圳皇悦酒店'}
            ],
            trafficToolPara = {
                trigger : 'fd_hotel_type'+self.state.data.num,
                title : '酒店类型',
                dataArr: dataArr,
                callback:function(indexArr, data){
                    if(data && data.length>0){
                        $('form')[0].querySelector('input[name=fd_hotel_type'+self.state.data.num+']').value = data[0].id; //curNum
                        var fd_transport = {
                            fdId : data[0].id,
                            fdName: data[0].value
                        };
                        saveCacheData(null,'fd_hotel_type',fd_transport);
                    }
                }
            };
        common.commonFun.mobileSelect(trafficToolPara);
    }
    componentDidMount(){
        this.bindHotelReserveType();
        this.bindHotelType();
        //common.commonFun.dateTimePicker('#fd_in_time'+this.state.data.num,'date');

    }
    changeInTime(date,dateString){
        console.log(date,dateString);
        saveCacheData(null,'fd_in_time',dateString);
    }
    changeOutTime(date,dateString){
        var outTime = new Date(date._d).getTime();

    }

    disabledDate(current) {

        return current && current.valueOf() < Date.now()
    };
    //const timeStartProps =
    render(){
        var domIconDel,
        num = this.state.data ? this.state.data.num : 1;
        if(this.state.data.num!==1) domIconDel=<span className="icon-del" onClick={this.props.delJourney.bind(this)}></span>;
        return(<article data-id={num}>
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
                <Row title="预定酒店名称" className="userDefined" name={"fd_hotel_name"+num} placeholder=""></Row>
                <Row title="房费价格" type="number" className="userDefined" name={"fd_price"+num} placeholder=""></Row>
                <Row title="酒店类型" className="agreement" name={"fd_hotel_type"+num} placeholder="" readOnly="true" selectMore="true"></Row>
                <Row title="入住人" name={"fd_name"+num} placeholder="请填写(必填)"></Row>
                <Row title="入住城市" name={"fd_city"+num} placeholder="" readOnly="true" selectMore="true"></Row>
                {/*<Row title="入住时间" type="datetime" name={"fd_in_time"+num} placeholder="" readOnly="true" selectMore="true" onChange={this.changeDateTime.bind(this)}></Row>
                <Row title="退房时间" type="datetime" name={"fd_out_time"+num} placeholder="" readOnly="true" selectMore="true" onChange={this.changeDateTime.bind(this)}></Row>*/}
                <div className="row flex">
                    <label>入住时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} ref={"fd_in_time"+num} format="YYYY-MM-DD HH:mm" onChange={this.changeInTime} placeholder="请选择(必填)"/>
                </div>
                <div className="row flex">
                    <label>退房时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} ref={"fd_in_time"+num} format="YYYY-MM-DD HH:mm" onChange={this.changeOutTime} placeholder="请选择(必填)" disabledDate={this.disabledDate}/>
                </div>
                <Row title="入住天数" name={"fd_days"+num} placeholder="" readOnly="true"></Row>
            </article>
        )
    }
}
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
    componentDidMount(){
        var dom = $('form input,form textarea');
        [...dom].forEach(function (item,index) {
            item.addEventListener('oninput',saveCacheData);
        })
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
