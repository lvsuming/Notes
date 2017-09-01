import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../components/base/row.jsx';
import { DatePicker, Affix  } from 'antd';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/affix/style/index.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Button from 'antd-mobile/lib/button';
import WingBlank from 'antd-mobile/lib/wing-blank';
import Picker from 'antd-mobile/lib/picker';
import List from 'antd-mobile/lib/list';
import InputItem from 'antd-mobile/lib/input-item';
import 'antd-mobile/lib/button/style/index.css';
import 'antd-mobile/lib/wing-blank/style/index.css';
import 'antd-mobile/lib/picker/style/index.css';
import 'antd-mobile/lib/list/style/index.css';
import 'antd-mobile/lib/input-item/style/index.css';

import district from './district.min';

const Item = List.Item;

const hotelType = [
    {"value":"1","label":"深圳葵花公寓"},
    {"value":"2","label":"武汉怡程酒店"},
    {"value":"3","label":"深圳皇悦酒店"}
];
const hotelReserveType = [
    {"value":"1","label":"携程行政人员预定"},
    {"value":"2","label":"协议行政人员预定"},
    {"value":"3","label":"自行预定"}
];
class Article extends React.Component{
    componentDidMount(){
    }
    changeInTime(date,dateString){
        if(!date) return;
        let inTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm'),
            outTime,
            num = this.props.num;
        outTime = this.props.data[num-1].fd_out_time.value;
        this.calcStayDays(inTime,outTime,num);
        let stateData = JSON.parse(JSON.stringify(this.props.data[num-1]));
        stateData.fd_in_time.value = inTime;
        this.props.setRootState(stateData);
    }
    changeOutTime(date,dateString){
        if(!date) return;
        var outTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm'),
            inTime,
            num = this.props.num;
        inTime = this.props.data[num-1].fd_in_time.value;
        this.calcStayDays(inTime,outTime,num);
        let stateData = JSON.parse(JSON.stringify(this.props.data[num-1]));
        stateData.fd_out_time.value = outTime;
        this.props.setRootState(stateData);
    }
    calcStayDays(inTime,outTime){
        if(!inTime || !outTime) return;
        let stayTime = new Date(outTime).getTime()-new Date(inTime).getTime(),
            stayDays = Math.floor(stayTime/1000/86400),
            num = this.props.num,
            stateData = JSON.parse(JSON.stringify(this.props.data[num-1]));
        stateData.fd_days.value = stayDays;
        this.props.setRootState(stateData);
    }
    disabledDate(num,current) {
        let inTime = this.props.data[num-1].fd_in_time.value;
        let boolean = inTime ? (current && current.valueOf() < new Date(inTime).getTime()-6400000) : current && current.valueOf() < Date.now();
        return boolean
    }
    /*saveInputValue(dom){
        var index = dom.closest('form').id.replace('form','');
        index = Number(index)-1;
        if(dom.type!=='hidden'){
            let data = JSON.parse(JSON.stringify(this.props.data)),
                name = dom.name,
                value = dom.value;
            data[index][name].value = value;
            this.props.setRootState(data);
        }
    }*/
    changeCity(value){
        let data = JSON.parse(JSON.stringify(this.props.data)),
            num = this.props.num;
        district.forEach((item,index)=>{
            if(value[0] && value[0]===item.value){
                district[index].children.forEach((item2,index2)=>{
                    if(value[1] && value[1]===item2.value){
                        let arr = JSON.parse(JSON.stringify(item));
                        delete arr.children;
                        data[num-1].fd_city.value = [arr,item2];
                        this.props.setRootState(data);
                        return false;
                    }
                })
            }
        });
    }
    saveInputValue(v,name){
        let data = JSON.parse(JSON.stringify(this.props.data)),
            value = {},
            num = this.props.num;
        switch (name){
            case 'fd_hotel_reserve_type':
                hotelReserveType.forEach((item,index)=>{
                    if(v[0]===item.value){
                        value=item;
                        data[num-1][name] = value;
                        this.props.setRootState(data);
                    }
                });
                break;
            default :
                break;
        }
    }
    render(){
        let domIconDel,
            num = this.props.num ? this.props.num : 1,
            data = this.props.data[num-1];
        if(num!==1) domIconDel=<span className="icon-del" onClick={this.props.delJourney.bind(this)}></span>;
        return(
            <div>
            <form id={'form'+num} style={{marginBottom: 10}}>
                <div className={"row xiecheng "+(data.fd_hotel_reserve_type.value&&1===data.fd_hotel_reserve_type.value.fdId?'':'hide')}>
                    <a href="http://m.ctrip.com/html5/">
                        <span className="btn">携程</span>
                    </a>
                    <h6 className="blue">（选择携程预订，需要进入  携程官网  查找标准酒店，再填写申请单，审批后由行政人员预订。）</h6>
                </div>
                <Row title="预定酒店名称" name="fd_hotel_name" isValid={data.fd_hotel_name.isValid} placeholder="" onChange={this.saveInputValue.bind(this)} value={data.fd_hotel_name.value}></Row>
                {/*
                 <div className="row flex">
                 <label>预定类型</label>
                 <input type="text" id={"fd_hotel_reserve_type"+num} className="meeting_type select_bg" placeholder="请选择(必填)" value={data.fd_hotel_reserve_type?data.fd_hotel_reserve_type.value.fdName:''} readOnly/>
                 </div>
                <Row title="房费价格" type="number" name="fd_price" isValid={data.fd_price.isValid} placeholder="" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_price.value}></Row>
                 <Row title="入住人" name="fd_name" isValid='true' placeholder="请填写(必填)" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_name.value} readOnly="true" selectMore="true"></Row>*/}
                <List className="my-list" renderHeader={() => ('行程单 ('+num+')')} >
                    {domIconDel}
                    <Picker extra="请选择(可选)" cols={1} data={hotelReserveType} title="预定类型"
                            onChange={v => this.saveInputValue(v,'fd_hotel_reserve_type')} value={data.fd_hotel_reserve_type?[data.fd_hotel_reserve_type.value]:[]}>
                        <List.Item arrow="horizontal">预定类型</List.Item>
                    </Picker>
                    <InputItem
                        name="fd_hotel_name"
                        clear
                        placeholder="请填写(必填)"
                        updatePlaceholder="true"
                        defaultValue={data.fd_hotel_name.value}
                        onChange={this.saveInputValue.bind(this)}
                    >预定酒店名称</InputItem>
                    <InputItem
                        name="fd_price"
                        clear
                        type="number"
                        placeholder="请填写(必填)"
                        updatePlaceholder="true"
                        defaultValue={data.fd_price.value}
                        onChange={this.saveInputValue.bind(this)}
                    >房费价格</InputItem>
                    <InputItem
                        name="fd_name"
                        clear
                        placeholder="请填写(必填)"
                        updatePlaceholder="true"
                        defaultValue={data.fd_name.value}
                        onChange={this.saveInputValue.bind(this)}
                    >入住人</InputItem>
                    <Picker name="fd_city" extra="请选择(可选)" cols={2} data={district} title="入住城市" onChange={v => this.changeCity(v)}  value={[data.fd_city.value[0].value,data.fd_city.value[1].value]}>
                        <List.Item arrow="horizontal">入住城市</List.Item>
                    </Picker>
                    <Item arrow="horizontal">
                        入住时间
                        <DatePicker name="fd_in_time" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_in_time.value ? moment(data.fd_in_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeInTime.bind(this)} style={{float:'right',lineHeight:1.5}}/>
                    </Item>
                    <Item arrow="horizontal">
                        退房时间
                        <DatePicker name="fd_out_time" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_in_time.value ? moment(data.fd_in_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeOutTime.bind(this)} style={{float:'right',lineHeight:1.5}}/>
                    </Item>
                    <Picker name="fd_hotel_type" extra="请选择(可选)" cols={1} data={hotelType} title="酒店类型"
                            onChange={v => this.saveInputValue(v,'fd_hotel_type')} value={data.fd_hotel_type?[data.fd_hotel_type.value]:[]}>
                        <List.Item arrow="horizontal">酒店类型</List.Item>
                    </Picker>
                    <Item name="fd_days" extra="0">
                        入住天数
                    </Item>
                </List>

                {/*<Row title="酒店类型" name="fd_hotel_type" isValid={data.fd_hotel_type.isValid} placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_hotel_type.value}></Row>
                <Row title="入住时间" type="datetime" name="fd_in_time" placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.changeDateTime.bind(this)}></Row>
                <Row title="退房时间" type="datetime" name="fd_out_time" placeholder="" readOnly="true" selectMore="true" data-num={num} onChange={this.changeDateTime.bind(this)}></Row>
                <div className="row flex">
                    <label>退房时间</label>
                    <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_out_time.value ? moment(data.fd_out_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeOutTime.bind(this,num)} disabledDate={this.disabledDate.bind(this,num)}/>
                </div>
                <Row title="入住天数" type="number" name="fd_days" isValid={data.fd_days.isValid} placeholder=" " readOnly="true" data-num={num} onChange={this.saveInputValue.bind(this)} value={data.fd_days.value}></Row>*/}
            </form>
            </div>
        )
    }
}
Article.propTypes = {
    data: PropTypes.object || null,
};
class Articles extends React.Component{
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
            isSubmit: false
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
            'fd_city':{'value':[{"value":"110000","label":"北京市"},{"value":"110100","label":"北京"}]},
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
        setTimeout(() => {
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
            <WingBlank size="lg">
                <Button className="btn" onClick={this.addJourney.bind(this)}>+增加行程单</Button>
            </WingBlank>
            <Affix offsetBottom={10}>
                <WingBlank size="lg">
                    {
                        this.state.isSubmit
                            ? <Button className="btn" type="primary" onClick={this.submitForm.bind(this)}>确定</Button>
                            : <Button className="btn" type="primary" disabled onClick={this.submitForm.bind(this)}>确定</Button>
                    }
                </WingBlank>
            </Affix>
        </div>
    }
}
Page.contextTypes = {
    router: Object.require
};
export default Page;
