import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../components/base/row.jsx';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

class Page extends React.Component{
    constructor(){
        super();
        this.state = {
            data : {
                fd_traveller : {'value':''},
                fd_traveller_tel : {'value':'','isCorrent':true},
                fd_traveller_dept : {'value':''},
                fd_traveller_post : {'value':''},
                fd_start_time : {'value':''},
                fd_end_time : {'value':''},
                fd_travel_days : {'value':''},
                fd_reason : {'value':''}
            },
            sValue: ['2013', '春'],
            isSubmit : false
        }
    }
    setRootState(obj) {
        this.setState({
            data : obj
        });
        this.saveCacheData(obj);
    }
    saveCacheData(obj) {
        var cacheData = {};
        cacheData.timestamp = Date.now();
        cacheData.businesstripApplication = obj;
        //setTimeout(() => {
            sessionStorage.cacheData = JSON.stringify(cacheData);
        //}, 500);
        if(!this.checkForm(false)) return;
    }
    checkForm(isPrompt) {
        let flag = true,
            data = this.state.data;
        for(var j in data){
            let validData = data[j].isValid;
            if((validData===undefined || validData) && !data[j].value){
                flag = false;
            }
        }
        this.setState({isSubmit:flag});
        if(!flag && isPrompt){
            alert('请填写完整');
        }
        return flag;
    };
    checkTel(e){
        var val = e ? e.value : '',
            reg = /^(13[0-9]|14[5|7]|15\d{1}|18\d{1})\d{8}$/;
        let stateData = JSON.parse(JSON.stringify(this.state.data));
        stateData.fd_traveller_tel = {
            'value' : val,
            'isCorrent' : reg.test(val)
        };
        this.setRootState(stateData);
    }
    changeInTime(date,dateString){
        if(!date) return;
        let inTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm'),
            outTime = this.state.data.fd_end_time.value;
        this.calcStayDays(inTime,outTime);
        let stateData = JSON.parse(JSON.stringify(this.state.data));
        stateData.fd_start_time.value = inTime;
        this.setRootState(stateData);
    }
    changeOutTime(date,dateString){
        if(!date) return;
        var outTime = new Date(date._d || dateString).format('yyyy-MM-dd hh:mm'),
            inTime = this.state.data.fd_start_time.value;
        this.calcStayDays(inTime,outTime);
        let stateData = JSON.parse(JSON.stringify(this.state.data));
        stateData.fd_end_time.value = outTime;
        this.setRootState(stateData);
    }
    calcStayDays(inTime,outTime){
        if(!inTime || !outTime) return;
        var stayTime = new Date(outTime).getTime()-new Date(inTime).getTime(),
            stayDays = Math.floor(stayTime/1000/86400);
        let stateData = JSON.parse(JSON.stringify(this.state.data));
        stateData.fd_travel_days.value = stayDays;
        this.setRootState(stateData);
    }
    saveInputValue(dom){
        if(dom.type!=='hidden'){
            let data = JSON.parse(JSON.stringify(this.state.data)),
                name = dom.name,
                value = dom.value;
            data[name] = value;
            this.setRootState(data);
        }
    }
    submitForm(){
        if(!this.checkForm(true)) return;
        if(!this.state.isSubmit) return;
        this.context.router.push({
            pathname: '/businesstripCreate'
        });
    }
    render(){
        let data = this.state.data;
        return <form>
            <Row title="出差人" name="fd_traveller" readOnly="true" selectMore="true" isValid='true' link="/contact" value={data.fd_traveller.value || ''}></Row>
            <Row title="出差人手机号" name="fd_traveller_tel" type="number" isValid='true' placeholder="请填写(必填)" value={data.fd_traveller_tel.value || ''} onChange={this.checkTel.bind(this)} className={this.state.data.fd_traveller_tel.isCorrent ? '' : 'error'}></Row>
            <Row title="出差人部门" name="fd_traveller_dept" readOnly="true" isValid='true' placeholder=" " value={data.fd_traveller_dept.value || ''}></Row>
            <Row title="出差人职位" name="fd_traveller_post" readOnly="true" isValid='true' placeholder=" " value={data.fd_traveller_post.value || ''}></Row>
            <div className="noticebar"></div>
            <div className="row flex">
                <label>出差开始时间</label>
                <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_start_time.value ? moment(data.fd_start_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeInTime.bind(this)}/>
            </div>
            <div className="row flex">
                <label>出差结束时间</label>
                <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={data.fd_end_time.value ? moment(data.fd_end_time.value, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeOutTime.bind(this)}/>
            </div>
            <Row title="出差人天数(日)" name="fd_travel_days" type="number" readOnly="true" isValid='true' placeholder=" " value={data.fd_travel_days.value || ''}></Row>
            <div className="row flex">
                <label htmlFor="fd_reason">出差事由</label>
                <textarea id="fd_reason" name="fd_reason" className="meeting_content" placeholder="请输入出差事由(必填)" value={data.fd_reason.value || ''}></textarea>
            </div>
            <div className="row fixed bg-gray">
                <button type="button" className={"btn-submit grid-1 "+(this.state.isSubmit?"":"disabled")} onClick={this.submitForm.bind(this)}>确定</button>
            </div>
        </form>
    }
}
Page.propTypes = {
        data: PropTypes.object || null,
    };
export default Page;
