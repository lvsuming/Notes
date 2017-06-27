import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
class menuItem extends React.Component{
    static propTypes = {
        name: PropTypes.string
    };
    render(){
        let sClassName ="grid-3 fl home-menu-"+this.props.moduleName;
        return <Link to={this.props.link} >
            <li className={sClassName}>{this.props.name}</li>
        </Link>
    }
}
export default menuItem;