import React from 'react';
import PropTypes from 'prop-types';
class Module extends React.Component{
    static propTypes = {
        name: PropTypes.string,
        status: PropTypes.string,
        time: PropTypes.string
    };
    constructor(props){
        super(props);
    }
    getList(){
        let arr = [{"fdId":"15ceda95d29687035871b014725aa09a","docSubject":"现金贷合同撤消-12873723001","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ceda95d29687035871b014725aa09a","fdCategoryName":"现金货合同撤销申请表","docStatus":"结束","docReadCount":0,"docCreatorName":"李烁"},{"fdId":"15ced9fc885fed637848659462696e97","docSubject":"合同撤销","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced9fc885fed637848659462696e97","fdCategoryName":"合同状态修改申请","docStatus":"结束","docReadCount":2,"docCreatorName":"欧阳思洁"},{"fdId":"15ced9b9c16fe183b3af4bd4e2a86f3a","docSubject":"出差申请","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced9b9c16fe183b3af4bd4e2a86f3a","fdCategoryName":"出差申请","docStatus":"待审","docReadCount":0,"docCreatorName":"夏兴平"},{"fdId":"15ced9aa089d1bddfea6b9740ffb37a4","docSubject":"现金贷合同撤消-12874055001","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced9aa089d1bddfea6b9740ffb37a4","fdCategoryName":"现金货合同撤销申请表","docStatus":"结束","docReadCount":1,"docCreatorName":"李烁"},{"fdId":"15ced917811c11be6d70fcf4b278ac1c","docSubject":"出差申请","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced917811c11be6d70fcf4b278ac1c","fdCategoryName":"出差申请","docStatus":"待审","docReadCount":0,"docCreatorName":"夏兴平"}];
    }
    render(){
        return <a href="{{$value.docLink}}">
                <li className="row" data-fdid="{{$value.fdId}}">
                    <p className="title">{this.props.docSubject}</p>
                    <p className="more gray-3">
                        <span className="tip border-red red">{this.props.fdCategoryName}</span>
                        <span className="time fr">{this.props.docCreateTime}</span>
                        <span className="view fr" style={{marginRight:1+'rem'}}>{this.props.docReadCount || 0}</span>
                    </p>
                </li>
            </a>
    }
}
export default Module;
