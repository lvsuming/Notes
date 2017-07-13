import React from 'react';
import 'whatwg-fetch';
import 'es6-promise';
let common = {};
common.getFetch = function(that) {
    var str = '';
    if (that.params && typeof that.params === 'object') {
        str += '?';
        Object.keys(that.params).forEach(function (val) {
            str += val + '=' + encodeURIComponent(that.params[val]) + '&';
        })
    }
    var obj = {
        method: 'GET'
    };
    if(that){
        if(that.headers) obj.headers = that.headers; //请求头部信息
        if(that.mode) obj.mode = that.mode; //"no-cors"(默认),"same-origin","cors"
        if(that.credentials) obj.credentials = that.credentials || ('cors' === that.mode ? 'include' : 'omit') //cookies是否能跨域得到:"omit"(默认),"same-origin","include"
    }
    fetch(that.url||'' + str, obj).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {
                that.successFunc(data);
            })
        } else if (res.status === 401) {
            console.log('请求失败');
            that.errorFunc();
        }
    }, function (e) {
        console.log('请求失败!');
        that.errorFunc();
    })
};
common.postFetch = function(that) {
    var formData = new FormData();
    for (let k in that.params) {
        formData.append(k, that.params[k]);
    }
    formData.append('oper_id', '11');
    formData.append('oper_name', 'kong');
    var obj = {
        method: 'POST',
        body: formData
    };
    if(that){
        if(that.headers) obj.headers = that.headers; //请求头部信息
        if(that.mode) obj.mode = that.mode; //"no-cors"(默认),"same-origin","cors"
        if(that.credentials) obj.credentials = that.credentials || ('cors' === that.mode ? 'include' : 'omit') //cookies是否能跨域得到:"omit"(默认),"same-origin","include"
    }
    fetch(that.url||'', obj).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {
                that.successFunc(data);
            })
        } else {
            console.log('请求失败');
            that.errorFunc();
        }
    }, function (e) {
        console.log('请求失败!');
        that.errorFunc();
    })
};
export default common;