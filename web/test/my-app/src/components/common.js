import Base from './base';
var common = {};
common.ajaxFun = function (para) {
    var preAjaxUrl;
    if(preAjaxUrl == para.url){ //防止重复请求
        return;
    }
    var $ajax = $.ajax({
        type: para.type,
        url: para.url,
        dataType: "json",
        data: para.data,
        timeout: 10000,
        async: para.async,
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
            if (successData.errorCode == 0 && successData.data) {
                var resultData = typeof(successData.data)=='string' ? JSON.parse(successData.data) : successData.data;
                para.successFun ? para.successFun(resultData) : function () {
                    _poptip('操作成功');
                }
            } else if (successData.code==999) {
                _poptip('操作失败，请重试');
            } else {
                _poptip(successData.code);
            }
        },
        complete: function (XMLHttpRequest, status) {
            preAjaxUrl = para.url;
            if (status == 'timeout') {
                $ajax.abort(); //取消请求
                _poptip('请求超时，请重试');
            }
            if(para.completeFun) para.completeFun();
        }
    });
    return $ajax;
};
