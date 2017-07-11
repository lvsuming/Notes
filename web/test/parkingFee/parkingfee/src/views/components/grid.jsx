import React from 'react';
import PropTypes from 'prop-types';
class Module extends React.Component{
    static propTypes = {
        name: PropTypes.string,
        status: PropTypes.string,
        time: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            gridSelected : this.props.gridSelected || '',
            isSelected : '',
            changeValue : this.props.changeValue
        }
    }
    switchSelected(e){
        this.setState({
            gridSelected : e.target.innerText
        });
        e.target.parentNode.querySelectorAll('li').forEach(function (item,index) {
            item.className = '';
        });
        e.target.className = 'selected';
        let changeValue = this.state.changeValue;
        changeValue(e.target.innerText);
    }
    componentWillMount (){
        if(this.props.data === this.state.gridSelected){
            this.setState({
                isSelected : 'selected'
            })
        }
    };
    render(){
        return <li onClick={this.switchSelected.bind(this)} className={this.state.isSelected}>
                {this.props.data}
            </li>
    }
}
export default Module;
