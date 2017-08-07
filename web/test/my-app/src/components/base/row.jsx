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
        }else{
            inputDom = <input type={this.props.type || 'text'} className={"grid-2 align-right"+this.state.selectMore} id={this.props.name || ''} ref={this.props.name} placeholder={this.props.placeholder || '请选择(必填)'} onClick={this.bindHandle.bind(this)} onChange={this.onChange.bind(this)}/>
        }
        return <div className="row flex">
            <label className={this.props.className || ''} htmlFor={this.props.name || ''}>{this.props.title || ''}</label>
            <input type="hidden" name={this.props.name || ''}/>
            {inputDom}
        </div>
    }
}
export default Row;

