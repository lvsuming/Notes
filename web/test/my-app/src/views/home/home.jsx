import React from 'react';
import Slide from '../../components/slide/slide.jsx';
import HomeBoard from '../../components/homeBoard/homeBoard.jsx';
import Menu from '../../components/menu/menu.jsx';
import HomeFlow from '../../components/homeFlow/homeFlow.jsx';
class IndexPage extends React.Component{
    render(){
        return <div>
            <Slide/>
            <HomeBoard/>
            <Menu/>
            <HomeFlow/>
                {this.props.children} {/*子模块*/}
        </div>
    }
}
export default IndexPage;