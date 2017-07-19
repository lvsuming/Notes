import React from 'react';
import 'whatwg-fetch';
import 'es6-promise';
import base,{$,getUrl} from './base';
import mobileSelect from './mobileSelector/js/mobileSelect';
import './mobileSelector/css/mobileSelect.css';
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
common.commonFun = (function () {
    //select选择器
    var MobileSelectObj;
    var _mobileSelect = function(para){
            if(!para.updateWheel) {
                MobileSelectObj = new mobileSelect({
                    trigger: '#' + para.trigger,
                    title: para.title,
                    wheels: [{
                        data: para.dataArr
                    }],
                    position: para.position || [0,0], //打开时默认选中哪个  如果不填默认为0
                    transitionEnd: function (indexArr, data) {
                        if (para.transitionEnd) para.transitionEnd(indexArr, data);
                    },
                    callback: function (indexArr, data) {
                        var resultData = data[data.length - 1],
                            triggerIdDom = document.getElementById(para.trigger),
                            triggerInputDom = document.querySelector('input[name=' + para.trigger + ']');
                        if (typeof(resultData) === 'object') {
                            if (triggerIdDom) triggerIdDom.value = resultData.value || resultData.fdName || '';
                            if (triggerInputDom) triggerInputDom.value = resultData.id || resultData.fdId || '';
                        } else if (typeof(resultData) === 'string' || typeof(resultData) === 'number' || typeof(resultData) === 'boolean') {
                            if (triggerIdDom) triggerIdDom.value = resultData;
                            if (triggerInputDom) triggerInputDom.value = resultData;
                        }
                        if (para.callback) para.callback(indexArr, data);
                    }
                });
            }else if(para.updateWheel){
                MobileSelectObj.updateWheel(para.updateWheel[0],para.updateWheel[1]);
                return;
            }
        },
        //time选择器
        _dateTimePicker = function (dom,timeType,callback,defaultData) {
            var currYear = (new Date()).getFullYear();
            var opt = {};
            opt.date = {
                preset: 'date'
            };
            opt.datetime = {
                preset: 'datetime'
            };
            opt.time = {
                preset: 'time'
            };
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: 2017, //开始年份
                endYear: currYear+1, //结束年份
                stepMinute: defaultData&&defaultData.stepMinute ? defaultData.stepMinute :1,
                onSelect:function(valueText,inst){
                    if(callback) callback(valueText,inst);
                }
            };
            var optDateTime = $.extend(opt['datetime'], opt['default']);
            var optTime = $.extend(opt['time'], opt['default']);
            //timeType对应：date-->日期，time-->时间，'datatime'或''-->日期时间
            if(timeType === 'date'){
                $(dom).mobiscroll($.extend(opt['date'], opt['default']));
            }else if(timeType === 'time'){
                $(dom).mobiscroll(optTime).time(optTime);
            }else{
                $(dom).mobiscroll(optDateTime).datetime(optDateTime);
            }
        },
        _ajaxFun = function (para) {
            var preAjaxUrl;
            if(preAjaxUrl === para.url){ //防止重复请求
                return;
            }
            /*var $ajax = $.ajax({
                type: para.type,
                url: para.url,
                dataType: "json",
                data: para.data,
                timeout: 10000,
                async: para.async,
                cache : para.cache ? para.cache : false,
                error: function (errorData) {
                    para.errorFun ? para.errorFun(errorData) : function () {
                        _poptip('返回失败，请重试');
                    };
                },
                success: function (successData) {
                    if(!successData.success){
                        _poptip('请求失败，请重试');
                        return;
                    }
                    if (successData.errorCode === 0 && successData.data) {
                        var resultData = typeof(successData.data)==='string' ? JSON.parse(successData.data) : successData.data;
                        para.successFun ? para.successFun(resultData) : function () {
                            _poptip('操作成功');
                        }
                    } else if (successData.code===999) {
                        _poptip('操作失败，请重试');
                    } else {
                        _poptip(successData.code);
                    }
                },
                complete: function (XMLHttpRequest, status) {
                    preAjaxUrl = para.url;
                    if (status === 'timeout') {
                        $ajax.abort(); //取消请求
                        _poptip('请求超时，请重试');
                    }
                    if(para.completeFun) para.completeFun();
                }
            });
            return $ajax;*/
        },
        _loadMoreData = function (callback) {
            $(window).bind('scroll',function () {
                var scrollTop = $(window).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(window).height();
                if ((scrollTop + windowHeight + 1 >= scrollHeight) && callback) {
                    callback();
                }
            });
        },
        _returnTopHandler = function () {
            $(window).bind('scroll',function () {
                var scrollTop = $(document).scrollTop(),
                    scrollTopDom = $('.returntop');
                if (scrollTop > 100 && scrollTopDom) {
                    scrollTopDom.removeClass('hide').bind('click', function () {
                        window.scrollTo(0, 0);
                        scrollTopDom.addClass('hide').unbind('click')
                    });
                } else if (scrollTopDom) {
                    scrollTopDom.addClass('hide').unbind('click');
                }
            })
        },
        //tap切换
        _switchTab = function(selectedTag, targetTag, switchClass, isRadio, callback){
            $(selectedTag).on('click',targetTag,function(e){
                var $targetDom = targetTag?$(selectedTag).find(targetTag):$(selectedTag);
                if(!$targetDom || $targetDom.length===0){
                    return;
                }else if($targetDom.length===1 && $targetDom.hasClass('disabled')){
                    return;
                }else{
                    var that = $(e.target);
                    if(that.hasClass('disabled')){
                        return;
                    }else if(!isRadio && that.hasClass("selected")){
                        that.removeClass("selected");
                    }else if(!that.hasClass("selected")){
                        that.addClass("selected").siblings().removeClass("selected");
                    }
                    if(switchClass){
                        var index = that.index();
                        $(selectedTag).eq(index).removeClass("hide").siblings(switchClass).addClass("hide");
                    }
                    if(callback){
                        callback();
                    }
                }
            });
        },
        _listenReturnBtn = function (callback) {
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function () {
                    window.history.pushState('forward', null, '#');
                    window.history.forward(1);
                    if(callback){
                        callback();
                    }
                });
            }
            //window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
            //window.history.forward(1);
        },
        _checkFun = {
            isPhone : function (number) {
                var reg = /^(1[3|4|5|7|8]\d{9}|\-|\(\)\+)+$/,
                    flag = true;
                if(!reg.test(number)){
                    flag = false;
                }
                return flag;
            },
            isInteger : function (number) {
                var flag = true;
                if(!/^0|([1-9]\d*)$/.test(number)){
                    flag = false;
                }
                return flag;
            },
            isPrice : function (number) {
                var flag = true;
                if(!/^(0|(0|[1-9]\d*).{0,1}\d{0,2})$/.test(number)){
                    flag = false;
                }
                return flag;
            },
            isCardID: function (str) {
                var reg = /^[1-9]\d{5}((19|20)[0-9]{2})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                return reg.test(str);
            },
            isChinese: function (str) {
                var reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
                    flag = true;
                if(!reg.test(str)){
                    flag = false;
                }
                return flag;
            }
        },
        _poptip = function(content,confirmBtnName,cancelBtnName,timeOut,callback) {
            if(!document.getElementById('poptip')){
                var poptip = document.createElement("div");
                poptip.setAttribute('id','poptip');
                document.getElementsByTagName("body")[0].appendChild(poptip);
            }
            var hideCancel = cancelBtnName ? '' : ' hide',
                hideConfirm = confirmBtnName ? '' : ' hide';
            var source =   '<div class="pop">' +
                '<div class="content">content || ""</div>' +
                '<div class="btn btn-cancel'+hideCancel+'">cancelBtn || ""</div>' +
                '<div class="btn btn-confirm'+hideConfirm+'">confirmBtn || ""</div>' +
                '</div>'+
                '<div class="mask"></div>';
            poptip = document.getElementById('poptip');
            poptip.innerHTML = source;
            var hidePoptip = function () {
                var poptip = document.getElementById('poptip'),
                    content = document.getElementsByClassName('content')[0];
                poptip.innerHTML = '';
            };

            document.getElementsByClassName('btn-cancel')[0].onclick = hidePoptip;
            if(callback) document.getElementsByClassName('btn-confirm')[0].onclick = function(){hidePoptip();callback()};
            document.getElementsByClassName('mask')[0].onclick = hidePoptip;
            if((!cancelBtnName && !confirmBtnName) || timeOut){
                setTimeout(hidePoptip,(timeOut || 2000));
            }
        },
        _getCurUserInfo = function (personId,callback) {
            var curUserInfo = localStorage.getItem('curUserInfo') ? JSON.parse(localStorage.getItem('curUserInfo')) : {},
                isHomePage = window.location.href.indexOf('home.jsp')>-1;
            if(personId || base.isEmptyObject(curUserInfo) || (new Date().getTime() - curUserInfo.timestamp)>3600000 || isHomePage){
                var para = {
                    'type': 'get',
                    'url': getUrl.getCurUserInfo,
                    'data': {
                        'imgSize': '',
                        'personId':personId || ''
                    },
                    'async': false,
                    successFun: function (resultData) {
                        if(personId && callback){
                            callback(resultData || {});
                        }else if(!personId){
                            curUserInfo =  resultData;
                            curUserInfo.timestamp = new Date().getTime();
                            curUserInfo.postName = curUserInfo.postName || '无';
                            localStorage.setItem('curUserInfo',JSON.stringify(curUserInfo));
                        }
                    },
                    errorFun: function(resultData){
                        console.error('获取用户信息失败，请重试');
                    }
                };
                _ajaxFun(para);
            }
        },
        _fillCacheData = function (moduleData,checkForm,addJourney,callback,callbackUl) {
            var nowTime = new Date().getTime();
            if(base.isEmptyObject(moduleData) || !moduleData.timestamp || (Number(moduleData.timestamp)<nowTime-86400000)) return;
            moduleData = moduleData.data ? moduleData.data : moduleData;
            if(moduleData && typeof(moduleData)==='object' && moduleData instanceof Array){
                for(var i=0,len=moduleData.length;i<len;i++) {
                    if (i > 0 && addJourney) addJourney();
                    eachFill(moduleData[i],i);
                }
            }else if(moduleData && typeof(moduleData)==='object' && moduleData instanceof Object){
                eachFill(moduleData);
            }

            function eachFill(data,i) {
                for (var x in data) {
                    var idDom = document.getElementById(x) ? document.getElementById(x) : document.getElementById(x+i),
                        formDom = (i || -1<i) ? document.getElementsByTagName('form')[i] : document.getElementsByTagName('form')[0],
                        inputDom = formDom.querySelector('input[name=' +x+']'),
                        NameDon = document.getElementsByName(x)[0] ? document.getElementsByName(x)[0] : document.getElementsByName(x+i)[0],
                        tagName = idDom ? idDom.tagName : (NameDon ? NameDon.tagName : null);
                    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                        var val = data[x] || data[x];
                        if (typeof(val) === 'string') {
                            val = val.replace('+', ' ').replace('%3A', ':');
                            if (idDom) idDom.value = decodeURIComponent(val || '');
                            if (inputDom) inputDom.value = decodeURIComponent(val || '');
                        } else if (typeof(val) === 'object') {
                            if (idDom) idDom.value = decodeURIComponent(val.value || val.fdName || '');
                            if (inputDom) inputDom.value = decodeURIComponent(val.id || val.fdId || '');
                        }
                    } else if (tagName === 'DIV') {
                        var fdName;
                        if (typeof(data[x]) === 'object' && data[x].fdName) {
                            fdName = data[x].fdName;
                        } else if (typeof(data[x]) === 'string' && data[x].indexOf('{') > -1) {
                            fdName = JSON.parse(data[x]).fdName;
                        } else if (typeof(data[x]) === 'string') {
                            fdName = data[x];
                        }
                        if (idDom) idDom.value = decodeURIComponent(fdName) || '请选择(必填)';
                        if (inputDom) inputDom.value = data[x].fdId ? data[x].fdId : data[x];
                    } else if (tagName === 'UL') {
                        if (callbackUl) callbackUl();
                    }
                }
            }
            if(checkForm) checkForm();
            if(callback) callback();
        };

    _getCurUserInfo();

    return {
        mobileSelect: _mobileSelect,
        dateTimePicker: _dateTimePicker,
        ajaxFun: _ajaxFun,
        switchTab: _switchTab,
        listenReturnBtn: _listenReturnBtn,
        checkFun: _checkFun,
        poptip: _poptip,
        getCurUserInfo: _getCurUserInfo,
        fillCacheData: _fillCacheData,
        loadMoreData: _loadMoreData,
        returnTopHandler: _returnTopHandler
    };
}());
export default common;