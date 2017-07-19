import {History} from 'react-router';
//重置meta
function resetViewport() {
    var headDom = document.getElementsByTagName('head')[0],
        phoneWidth = parseInt(window.screen.width,10)<375 ? parseInt(window.screen.width,10)*2 : 750,
        maximumScale = phoneWidth / 750,
        ua = navigator.userAgent;
    var dom = document.createElement('meta');
    dom.name = 'viewport';
    dom.content = 'width='+phoneWidth+',user-scalable=no,target-densitydpi=device-dpi';
    if (/Android (\\d+\.\d+)/.test(ua)) {
        var version = parseFloat(RegExp.$1);
        if (version > 2.3) {
            dom += ',minimum-scale='+maximumScale;
            dom += ',maximum-scale='+maximumScale;
        }
    }
    headDom.appendChild(dom);
}
resetViewport();

let $ = function (e) {
    return document.querySelector(e) || document.querySelectorAll(e)
};
HTMLElement.prototype.hasClass = function (cls) {
    return this.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
HTMLElement.prototype.addClass = function (cls) {
    if(this instanceof Array){
        for(var i=0,len=this.length;i<len;i++){
            if (!this.hasClass(this[i], cls)) this.className += " " + cls;
        }
    }else{
        if (!this.hasClass(this, cls)) this.className += " " + cls;
    }
};
HTMLElement.prototype.removeClass = function (cls) {
    if (this.hasClass(cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        this.className = this.className.replace(reg, ' ');
    }
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
    _serialize = function (form) {
        var form = document.querySelector(form);
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
                    if (!feled.checked) {
                        break;
                    }
                default:
                    if (arr[feled.name]) {
                        arr[feled.name] = arr[feled.name] + ',' + feled.value;
                    } else {
                        arr[feled.name] = feled.value;

                    }
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

