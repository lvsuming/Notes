import React from 'react';
import SwitchContent from './switchContent.jsx';
class TabsControl extends React.Component{

    constructor(){
        super();
        this.state={
            currentIndex : 0,
            module : this.name==='myFlow'?<SwitchContent currentIndex='0'/>:<SwitchContent currentIndex='0'/>,
            dataList : [{'name':'xxx','status':'待审','time':'2017-06-21'},{'name':'abc','status':'待审','time':'2017-06-22'}]
        };
    }

    check_tittle_index(index){
        return index===this.state.currentIndex ? " selected" : "";
    }

    check_item_index(index){
        return index===this.state.currentIndex ? "Tab_item" : "Tab_item hide";
    }

    componentWillMount = function() {
        this.getList();
    };

    getList(index){
        this.setState({
            'currentIndex' : index || 0,
            'dataList' : [{'name':'xxx'+index,'status':'待审','time':'2017-06-21'},{'name':'abc','status':'待审','time':'2017-06-22'},{'name':'ddd','status':'已审','time':'2017-06-20'}]
        })
    }

    render(){
        return(
            <div>
                {/*动态生成Tab导航*/}
                <ul id="switchTab" className="row clr">
                    { React.Children.map( this.props.children , (element,index) => {
                        return(
                            <li onClick={ () => { this.getList(index)} } key={index} className={'grid-3 align-center'+this.check_tittle_index(index) } name={element.props.name}>{ element.props.title }</li>
                        );
                    }) }
                </ul>
                {/*Tab内容区域*/}
                <section id="switchContent">
                    {React.Children.map(this.props.children,(element,index)=>{
                        return(
                            <article className={ this.check_item_index(index) }>
                                {/* element */}
                                {this.state.dataList.map(function(item,index){
                                    return (
                                        <SwitchContent currentIndex='0' key={index} name={item.name} status={item.status} time={item.time}/>
                                    )
                                })}
                            </article>
                        );
                    })}
                </section>
            </div>
        );
    }
}
export default TabsControl;