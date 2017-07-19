import React from 'react';
import PropTypes from 'prop-types';
import './userInfo.css';
class UserInfo extends React.Component{
    static propTypes = {
        fdName: PropTypes.string,
        postName: PropTypes.string,
        phone: PropTypes.number || PropTypes.string,
        companyName: PropTypes.string,
        deptName : PropTypes.string,
        img : PropTypes.string
    };
    static defaultProps = { // as static property
        fdName: 'aaa',
        postName: 'bbb',
        phone: '12345678901',
        companyName: 'ccc',
        deptName : 'ddd',
        img : './images/icon-default_per.png'
    };
    render(){
        return <div className="row flex">
            <input type="hidden" name="userId" id="userId"/>
            <div style={{width: '100%'}}>
                <dl>
                    <dt className="gray-3">提单人</dt><dd>{this.props.fdName}</dd>
                </dl>
                <dl>
                    <dt className="gray-3">职位</dt><dd>{this.props.postName}</dd>
                </dl>
                <dl>
                    <dt className="gray-3">手机号</dt><dd>{this.props.phone}</dd>
                </dl>
                <dl className="hide">
                    <dt>公司名</dt><dd>{this.props.companyName}</dd>
                </dl>
                <dl className="hide">
                    <dt>部门名</dt><dd>{this.props.deptName}</dd>
                </dl>
            </div>
            <img className="head-img" src={this.props.img} width="120" height="120" alt={this.props.fdName}/>
        </div>
    }
}
export default UserInfo;
