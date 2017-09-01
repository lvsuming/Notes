import React from 'react';
import { Form, Input, DatePicker, Affix, Upload, message, Icon, Switch  } from 'antd';
import moment from 'moment';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/dist/antd.css';
import './leaveApplication.css';

import { List, TextareaItem, WhiteSpace, Button } from 'antd-mobile';

import WingBlank from 'antd-mobile/lib/wing-blank';
import Picker from 'antd-mobile/lib/picker';
import InputItem from 'antd-mobile/lib/input-item';

import 'datetime-selector';

import UserInfo from '../../components/userInfo/userInfo';



//import { createStore } from 'redux';
//let aaa = 0;
//const store = createStore(function () {
//    return {'aaa': aaa++};
//});
//
//const state = store.getState();
//console.log(state);

//import Row from '../../components/base/row.jsx';

const FormItem = Form.Item;
const Item = List.Item;
let str = '测试';
class LeaveApplication extends React.Component{
    constructor(props){
        super();
        this.state = {
            leaveType : {
                value : '01',
                label : '病假'
            },
            startDate: '',
            endDate: '',
            leaveDays : 0,
            leaveReason : {},
            agentPerson : '',
            fileup : [],
            isSubmit : false
        }
    }
    changeInTime(){

    }
    changeOutTime(){

    }
    onChangeEmergency(){

    }
    onFileChange(fileList){
        let arr = [];
        fileList.fileList.forEach(function (item,index) {
            if(item.status && item.status==='done') arr.push(item);
            //else if(item.status && item.status==='removed')
        });
         this.setState({ 'fileup':arr });
    }
    handleSubmit(){

    }
    saveInputValue(){

    }
    render(){
        const leaveType = [];

        const fileList = [{
            uid: -1,
            name: '',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }, {
            uid: -2,
            name: '',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }];
        const props = {
            action: '/',
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        };

        return <div>
                <UserInfo></UserInfo>
                <Form onSubmit={this.handleSubmit}>
                    <List className="my-list" style={{marginBottom: 2.4+'rem'}}>
                        <div className="noticebar"></div>
                        <Picker extra="请选择(可选)" cols={1} data={leaveType} title="请假类型"
                                onChange={v => this.saveInputValue(v,'leaveType')} value={this.state.leaveType?[this.state.leaveType.value]:[]}>
                            <List.Item arrow="horizontal">请假类型</List.Item>
                        </Picker>
                        <Item arrow="horizontal">
                            开始时间
                            <DatePicker name="startDate" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={this.state.startDate ? moment(this.state.startDate, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeInTime.bind(this)} style={{float:'right',lineHeight:1.5}}/>
                        </Item>
                        <Item arrow="horizontal">
                            结束时间
                            <DatePicker name="endDate" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={this.state.endDate ? moment(this.state.endDate, 'YYYY-MM-DD HH:mm') : null} placeholder="请选择(必填)" onOk={this.changeOutTime.bind(this)} style={{float:'right',lineHeight:1.5}}/>
                        </Item>
                        <InputItem
                            name="leaveDays"
                            clear
                            type="number"
                            placeholder="请填写(必填)"
                            updatePlaceholder="true"
                            defaultValue={this.state.leaveDays}
                            onChange={this.saveInputValue.bind(this)}
                        >请假天数</InputItem>
                        <div className="noticebar"></div>
                        <TextareaItem
                            name="leaveReason"
                            title="请假原因"
                            placeholder="请填写(必填)"
                            autoHeight
                            focused="false"
                            rows="3"
                            onBlur={() => {
                                //this.setState({
                                //    leaveReason : {
                                //        value:this.state.leaveReason.value,
                                //    }
                                //});
                            }}
                        />
                        <InputItem
                            name="agentPerson"
                            clear
                            placeholder="请填写(必填)"
                            updatePlaceholder="true"
                            defaultValue={this.state.agentPerson}
                            onChange={this.saveInputValue.bind(this)}
                        >工作代理人</InputItem>
                        <div className={"row flex"}>
                            <div className="am-textarea-label">相关证明附件</div>
                            <Upload {...props} onChange={this.onFileChange.bind(this)} name="fileup" multiple={true} accept="image">
                                <Button style={{padding: "4px 0",lineHeight: 88+'px',width: 1+'rem', height: 'auto',textAlign: 'right', background: 'url(./images/icon-unload.png) no-repeat center #fff', fontSize: 34, border: 'none', color: 'transparent'}}>
                                    <Icon type="upload" />
                                </Button>
                            </Upload>
                        </div>
                        <div className={"row flex"}>
                            <div className="am-textarea-label" style={{color:'red',fontSize:.5+'rem',lineHeight:1+'rem',whiteSpace:'inherit',padding:'.5rem 0'}}>
                                温馨提示：1.5天及以上病假（全薪病假）、婚假、产假、陪产假、流产假需提供相关证明；<br/>已转正员工享有全薪病假，请病假时可优先选择全薪病假。
                            </div>
                        </div>
                        <div className="noticebar"></div>
                        <div className={"row flex"}>
                            <div className="am-textarea-label">是否紧急</div>
                            <div style={{padding: "4px 0",lineHeight: 88+'px',width: 1+'rem', height: 'auto', border: 'none'}}>
                                <Switch name="emergency" defaultChecked={false} onChange={this.onChangeEmergency} />
                            </div>
                        </div>

                    </List>
                    <Affix offsetBottom={10}>
                        <WingBlank size="lg">
                            {
                                this.state.isSubmit
                                    ? <Button className="btn" type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                                    : <Button className="btn" type="primary" disabled onClick={this.handleSubmit.bind(this)}>确定</Button>
                            }
                        </WingBlank>
                    </Affix>
                </Form>
            </div>
    }
}

const LeaveApplicationPage = Form.create()(LeaveApplication);

export default LeaveApplicationPage;