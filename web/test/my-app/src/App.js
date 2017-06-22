import React from 'react'; //, { Component }
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload......
        </p>
      </div>
    );
  }
}

export default App;
*/

/*
var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked},function () {
            alert(this.state.liked);
        });
    },
    render: function() {
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <p onClick={this.handleClick}>
                你<b>{text}</b>我。点我切换状态。
            </p>
        );
    }
});
ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
);*/

/*
const App = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },
    getDefaultProps() {
        return {

        };
    },
    render() {
        return (
            <div>123</div>
        );
    }
});
export default App;*/
/*
class App extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        console.log('0'+this); // null
    }
    handleFocus(){  // manually bind this
        console.log('1'+this); // React Component Instance
    }
    //handleBlur: ()=>{  // use arrow function
    //    console.log(this); // React Component Instance
    //}
    render(){
        return <input onClick={this.handleClick}
                      onFocus={this.handleFocus.bind(this)} //onBlur={this.handleBlur}
                      />
    }
}

export default App;
*/
/*
let MyMixin = {
    log:function(){
        console.log('Mixin log');
    }
};
let TodoItem = React.createClass({
    mixins: [MyMixin], // add mixin
    componentWillMount: function () {
        this.log();
    },
    render(){
        return <div></div>
    }
});
export default TodoItem;
ReactDOM.render(<TodoItem/>, document.getElementById('example'));
*/

/*
class App extends React.Component{
    constructor(props){
        super(props);
    }
    handleBlur(){  // use arrow function
        console.log(this.refs.fdName.value);
        console.log(this.refs.fdPassword.value);
    }
    handleSubmit(e){
        console.log(e);
    }
    render(){
        return <form style={{display:'grid',gridTemplateColumns:'50px 150px',gridTemplateRows:20}} {...this.props} method="get" action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="fdName">姓名：</label><input ref='fdName' onBlur={this.handleBlur.bind(this)}/>
                    <label htmlFor="fdPassword">密码</label><input ref='fdPassword' onBlur={this.handleBlur.bind(this)}/>
                    <button type="submit">提交</button>
                </form> //onBlur={this.handleBlur} onClick={this.handleClick}
    }
}
export default App;
*/

class App extends React.Component{
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
        newState[name] = name==="isEmergency"?event.target.checked:event.target.value;
        this.setState(newState);
    }
    submitHandler (e) {
        e.preventDefault();
        console.log(this.state);
    }
    render () {
        return <form onSubmit={this.submitHandler.bind(this)}>
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
}
export default App;
