import React from 'react';
import ReactDom from 'react-dom';
import {history,hashHistory} from 'react-router';
import PropTypes from 'prop-types';
import Contact from '../../views/contact/contact.jsx';
class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name || '',
            readOnly : this.props.readOnly&&this.props.readOnly!='false' ? this.props.readOnly : '',
            selectMore : this.props.selectMore&&this.props.selectMore!='false' ? ' select_bg' : '',
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
        if(this.state.readOnly){
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
    onChange(){
        var onChangeFun = this.props.onChange;
        if(onChangeFun) onChangeFun(this.refs);
    }
    render(){
        return <div className="row flex">
            <span className={this.props.className || ''}>{this.props.title || ''}</span>
            <input type="hidden" name={this.props.name || ''}/>
            <input type={this.props.type || 'text'} className={"grid-2 align-right"+this.state.selectMore} id={this.props.name || ''} ref={this.props.name} placeholder={this.props.placeholder || '请选择(必填)'} onClick={this.bindHandle.bind(this)} onChange={this.onChange.bind(this)}/>
        </div>
    }
}
export default Row;

