import {History} from 'react-router';

let $ = function (e) {
    if(typeof(e)==='string' && e.indexOf(',')>-1){
        var arr = e.split(','),
            arrDom = [];
        [...arr].forEach(function (item,index) {
            var dom = document.querySelectorAll(item);
            if(dom.length>0) Array.prototype.push.apply(arrDom,dom);
        });
        return arrDom;
    }else{
        if(e instanceof HTMLElement) return e;
        return document.querySelectorAll(e) || document.querySelector(e)
    }
};
HTMLElement.prototype.hasClass = function (cls) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    return reg.test(this.className);
};
HTMLElement.prototype.addClass = function (cls) {
    if(this instanceof Array){
        for(var i=0,len=this.length;i<len;i++){
            if (!this[i].hasClass(cls)) this[i].className += " " + cls;
        }
    }else{
        if (!this.hasClass(cls)) this.className += " " + cls;
    }
};
HTMLElement.prototype.removeClass = function (cls) {
    if (this.hasClass(cls)) {
        var reg = new RegExp('(\\s|^)*' + cls + '(\\s|$)*','g');
        this.className = this.className.replace(reg, '');
    }
};
HTMLElement.prototype.closest = function (selector) {
    let el = this,
        matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
};

Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};


function getUrl() {
    var _getHost = window.location.protocol+ '//' + window.location.host,
        _baseUrl = _getHost;
    return {
        jsapiSignature : _baseUrl+'/',          //微信鉴权
        getCurUserInfo : _baseUrl+'/',          //当前用户信息
        getMytodoNum : _baseUrl+'/',            //首页我的待办数
        getMyprocessNum : _baseUrl+'/',         //首页我的流程数
        getSysOrgElement : _baseUrl+'/',        //获取组织架构
        saveBusinesstripCreate : _baseUrl+'/',  //出差申请-出差
        saveLeaveCreate : _baseUrl+'/', 		//新建请假
        getRemainderHoliday : _baseUrl+'/',		//请假剩余天数
        saveMeetingCreate : _baseUrl+'/',       //新建会议
        getMeetingType : _baseUrl+'/',          //获取会议类型
        getMeetingroomPosition : _baseUrl+'/',  //获取会议室地址
        getMyFlowList : './json/myFlowList.json' //我的流程列表(我发起的/待我审批/我已审批)
    }
}

var baseTool = function () {
    var _hash = function () {
        var hash = "";
        if(window.location.hash){
            var locationHash = window.location.hash;
            hash = locationHash.indexOf('?') > -1 ? locationHash.substr(locationHash.indexOf('?') + 1) : '';
        }else if(window.location.search){
            var locationSearch = window.location.search;
            hash = locationSearch.indexOf('?')>-1 ? locationSearch.substr(locationSearch.indexOf('?') + 1) : '';
        }
        return hash;
    },
    //获取url参数
    _getUrlParam = function (key) {
        var urlHash = baseTool().hash();
        if (key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = urlHash.match(reg);
            return r != null ? r[2] : null;
        } else {
            var url = /\?/.test(urlHash) ? urlHash.substr(urlHash.indexOf('?') + 1) : urlHash;
            var obj = {};
            url.split('&').forEach(function (item) {
                obj[item.split('=')[0]] = item.split('=')[1]
            });
            return obj;
        }
    },
    //设置url参数
    _setUrlParam = function (key, value, hash) {
        var urlHash = hash ? hash : baseTool().hash();
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = urlHash ? urlHash.match(reg) : '';
        if (r) {
            var arrHash = urlHash.split(key + '=' + r[2]);
            urlHash = arrHash[0] + key + '=' + value + arrHash[1];
        } else {
            urlHash = urlHash + (urlHash ? '&' : '') + key + '=' + value;
        }
        return urlHash;
    },
    _trim = function (str) {
        var newStr = str.replace(/(^\s*)|(\s*$)/g,'');
        return newStr;
    },
    _isEmptyObject = function (e) {
        var t;
        for (t in e)
            return !1;
        return !0
    },
    _serialize = function (selector) {
        var form = document.querySelector(selector);
        var arr = {};
        for (var i = 0; i < form.elements.length; i++) {
            var feled = form.elements[i];
            switch (feled.type) {
                case undefined:
                case 'button':
                case 'file':
                case 'reset':
                case 'submit':
                    break;
                case 'checkbox':
                case 'radio':
                    if (!feled.checked) break;
                    break;
                default:
                    if (arr[feled.name]) {
                        arr[feled.name] = arr[feled.name] + ',' + feled.value;
                    } else {
                        arr[feled.name] = feled.value;
                    }
                    break;
            }
        }
        return arr
    },
    _unSerialize = function (data) { //反序列化
        var a = {};
        data.split('&').forEach(function(param){
            param = param.split('=');
            var name = param[0],
                val = param[1];
            a[name] = val;
        });
        return a;
    },
    _clearHash = function (url) { //清空当前url参数
        url = url ? url : 'http://'+window.location.host+window.location.pathname;
        if ('pushState' in History) {
            var state = History.state;
            History.replaceState(state,'',url);
        }
    };
    return {
        hash: _hash,
        getUrlParam: _getUrlParam,
        setUrlParam: _setUrlParam,
        trim: _trim,
        isEmptyObject: _isEmptyObject,
        serialize: _serialize,
        unSerialize: _unSerialize,
        clearHash: _clearHash
    }
};

var base = baseTool();

export {base as default,$,getUrl};

