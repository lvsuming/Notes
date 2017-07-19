import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name || '',
            readOnly : this.props.readOnly&&this.props.readOnly!='false' ? this.props.readOnly : '',
            selectMore : this.props.selectMore&&this.props.selectMore!='false' ? ' select_bg' : ''
        }
    }
    static propTypes = {
        title: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        readOnly: PropTypes.boolean || PropTypes.string
    };
    componentDidMount(){
        if(this.state.readOnly){
            var dom = this.refs[this.state.name];
            dom.setAttribute('readOnly','readOnly');
        }
    }
    render(){
        return <div className="row flex">
            <span className={this.props.className || ''}>{this.props.title || ''}</span>
            <input type="hidden" name={this.props.name || ''}/>
            <input type={this.props.type || 'text'} className={"grid-2 align-right"+this.state.selectMore} id={this.props.name || ''} ref={this.props.name || ''} placeholder={this.props.placeholder || '请选择(必填)'}/>
        </div>
    }
}
export default Row;

