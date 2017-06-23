import React from 'react';
import {Router} from 'react-router';
import Slide from '../../components/slide/slide.jsx';
import HomeBoard from '../../components/homeBoard/homeBoard.jsx';
import Menu from '../../components/menu/menu.jsx';
import {Link,browserHistory,History} from 'react-router';
class IndexPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <Slide/>
            <HomeBoard/>
            <Menu/>
            <Link to="/hello">
                Hello
            </Link>
            {this.props.children} {/*子模块*/}
        </div>
    }
}
export default IndexPage;