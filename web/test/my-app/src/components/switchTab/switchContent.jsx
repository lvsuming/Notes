import React from 'react';
import PropTypes from 'prop-types';
class Module extends React.Component{
    static propTypes = {
        name: PropTypes.string,
        status: PropTypes.string,
        time: PropTypes.string
    };
    constructor(props){
        super(props);
    }
    render(){
        return <li className="row select_bg" data-fdid="">
                <span id="flew-name">{this.props.name}</span>
                <span id="flew-status" className="flew-status hasapprove">{this.props.status}</span>
                <span id="flew-time" className="fr" style={{marginRight: 1+'rem'}}>{this.props.time}</span>
            </li>
    }
}
export default Module;
