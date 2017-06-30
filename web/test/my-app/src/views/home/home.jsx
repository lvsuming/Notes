import React from 'react';
import Slide from '../../components/slide/slide.jsx';
import HomeBoard from '../../components/homeBoard/homeBoard.jsx';
import MenuModule from '../../components/menu/menu.jsx';
import HomeFlow from '../../components/homeFlow/homeFlow.jsx';
class IndexPage extends React.Component{
    render(){
        var str = '测试home';
        return <div>
            {str}
            <Slide/>
            <HomeBoard/>
            <div className="noticebar"></div>
            <MenuModule/>
            <div className="noticebar"></div>
            <HomeFlow/>
            {/*{this.props.children} 子模块*/}
        </div>
    }
}
export default IndexPage;