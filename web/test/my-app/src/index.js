import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Home from './components/home.jsx';
import {Router,Route,hashHistory} from 'react-router';
import Page1 from './components/page1.jsx';
import Page2 from './components/page2.jsx';
import Home from './views/home/home.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Home />, document.getElementById('example'));
/*
ReactDOM.render(<Router history={hashHistory}>
    <Route path="/page1" component={Page1}/>
    <Route path="/page2" component={Page2}/>
</Router>, document.getElementById('example'));
*/
/*
let routes = <Route path="/" component={App}>
    <Route path="/page1" component={Page1}/>
    <Route path="/page2" component={Page2}/>
</Route>;
ReactDOM.render(<Router routes={routes} history={hashHistory}/>, document.getElementById('example'));
*/
/*
ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Home}>
        <Route path="/page2" component={Page2}/>
        <Route path="/page1" component={Page1}/>
    </Route>
</Router>, document.getElementById('example'));
registerServiceWorker();
*/
/*
ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Home}></Route>
</Router>, document.getElementById('example'));
*/
ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();