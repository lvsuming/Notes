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
    componentDidMount(){
        var refs = this.props['data-num'] ? this.state.name+this.props['data-num'] : this.state.name,
            dom = this.refs[refs],
            readOnly = this.state.readOnly;
        if(readOnly){
            dom.setAttribute('readOnly','');
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
            inputDom = <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" defaultValue={moment(this.props.value, 'YYYY-MM-DD HH:mm')} className={this.props.className || ''} onChange={this.onChange.bind(this)} placeholder="请选择(必填)"/>
        }else if(this.props.type==='date'){
            inputDom = <DatePicker format="YYYY-MM-DD" defaultValue={moment(this.props.value, 'YYYY-MM-DD')} className={this.props.className || ''} onChange={this.onChange.bind(this)} placeholder="请选择(必填)"/>
        }else if(this.props.selectMore){
            inputDom = <input type={this.props.type || 'text'} id={this.props.name+(this.props['data-num'] || '')} ref={this.props.name+(this.props['data-num'] || '')} name={this.props.name || ''} value={this.props.value ? (typeof(this.props.value)==='string'?this.props.value:(this.props.value.value||this.props.value.fdName)) : ''} className={"grid-2 align-right "+this.state.selectMore+' '+this.props.className} placeholder={this.props.placeholder || '请选择(必填)'} onClick={this.bindHandle.bind(this)} onChange={this.onChange.bind(this)}/>
        }else{
            inputDom = <input type={this.props.type || 'text'} id={this.props.name+(this.props['data-num'] || '')} ref={this.props.name+(this.props['data-num'] || '')} name={this.props.name || ''} value={this.props.value || ''} className={"grid-2 align-right "+this.state.selectMore+' '+this.props.className} placeholder={this.props.placeholder || '请选择(必填)'} onClick={this.bindHandle.bind(this)} onChange={this.onChange.bind(this)}/>
        }
        return <div className={"row flex "+(this.props.isValid?'':'hide')}>
            <label htmlFor={this.props.name || ''}>{this.props.title || ''}</label>
            {inputDom}
        </div>
    }
}
Row.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.boolean || PropTypes.string
};
export default Row;

