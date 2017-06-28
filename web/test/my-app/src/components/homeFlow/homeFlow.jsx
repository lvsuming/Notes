import React from 'react';
import PropTypes from 'prop-types';
import HomeFlowItem from './homeFlowItem.jsx';
class Module extends React.Component{
    static propTypes = {
        docSubject: PropTypes.string,
        fdCategoryName: PropTypes.string,
        docCreateTime: PropTypes.string,
        docReadCount: PropTypes.number || PropTypes.string
    };
    constructor(props){
        super(props);
    }
    render(){
        return (<HomeFlowItem/>)
    }
}
export default Module;
