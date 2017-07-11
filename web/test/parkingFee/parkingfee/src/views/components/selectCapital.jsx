import React from 'react';
import Selector from './selector.jsx';
import './selector.css';
class SelectCapital extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            capitals : [],
            gridSelected : this.props.capital,
            changeValue : this.props.changeCapital,
            hideDialog : this.props.hideDialog
        }
    }
    hideDialog(){
        this.state.hideDialog();
    }
    componentWillMount(){
        let capitals = [];
        for(var i=65;i<91;i++){
            capitals.push(String.fromCharCode(i))
        }
        this.setState({
            capitals : capitals
        })
    }
    componentWillReceiveProps(){
        this.setState({
            isShow : this.props.isShowCapital
        })
    }
    render(){
        return(<div className={'dialog '+this.props.isShowCapital}>
                    <div className="shade"></div>
                    <div className="selector">
                        <p className="title align-center"><strong>选择字母</strong></p>
                        <Selector data={this.state.capitals} provinceShort={this.state.gridSelected} changeValue={this.state.changeValue}></Selector>
                        <p className="btn fl align-center" onClick={this.hideDialog.bind(this)}>关闭</p>
                    </div>
            </div>
        );
    }
}
export default SelectCapital;