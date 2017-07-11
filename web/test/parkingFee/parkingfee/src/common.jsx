import React from 'react';
let common = {};
common.getFetch = function(that) {
    if(!that) return;
    var str = '';
    if (that.params && typeof that.params === 'object') {
        str += '?';
        Object.keys(that.params).forEach(function (val) {
            str += val + '=' + encodeURIComponent(that.params[val]) + '&';
        })
    }
    fetch(that.url + str, {
        method: 'GET',
        mode: that.mode || 'no-cors', //"no-cors"(默认),"same-origin","cors"
        credentials: that.credentials || 'cors' === that.mode ? 'include' : 'omit' //cookies是否能跨域得到:"omit"(默认),"same-origin","include"
    }).then(function (res) {
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
    if(!that) return;
    var formData = new FormData();
    for (let k in that.params) {
        formData.append(k, that.params[k]);
    }
    formData.append('oper_id', '11');
    formData.append('oper_name', 'kong');
    fetch(that.url, {
        method: 'POST',
        body: formData,
        mode: that.mode || 'no-cors', //"no-cors"(默认),"same-origin","cors"
        credentials: that.credentials || 'cors' === that.mode ? 'include' : 'omit' //cookies是否能跨域得到:"omit"(默认),"same-origin","include"
    }).then(function (res) {
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