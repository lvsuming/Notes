import React from 'react';
import PropTypes from 'prop-types';
import './homeFlow.css';
class Module extends React.Component{
    static propTypes = {
        name: PropTypes.string,
        status: PropTypes.string,
        time: PropTypes.string
    };
    render(){
        return <a href={this.props.data.docLink}>
                <li className="row" data-fdid={this.props.data.fdId}>
                    <p className="title">{this.props.data.docSubject}</p>
                    <p className="more gray-3">
                        <span className="tip border-red red">{this.props.data.fdCategoryName}</span>
                        <span className="time fr">{this.props.data.docCreateTime}</span>
                        <span className="view fr" style={{marginRight:1+'rem'}}>{this.props.data.docReadCount || 0}</span>
                    </p>
                </li>
            </a>
    }
}
export default Module;
