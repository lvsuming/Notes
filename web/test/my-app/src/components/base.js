function getUrl() {
    var _getHost = window.location.protocol+ '//' + window.location.host + (window.location.hostname==='yun.szcaremore.com') ? '/ekp' : '',
        _baseUrl = 'http://yun.szcaremore.com:8887/ekp/bilf/mobile';//(window.location.hostname==='yun.szcaremore.com') ? _getHost+'/bilf/mobile' : '/bilf/mobile';
    return {
        jsapiSignature : _baseUrl+'/bilf_mobile_doc/bilfMobileDoc.do?method=jsapiSignature',                           //微信鉴权
        getCurUserInfo : _baseUrl+'/person/bilf_mobile_person/bilfMobilePerson.do?method=getCurUserInfo',              //当前用户信息
        getMytodoNum : _baseUrl+'/notify/bilf_mobile_notify/bilfMobileNotify.do?method=getNotifyNum',                  //首页我的待办数
        getMyprocessNum : _baseUrl+'/bilf_mobile_doc/bilfMobileDoc.do?method=getDocNum',                               //首页我的流程数
        getSysOrgElement : _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=getSysOrgElement',    //获取组织架构
        saveBusinesstripCreate : _baseUrl+'/travel/bilf_mobile_travel/bilfMobileTravel.do?method=save',                //出差申请-出差
        saveLeaveCreate : _baseUrl+'/leave/bilf_mobile_leave/bilfMobileLeave.do?method=save', 							//新建请假
        getRemainderHoliday : _baseUrl+'/leave/bilf_mobile_leave/bilfMobileLeave.do?method=getRemainderHoliday',		//请假剩余天数
        saveMeetingCreate : _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=save',               //新建会议
        getMeetingType : _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=getMeetingCategory',   //获取会议类型
        getMeetingroomPosition : _baseUrl+'/imeeting/bilf_mobile_imeeting/bilfMobileImeeting.do?method=getMeetingFloorAndMeetingName', //获取会议室地址
        getMyFlowList : _baseUrl+'/bilf_mobile_doc/bilfMobileDoc.do?method=getMyFlow'                                 //我的流程列表(我发起的/待我审批/我已审批)
    }
}
var base = {
    getUrl : getUrl()
};
export default base;
