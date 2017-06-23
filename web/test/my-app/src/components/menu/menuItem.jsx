import React from 'react';
import {Link,browserHistory,History} from 'react-router';
class menuItem extends React.Component{
    render(){
        return <div><Link to="{this.props.link}" >
            <li className="grid-3 fl home-menu-leave">{this.props.name}</li>
        </Link></div>
    }
}
export default menuItem;