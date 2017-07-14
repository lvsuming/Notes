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
var base = {
    getUrl : getUrl()
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
resetViewport();
export default base;
