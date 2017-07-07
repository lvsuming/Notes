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
        var _this = this;
        var body = 'type=all&pagenum='+this.state.pagenum+'&rowsize='+this.state.rowsize;
        /*var para = {
            'type':'all',
            'pagenum':this.state.pagenum,
            'rowsize':this.state.rowsize
        };*/
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
        /*let formData = new FormData();
        formData.append('type', 'all');
        formData.append('pagenum', this.state.pagenum);
        formData.append('rowsize', this.state.rowsize);*/
        fetch( base.getUrl.getMyFlowList+'&'+body , {
            method : "GET",
            credentials: 'include'
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (resultData) {
                    if(resultData.data && resultData.data.length>0){
                        _this.setState(
                            {'dataList': resultData.data}
                        );
                    }
                });
            } else {
                console.error("Oops! You are not authorized.");
            }
        }, function (e) {
            console.error("Error submitting form!");
        });
    }
    componentDidMount(){
        this.getList();
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
