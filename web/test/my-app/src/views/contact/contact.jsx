import React from 'react';
import './contact.css';
import base,{$} from '../../components/base';
import {makePy} from './jquery.charfirst.pinyin';
import SearchBar from 'antd-mobile/lib/search-bar/index.web';
import 'antd-mobile/lib/search-bar/style/index.css';
class ContactItem extends React.Component{
    isShowDefaultImg(){
        if(this.props.value && this.props.value.type===8){
            return <img src={this.props.value.imgUrl} alt=""/>;
        }else{
            return <img src="./images/icon-folder.jpg" alt=""/>;
        }
    }
    render(){
        return (
            <li className={"sort_list sort_list"+this.props.value.type} data-value={JSON.stringify(this.props.value || '')} onClick={this.props.bindEvent.bind(this)}>
                <div className="num_logo">
                    {this.isShowDefaultImg()}
                </div>
                <div className="num_name">{this.props.value.fdName}</div>
            </li>
        )
    }
}
class Contact extends React.Component{
    componentWillMount(){
        this.state = {
            data : [{"fdId":"15cc48d8d8d006c6b2708fd4cc798ca8","fdName":"人员A","type":8,"fdNo":"","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"","postName":""},{"fdId":"15b58a37be7dff6d386d2d44935a917e","fdName":"数据决策中心","type":2,"fdNo":"C0022","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcfa89d574554401546fb8574d","fdName":"消费金融运营部","type":2,"fdNo":"C0013","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15820a9181a79b5c540b073497a9e0f8","fdName":"市场部","type":2,"fdNo":"C0021","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"1183b0b84ee4f581bba001c47a78b2d9","fdName":"管理员","type":8,"fdNo":"B001","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"1597368841bf6e09853f1b14ca49849a","postName":"管理员岗位"},{"fdId":"14c130bcc5aa30801cf7d714e8a8c4c8","fdName":"总裁办","type":2,"fdNo":"C0002","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc5c275ad08748c843599f6a5","fdName":"新业务拓展部","type":2,"fdNo":"C0016","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc5c33510f9452c44564bd31d","fdName":"风控部","type":2,"fdNo":"C0003","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc5d8ee1d4a067704c85ae3b8","fdName":"调查部","type":2,"fdNo":"C0004","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc5fa641adcb4a47419eb0695","fdName":"IT部","type":2,"fdNo":"C0005","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc61560539ce7e4f49d697b65","fdName":"人力资源部","type":2,"fdNo":"C0006","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc688d57cdb919be45efa2cfc","fdName":"财务部","type":2,"fdNo":"C0007","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc693bf29f26ae7e416fb3395","fdName":"采购行政部","type":2,"fdNo":"C0008","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc6b8b589d33b4bc4e4eaf3f4","fdName":"法务部","type":2,"fdNo":"C0009","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc6b67f08b83d9f64381803b5","fdName":"审计部","type":2,"fdNo":"C0010","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc6ba532b783682643be9ff25","fdName":"资产管理中心","type":2,"fdNo":"C0011","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bcc7daeb9bef1b55d46f280141","fdName":"销售二部","type":2,"fdNo":"C001203","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15603ed5569fe8f6cf248f740f1b5c4b","fdName":"董事会办公室","type":2,"fdNo":"C0020","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15c172ee9d38c6a169943ca4d9eb172f","fdName":"组织发展及绩效管理部","type":2,"fdNo":"C0025","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15c172ee9d4642d1155ccb542d4bbfbf","fdName":"经营管理部","type":2,"fdNo":"C0026","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"1591d00bb1de47756c7f44e45078efb3","fdName":"公司课堂","type":2,"fdNo":"C0019","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bdc73250a3089938145c1b59cc","fdName":"孔令军","type":8,"fdNo":"B00017858","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"14c130bcffde88b5b4fcc604340897c0;14c130bd341ae959702c9b04958b353a","postName":"总裁办主任;副总裁"},{"fdId":"15c1c553a37a06f27fb4e484844b3d5b","fdName":"新零售业务部","type":2,"fdNo":"C0027","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bd99d456e1889f3904dc7b4b7a","fdName":"黄伟欢","type":8,"fdNo":"B00004197","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"154102da556723c71e89e374e8e954f0;14cfc133cc5d4e98ca014e94ec1a6b15","postName":"助理总裁;投融资部总经理"},{"fdId":"15380a0388c7f4ae06c14a149b1b4649","fdName":"销售一部","type":2,"fdNo":"C001204","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15380a0388c115a6db12d3f424aba747","fdName":"销售三部","type":2,"fdNo":"C001205","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"14c130bddd514ba981c2398473ea45bf","fdName":"黄鹏","type":8,"fdNo":"B00023219","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"154102da5560f12b0e80005403da4f1e;14e02b7c81a4859131b22cd4e1981e84","postName":"助理总裁;新业务拓展部总经理"},{"fdId":"15bf848cae986469030fb0d44a8b415a","fdName":"现金贷业务部","type":2,"fdNo":"C0024","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15cc454d9bc09b22bf275c34ed287c5c","fdName":"罗伟鑫","type":8,"fdNo":"","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"","postName":""},{"fdId":"14c130bd7e9577691fce93f40298c9b9","fdName":"LIU SHI","type":8,"fdNo":"B00000001","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"14c130bcfbfad76c02e45094af6877af;1591d03ac85c07139956ea34c3995c7e","postName":"首席执行官"},{"fdId":"14c130bd7eaad4a18c678664d1da8652","fdName":"钱龙","type":8,"fdNo":"B00000002","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"14c130bcfc33bc59b015d784744a5bcf","postName":"首席风控官"},{"fdId":"14c130bd7eaad2487b5cd564353980fd","fdName":"鞠岩","type":8,"fdNo":"B00000003","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"14c130bd20eaef1f49cedd14b059d7ea","postName":"副总裁"},{"fdId":"14c130bd7eb31f76eb6b1b54c0080e13","fdName":"许深宁","type":8,"fdNo":"B00000006","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"14c130bcfc232d01d476a3540ccaf694;14c130bd49c930e8d67f5ea4da09770e;14c130bd356bc2792323f7b48a0ae9d1","postName":"首席运营官;运营总监;运营总监"},{"fdId":"14c130bd7edc13df67bc81d462382cb1","fdName":"黄雁","type":8,"fdNo":"B00000016","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"14c130bcfc3a865741ead834f698fda1","postName":"首席财务官"},{"fdId":"14c130bd866ed22d7c20a904c1491846","fdName":"魏轶明","type":8,"fdNo":"B00000648","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"15825d2b36e5728681244304a2f9a164;15825d2b3b7a5f4d48827a54e4fa84b1","postName":"首席法务专家;审计部总经理"},{"fdId":"15366e0882356c00470ff4945938e500","fdName":"消费金融销售管理中心","type":2,"fdNo":"C0018","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"157d369c9faa425a9795f6444ab94f56","fdName":"战略管理部","type":2,"fdNo":"C0017","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15b5dc9cc0e7baf253421104e4297d6a","fdName":"区域人力资源部","type":2,"fdNo":"C0023","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":""},{"fdId":"15cc4ddf8236f3b33e355a04fd3a3643","fdName":"凌金水","type":8,"fdNo":"","parentId":"14c130bcc5929db071a3b734102943ff","parentName":"深圳市XXXX服务有限公司","imgUrl":"","postId":"","postName":""}]
        }
    }
    initials(){
        const A_Z=[];
        for(var i=65;i<91;i++){
            A_Z.push(String.fromCharCode(i));
        }
        return(<div>
            {A_Z.map((element,index)=>{
            return <li key={index}>{element}</li>
            })}
        </div>)
    }
    selectItem(e){
        var target = e.target.closest('li'),
            targetDom = $(target),
            dataValue = targetDom.getAttribute('data-value'),
            type = '',
            isMultiSelect = base.getUrlParam('isMultiSelect') || false, //是否多选
            resultSelected = sessionStorage.contactData ? JSON.parse(sessionStorage.contactData) : [];
        dataValue = dataValue ? JSON.parse(dataValue) : null;
        type = dataValue ? dataValue.type : '';
        if(type && (type==='2' || type==='4')){
            //var fdId = dataValue.fdId,
            //    fdName = dataValue.fdName;
            //getSysOrgElement('',fdId,fdName,currentType);
        }else if(type && type==='8'){
            var targetData = JSON.parse(target.getAttribute('data-Value'));
            if(isMultiSelect && isMultiSelect!=='false'){
                var index = -1;
                for(var i=0,len=resultSelected.length;i<len;i++){
                    if(targetData.fdId === resultSelected[i].fdId) index=i;
                }
                if(targetDom.hasClass('selected')){
                    targetDom.removeClass('selected');
                    if(index>-1) resultSelected.splice(index,1);
                }else{
                    targetDom.addClass('selected');
                    if(!index>-1) resultSelected.push(targetData);
                }
            }else{
                resultSelected[0] = targetData;
                var hash = base.setUrlParam('isMultiSelect',''),
                    href_rferrer = localStorage.getItem('href_rferrer');
                if(href_rferrer) window.location.href = '/bilf/mobile/html/'+href_rferrer+'.html?' + hash;
            }
            sessionStorage.contactData = JSON.stringify(resultSelected);
        }
    }
    gotoUrl() {
        var hash = base.setUrlParam('isMultiSelect',''),
            href_rferrer = localStorage.getItem('href_rferrer');
        if(href_rferrer) window.location.href = '/bilf/mobile/html/'+href_rferrer+'.html?' + hash;
    }
    insertAfter(newElement,targetElement) {
        var parent=targetElement.parentNode;
        if (parent.lastChild===targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    }
    reSort() { //排序
        var SortList=document.querySelectorAll(".sort_list8"),
            SortListAll=document.querySelectorAll(".sort_list"),
            SortBox=document.querySelector(".sort_box"),
            SortResultAll = [].slice.call(SortListAll).sort(asc_sort);
        SortBox = SortResultAll.map(function (element,index) {
            SortBox.appendChild(element);//按首字母排序
            return SortBox;
        });
        function asc_sort(a, b) {
            return makePy(b.querySelector('.num_name').innerHTML.charAt(0))[0].toUpperCase() < makePy(a.querySelector('.num_name').innerHTML.charAt(0))[0].toUpperCase() ? 1 : -1;
        }

        var initials = [],
            num=0;
        initials = [].slice.call(SortList).map(function(element,index) {
            var initial = makePy(element.querySelector('.num_name').innerHTML.charAt(0))[0].toUpperCase();
            if(initial>='A'&&initial<='Z'){
                if (initials.indexOf(initial) === -1)
                    initials.push(initial);
            }else{
                num++;
            }
            return initials;
        });
        SortBox = initials.map(function(value,index) {//添加首字母标签
            var sortLetter = document.createElement('div');
            sortLetter.className = 'sort_letter';
            sortLetter.id = value;
            sortLetter.innerHTML = value;
            SortBox.append(sortLetter);
            return SortBox;
        });

        if(num!==0){SortBox.append('<div class="sort_letter" id="default">#</div>');}

        for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
            var letter=makePy(SortList[i].querySelector('.num_name').innerHTML.charAt(0))[0].toUpperCase();
            if(letter < String.fromCharCode(91) && letter >= String.fromCharCode(65)){
                this.insertAfter(SortList[i],$('#'+letter)[0]);
            }
        }
    }
    componentDidMount(){
        this.reSort();
        let isMultiSelect = base.getUrlParam('isMultiSelect') || false;
        if(isMultiSelect && isMultiSelect!=='false') $('.btn-submit').bind('click',this.gotoUrl).closest('.row').removeClass('hide');
    }
    render(){
        return (
            <div>
                <div className="breadcrumbs">
                    <span>深圳市XXXX有限公司</span>
                </div>
                <div id="letter" ></div>
                <SearchBar placeholder="点击搜索" ref="search"/>
                <div className="noticebar"></div>
                <ul className="sort_box mb9">
                    {this.state.data.map((element,index)=>{
                        return <ContactItem value={element} key={index} bindEvent={this.selectItem}></ContactItem>
                    })}
                </ul>
                <div className="row fixed bg-gray hide">
                    <button type="button" className="btn-submit grid-1">确定</button>
                </div>
                <div className="initials">
                    <ul>
                        <li><img src="./images/icon-star-contact.png" alt=""/></li>
                        {this.initials()}
                    </ul>
                </div>
            </div>
        )
    }
}
export default Contact;