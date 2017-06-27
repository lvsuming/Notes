//方法1：
var App1 = React.createClass({
    getInitialState:function(){
        return {
            username:'',
            gender:'man',
            isEmergency:true
        };
    },
    handleChange:function(name,event){
        var newState={};
        newState[name] = name=="isEmergency"?event.target.checked:event.target.value;
        this.setState(newState);
    },
    submitHandler:function (e) {
        e.preventDefault();
        console.log(this.state);
    },
    render:function () {
        return <form onSubmit={this.submitHandler}>
            <label htmlFor="username">请输入用户名</label>
            <input type="text" onChange={this.handleChange.bind(this,"username")} value={this.state.username} id="username"/>
            <br/>
            <select onChange={this.handleChange.bind(this,"gender")} value={this.state.gender}>
                <option value="man">男</option>
                <option value="woman">女</option>
            </select>
            <br/>
            <label htmlFor="isEmergency">是否同意</label>
            <input type="checkbox" value="是否同意" checked={this.state.isEmergency} onChange={this.handleChange.bind(this,"isEmergency")} id="isEmergency"/>
            <button type="submit">提交</button>
        </form>
    }
});
export default App1;

//方法2：
class App2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            gender:'man',
            isEmergency:true
        }
    }
    handleChange (name,event){
        var newState={};
        newState[name] = name=="isEmergency"?event.target.checked:event.target.value;
        this.setState(newState);
    }
    submitHandler (e) {
        e.preventDefault();
        console.log(this.state);
    }
    render () {
        return <form onSubmit={this.submitHandler.bind(this)}>
            <label htmlFor="username">请输入用户名</label>
            <input type="text" onChange={this.handleChange.bind(this,"username")} value={this.state.username} placeholder="请输入用户名" id="username"/>
            <br/>
            <select onChange={this.handleChange.bind(this,"gender")} value={this.state.gender}>
                <option value="man">男</option>
                <option value="woman">女</option>
            </select>
            <br/>
            <label htmlFor="isEmergency">是否同意</label>
            <input type="checkbox" value="是否同意" checked={this.state.isEmergency} onChange={this.handleChange.bind(this,"isEmergency")} id="isEmergency"/>
            <button type="submit">提交</button>
        </form>
    }
}
export default App2;