var App = React.createClass({
    getInitialState: function() {
        return {secondElapsed: 0};
    },
    tick: function() {
        this.setState({
            secondElapsed: this.state.secondElapsed + 1
        });
    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() {
        return <div>Time elapsed: {this.state.secondElapsed}</div>;
    }
});
export default App;
