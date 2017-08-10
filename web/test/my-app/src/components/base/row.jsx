import React from 'react';
import {hashHistory} from 'react-router';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name || '',
            readOnly : this.props.readOnly&&this.props.readOnly!=='false' ? this.props.readOnly : '',
            selectMore : this.props.selectMore&&this.props.selectMore!=='false' ? ' select_bg' : '',
            link : this.props.link
        }
    }
    static propTypes = {
        title: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        readOnly: PropTypes.boolean || PropTypes.string
    };
    componentDidMount(){
        var dom = this.refs[this.state.name];
        if(this.state.readOnly && dom){
            dom.setAttribute('readOnly','readOnly');
        }
    }
    openNewPage(link){
        hashHistory.push({
            pathname: link,
            query: {
                title:this.props.title
            },
        })
    }
    bindHandle(){
        let link = this.props.link;
        if(link){
            this.openNewPage(link);
        }
    }
    onChange(e,...param){
        var target = e.target,onChangeFun = this.props.onChange,
            para = '';
        for (let el of param) {
            if(typeof(el)==='string'){
                para = el;
            }
        }
        if(onChangeFun) onChangeFun(target,para);
    }
    render(){
        var inputDom;
        if(this.props.type==='datetime'){
            inputDom = <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={this.onChange.bind(this)} placeholder="请选择(必填)"/>
        }else if(this.props.type==='date'){
            inputDom = <DatePicker format="YYYY-MM-DD" onChange={this.onChange.bind(this)} placeholder="请选择(必填)"/>
        }else if(this.props.selectMore){
            inputDom = <div style={{width:'100%'}}>
                <input type="hidden" name={this.props.name || ''} value={this.props.value ? (this.props.value.id || this.props.value.fdId) : ''} onChange={this.onChange.bind(this)}/>
                <input type={this.props.type || 'text'} id={this.props.name+(this.props['data-num'] || '')} value={this.props.value ? (this.props.value.value||this.props.value.fdName) : ''} className={"grid-2 align-right"+this.state.selectMore} placeholder={this.props.placeholder || '请选择(必填)'} onClick={this.bindHandle.bind(this)} onChange={this.onChange.bind(this)}/>
            </div>
        }else{
            inputDom = <input type={this.props.type || 'text'} value={this.props.value || ''} className={"grid-2 align-right"+this.state.selectMore} name={this.props.name || ''} id={this.props.name+(this.props['data-num'] || '')} placeholder={this.props.placeholder || '请选择(必填)'} onClick={this.bindHandle.bind(this)} onChange={this.onChange.bind(this)}/>
        }
        return <div className={"row flex "+(this.props.isValid?'':'hide')}>
            <label className={this.props.className || ''} htmlFor={this.props.name || ''}>{this.props.title || ''}</label>
            {inputDom}
        </div>
    }
}
export default Row;

