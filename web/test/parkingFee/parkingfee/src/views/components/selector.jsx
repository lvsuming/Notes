import React from 'react';
import Grid from './grid.jsx';
class Module extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData : this.props.data,
            gridSelected : this.props.gridSelected,
            changeValue : this.props.changeValue
        };
    }
    render() {
        return (<ul className="">
            {this.state.gridData.map((element, index) => {
                return (
                    <Grid key={index} data={element}  provinceShort={this.state.gridSelected}  changeValue={this.state.changeValue}/>
                )
            })}
        </ul>)
    }
}
export default Module;