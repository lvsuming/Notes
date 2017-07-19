import React from 'react';
import Row from '../../components/base/row.jsx';
//import '../../components/mobiscrollTime/js/jquery.1.7.2.min';
//import '../../components/mobiscrollTime/js/mobiscroll';
class Page extends React.Component{
    render(){
        return <form>
            <Row title="出差人" name="fd_traveller" readOnly="true" selectMore="true" link="/contact"></Row>
            <Row title="出差人手机号" name="fd_traveller_tel" type="number" placeholder="请填写(必填)"></Row>
            <Row title="出差人部门" name="fd_traveller_dept" readOnly="true" placeholder=" "></Row>
            <Row title="出差人职位" name="fd_traveller_post" readOnly="true" placeholder=" "></Row>
            <div className="noticebar"></div>
            <Row title="出差开始时间" name="fd_start_time" readOnly="true"></Row>
            <Row title="出差结束时间" name="fd_end_time" readOnly="true"></Row>
            <Row title="出差人天数(日)" name="fd_travel_days" type="number" readOnly="true" placeholder=" "></Row>
            <div className="row flex">
                <label htmlFor="fd_reason">出差事由</label>
                <textarea id="fd_reason" name="fd_reason" className="meeting_content" placeholder="请输入出差事由(必填)"></textarea>
            </div>
            <div className="row fixed bg-gray">
                <button type="button" className="btn-submit grid-1 disabled">确定</button>
            </div>
        </form>
    }
}
export default Page;
