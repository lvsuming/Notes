import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import SelectProvince from '../components/selectProvince.jsx';
import SelectCapital from '../components/selectCapital.jsx';
//import Using ES6 syntax
import WeUI from 'react-weui';
//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../index.css';

const {Button,
    Input,
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter,
    Dialog
} = WeUI;

class SelectCar extends React.Component{
    static defaultProps = { // as static property
        carNo: PropTypes.string & PropTypes.required
    };
    static defaultProps = { // as static property
        carNo: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            provinceShort : '粤',
            capital : 'B',
            carNo : '',
            parkName : '测试停车场' || '',
            isShowProvinceShort : 'hide',
            isShowCapital : 'hide',
            dialog:{
                'button' : [
                    {
                        label: '确定',
                        onClick: this.hideDialog.bind(this)
                    }
                ]
            },
            dialogContent : '',
            isShowDialog : false
        };
        this.showSelectProvince = this.showSelectProvince.bind(this);
        this.showCapital = this.showCapital.bind(this);
    }
    showSelectProvince(){
        this.setState({
            isShowCapital : 'hide',
            isShowProvinceShort : ''
        })
    }
    showCapital(){
        this.setState({
            isShowProvinceShort : 'hide',
            isShowCapital : ''
        })
    }
    changeProvinceShort(e){
        this.setState({
            provinceShort : e || ''
        })
    }
    changeCapital(e){
        this.setState({
            capital : e || ''
        })
    }
    hideDialog(e){
        this.setState({
            isShowProvinceShort: 'hide',
            isShowCapital: 'hide'
        })
    }
    saveCarNo(e){
        this.setState({
            carNo : e.target.value || ''
        })
    }
    submitFun(){
        if(!this.state.carNo){
            this.setState({
                isShowDialog : true,
                dialogContent: '请先填写车牌号码'
            });
            return;
        }else if(!this.carNoChecker()){
            this.setState({
                isShowDialog : true,
                dialogContent : '请填写正确的车牌号码'
            });
            return;
        }
        var parkName = this.state.parkName || '',
            str = this.state.provinceShort + this.state.capital + this.state.carNo;
        window.location.href = '#confirmPay?parkName='+encodeURIComponent(parkName)+'&carNo='+encodeURIComponent(str);
    }
    hideDialog() {
        this.setState({
            isShowDialog: false,
        })
    }
    carNoChecker(){
        var reg = /[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/,
            carNo = this.state.carNo;
        return reg.test(carNo)
    }
    render(){
        return(<div>
                    <CellsTitle>停车场</CellsTitle>
                    <Cells>
                        <Cell href="javascript:;" access>
                            <CellBody>
                                {this.state.parkName}
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                    <CellsTitle></CellsTitle>
                    <Cells>
                        <Cell>
                            <CellBody className="border-right margin-right weui-cell__fb provinceShort" onClick={this.showSelectProvince.bind(this)}>
                                {this.state.provinceShort}
                            </CellBody>
                            <CellBody className="border-right margin-right weui-cell__fb capital" onClick={this.showCapital.bind(this)}>
                                {this.state.capital}
                            </CellBody>
                            <CellFooter style={{'width':'60%'}}>
                                <Input type="text" placeholder="请输入车牌号码" defaultValue={this.state.carNo} onChange={this.saveCarNo.bind(this)}/>
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <CellsTitle>&nbsp;</CellsTitle>
                    <div className="page_bd">
                        <Button onClick={this.submitFun.bind(this)}>确定</Button>
                    </div>
                    <SelectProvince provinceShort={this.state.provinceShort} changeProvinceShort={this.changeProvinceShort.bind(this)} hideDialog={this.hideDialog.bind(this)} isShowProvinceShort={this.state.isShowProvinceShort}></SelectProvince>
                    <SelectCapital provinceShort={this.state.capital} changeCapital={this.changeCapital.bind(this)} hideDialog={this.hideDialog.bind(this)} isShowCapital={this.state.isShowCapital}></SelectCapital>
                    <Dialog title='' buttons={this.state.dialog.button} show={this.state.isShowDialog}>
                        {this.state.dialogContent}
                    </Dialog>
                </div>
        );
    }
}
export default SelectCar;