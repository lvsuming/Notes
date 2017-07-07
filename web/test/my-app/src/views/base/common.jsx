/**
 * Created by v-lvsm01 on 2017/7/7.
 */
import React from 'react';
class Fetch extends React.Component{
    constructor(url, params, successFunc, errorFunc, mode, credentials){
        super();
        this.state = {
            url : super()._URL + url,
            params : params,
            successFunc : successFunc,
            errorFunc : errorFunc,
            mode : mode,
            credentials : credentials
        }
    }

    getFetch(){
        var that = this;
        var str = '';
        if(typeof that.params === 'object' && that.params){
            str += '?';
            Object.keys(that.params).forEach(function(val){
                str += val + '=' + encodeURIComponent(that.params[val]) + '&';
            })
        }
        fetch(this.url + str, {
            method : 'GET',
            mode : that.mode || 'no-cors', //"no-cors"(默认),"same-origin","cors"
            credentials : that.credentials || 'cors'===that.mode?'include':'omit' //cookies是否能跨域得到:"omit"(默认),"same-origin","include"
        }).then(function(res){
            if(res.ok){
                res.json().then(function(data){
                    that.successFunc(data);
                })
            }else if(res.status === 401){
                console.log('请求失败');
                that.errorFunc();
            }
        }, function(e){
            console.log('请求失败!');
            that.errorFunc();
        })
    }

    postFetch(){
        var that = this;
        var formData = new FormData();
        for(let k in that.params){
            formData.append(k, that.params[k]);
        }
        formData.append('oper_id', '11');
        formData.append('oper_name', 'kong');
        fetch(this.url, {
            method : 'POST',
            body : formData,
            mode : that.mode || 'no-cors', //"no-cors"(默认),"same-origin","cors"
            credentials : that.credentials || 'cors'===that.mode?'include':'omit' //cookies是否能跨域得到:"omit"(默认),"same-origin","include"
        }).then(function(res){
            if(res.ok){
                res.json().then(function(data){
                    that.successFunc(data);
                })
            }else{
                console.log('请求失败');
                that.errorFunc();
            }
        }, function(e){
            console.log('请求失败!');
            that.errorFunc();
        })
    }
}
export default Fetch;