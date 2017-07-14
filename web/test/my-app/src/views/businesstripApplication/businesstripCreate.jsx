import React from 'react';
import UserInfo from '../../components/userInfo/userInfo.jsx';
import '../../components/userInfo/userInfo.css';
class HomeBoard extends React.Component{
    render(){
        return <div>
            <section className="mb9 block">
                <UserInfo></UserInfo>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span className="blue">公司名称</span>
                    <input type="hidden" name="fd_company"/>
                    <input type="text" className="select_bg grid-2 align-right" id="fd_company" placeholder="请选择(必填)" readOnly/>
                </div>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span className="blue">出差详情</span>
                    <a href="businesstripApplication.html">
                        <input type="text" className="select_bg grid-2 align-right" placeholder="请选择(必填)" readOnly/>
                    </a>
                </div>
                <div className="row clr hide" id="businesstripApplicationList"></div>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span className="blue">交通预定</span>
                    <a href="businesstripTranfic.html">
                        <input type="text" className="select_bg grid-2 align-right" placeholder="请选择(必填)" readOnly/>
                    </a>
                </div>
                <div className="row clr hide" id="businesstripTranficList"></div>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span className="blue">酒店预定</span>
                    <a href="businesstripHotel.html">
                        <input type="text" className="select_bg grid-2 align-right" placeholder="请选择(必填)" readOnly/>
                    </a>
                </div>
                <div className="row clr hide" id="businesstripHotelList"></div>
                <div className="noticebar"></div>
                <div className="row flex">
                    <span>是否紧急</span>
                    <input type="hidden" name="fd_isEmergency" value="false"/>
                    <span id="fd_isEmergency" className="icon-switch"></span>
                </div>
            </section>
            <div className="row fixed bg-gray">
                <button type="button" className="btn-submit grid-1 disabled">提交</button>
            </div>
        </div>
    }
}
export default HomeBoard;