"use strict";

//重置页面
resetViewport();

var getUrl = function() {
    var	_getHost = window.location.protocol+ '//' + window.location.host + (window.location.hostname=='yun.szcaremore.com') ? '/ekp' : '',
        _baseUrl = (window.location.hostname=='yun.szcaremore.com') ? _getHost+'/bilf/mobile' : '/bilf/mobile',
        _jsapiSignature = _baseUrl+'/bilf_mobile_doc/bilfMobileDoc.do?method=jsapiSignature',                           //微信鉴权
        _getCurUserInfo = _baseUrl+'/person/bilf_mobile_person/bilfMobilePerson.do?method=getCurUserInfo',              //当前用户信息
        _getMytodoNum = _baseUrl+'/notify/bilf_mobile_notify/bilfMobileNotify.do?method=getNotifyNum',                  //首页我的待办数
        _getMyprocessNum = _baseUrl+'/bilf_mobile_doc/bilfMobileDoc.do?method=getDocNum',                               //首页我的流程数
        _getSysOrgElement = _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=getSysOrgElement',    //获取组织架构
        _saveBusinesstripCreate = _baseUrl+'/travel/bilf_mobile_travel/bilfMobileTravel.do?method=save',                //出差申请-出差
        _saveBusinesstripCreate = _baseUrl+'/travel/bilf_mobile_travel/bilfMobileTravel.do?method=save',				//出差申请-出差
        _saveLeaveCreate = _baseUrl+'/leave/bilf_mobile_leave/bilfMobileLeave.do?method=save', 							//新建请假
        _getRemainderHoliday = _baseUrl+'/leave/bilf_mobile_leave/bilfMobileLeave.do?method=getRemainderHoliday',		//请假剩余天数
        _saveMeetingCreate = _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=save',               //新建会议
        _getMeetingType = _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=getMeetingCategory',   //获取会议类型
        _getMeetingroomPosition = _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=getMeetingFloorAndMeetingName', //获取会议室地址
        _getMyFlowList = _baseUrl+'/bilf_mobile_doc/bilfMobileDoc.do?method=getMyFlow';                                 //我的流程列表(我发起的/待我审批/我已审批)
    return {
        getHost: _getHost,
        jsapiSignature: _jsapiSignature,
        getCurUserInfo: _getCurUserInfo,
        getMytodoNum: _getMytodoNum,
        getMyprocessNum: _getMyprocessNum,
        getSysOrgElement: _getSysOrgElement,
        saveBusinesstripCreate: _saveBusinesstripCreate,
        saveMeetingCreate: _saveMeetingCreate,
        getMeetingType: _getMeetingType,
        getMeetingroomPosition: _getMeetingroomPosition,
        getMyFlowList: _getMyFlowList,
        saveLeaveCreate: _saveLeaveCreate,
        getRemainderHoliday: _getRemainderHoliday

    }
};

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
            url = url ? url : window.location.pathname.replace('/ekp/bilf/mobile/html/','./').replace('/html/','./');
            if ('pushState' in history) {
                var state = history.state;
                history.replaceState(state,'',url);
            }
        };
    return {
        hash: _hash,
        getUrlParam: _getUrlParam,
        setUrlParam: _setUrlParam,
        trim: _trim,
        isEmptyObject: _isEmptyObject,
        unSerialize: _unSerialize,
        clearHash: _clearHash
    }
};

//重置meta
function resetViewport() {
    var headDom = document.getElementsByTagName('head')[0],
        phoneWidth = parseInt(window.screen.width)<375 ? parseInt(window.screen.width)*2 : 750,
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
//记录页面路径
(function addReferrer(){
    var currentHref = window.location.href,
        a = window.location.href.indexOf("html/")+5,
        b = window.location.href.indexOf(".html"),
        href_localhost = currentHref.substring(a,b) || "",
        href_current = localStorage.getItem("href_current") || "",
        href_rferrer = localStorage.getItem("href_rferrer") || "";
    if(href_current != href_localhost){
        localStorage.setItem("href_rferrer",href_current);  //上一页
        localStorage.setItem("href_current",href_localhost); //当前页
    }
    window.onbeforeunload = function(){
        localStorage.setItem('href_fresh',href_localhost);  //当前页，如果与href_current一致，则为刷新
    };
})();