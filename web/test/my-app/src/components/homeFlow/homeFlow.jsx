import React from 'react';
import PropTypes from 'prop-types';
import HomeFlowItem from './homeFlowItem.jsx';
import base from '../base';
//import 'whatwg-fetch';
//import 'es6-promise';
class Module extends React.Component{
    static propTypes = {
        docSubject: PropTypes.string,
        fdCategoryName: PropTypes.string,
        docCreateTime: PropTypes.string,
        docReadCount: PropTypes.number || PropTypes.string
    };
    constructor(props){
        super(props);
        this.state={
            'dataList':[],
            hasLoadData : false,
            pagenum : 1,
            rowsize : 5
        }
    }
    getList(){
        this.setState(
            {'dataList':[{"fdId":"15ceda95d29687035871b014725aa09a","docSubject":"现金贷合同撤消-12873723001","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ceda95d29687035871b014725aa09a","fdCategoryName":"现金货合同撤销申请表","docStatus":"结束","docReadCount":0,"docCreatorName":"李烁"},{"fdId":"15ced9fc885fed637848659462696e97","docSubject":"合同撤销","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced9fc885fed637848659462696e97","fdCategoryName":"合同状态修改申请","docStatus":"结束","docReadCount":2,"docCreatorName":"欧阳思洁"},{"fdId":"15ced9b9c16fe183b3af4bd4e2a86f3a","docSubject":"出差申请","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced9b9c16fe183b3af4bd4e2a86f3a","fdCategoryName":"出差申请","docStatus":"待审","docReadCount":0,"docCreatorName":"夏兴平"},{"fdId":"15ced9aa089d1bddfea6b9740ffb37a4","docSubject":"现金贷合同撤消-12874055001","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced9aa089d1bddfea6b9740ffb37a4","fdCategoryName":"现金货合同撤销申请表","docStatus":"结束","docReadCount":1,"docCreatorName":"李烁"},{"fdId":"15ced917811c11be6d70fcf4b278ac1c","docSubject":"出差申请","docCreateTime":"2017-06-28","docLink":"/km/review/km_review_main/kmReviewMain.do?method=view&fdId=15ced917811c11be6d70fcf4b278ac1c","fdCategoryName":"出差申请","docStatus":"待审","docReadCount":0,"docCreatorName":"夏兴平"}]
        });
        //var body = 'type=all&pagenum='+this.state.pagenum+'&rowsize='+this.state.rowsize;
        var para = {
            'type':'all',
            'pagenum':this.state.pagenum,
            'rowsize':this.state.rowsize
        };
        /*var response = new Response(
            JSON.stringify(para),
            {status: 200}
        );*/

        /*var req = new Request(base.getUrl.getMyFlowList, {method: 'GET', body:body});
        fetch(req).then(function(response) {
            console.log(response.json());
        }).then(function(json) {
            console.log(json);
        });*/
        fetch( base.getUrl.getMyFlowList , {
            method : "GET",
            body : para
        }).then(function (res) {
            if (res.ok) {
                alert("Perfect! Your settings are saved.");
            } else if (res.status === 401) {
                alert("Oops! You are not authorized.");
            }
        }, function (e) {
            alert("Error submitting form!");
        });


    }
    componentDidMount(){
        this.getList()
    };
    render(){
        return (<ul className="home-news bg-white clr">
            {this.state.dataList.map((element,index)=>{
                return(
                    <HomeFlowItem key={index} data={element}/>
                )
            })}
        </ul>)
    }
}
export default Module;
