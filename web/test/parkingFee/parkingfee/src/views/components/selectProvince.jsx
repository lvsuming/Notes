import React from 'react';
import Selector from './selector.jsx';
import './selector.css';
class SelectProvince extends React.Component{
    static defaultProps = {
        isShowProvinceShort : ''
    };
    constructor(props) {
        super(props);
        this.state = {
            provinces : ['粤','京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','桂','琼','渝','川','黔','滇','藏','陕','甘','青','宁','新'],
            gridSelected : this.props.provinceShort,
            changeValue : this.props.changeProvinceShort,
            hideDialog : this.props.hideDialog
        }
    }

    hideDialog(){
        this.state.hideDialog();
    }

    render(){
        return(<div className={'dialog '+ this.props.isShowProvinceShort}>
                <div className="shade"></div>
                <div className="selector">
                    <p className="title align-center"><strong>选择省份</strong></p>
                    <Selector data={this.state.provinces} provinceShort={this.state.gridSelected} changeValue={this.state.changeValue}></Selector>
                    <p className="btn fl align-center" onClick={this.hideDialog.bind(this)}>关闭</p>
                </div>
            </div>
        );
    }
}
export default SelectProvince;
