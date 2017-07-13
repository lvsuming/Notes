import React from 'react';
import base from '../base';
import common from '../common';
import PropTypes from 'prop-types';
import HomeFlowItem from './homeFlowItem.jsx';
//import myFlowListJSON from '../json/myFlowList.json'; ///public
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
        /*
        var body = 'type=all&pagenum='+this.state.pagenum+'&rowsize='+this.state.rowsize;
        var headers = new Headers();
        var url = base.getUrl.getMyFlowList;
        headers.append('Content-Type', 'application/json');
        fetch( url+'&'+body, {
            method : "GET",
            //credentials: 'include'
            headers : headers
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
        */
        //_this.setState(
        //    {'dataList': myFlowListJSON}
        //);
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
