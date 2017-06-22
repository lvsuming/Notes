import React from 'react';
import ReactDOM from 'react-dom';
import Page1 from 'page1.jsx';
import Page2 from 'page2.jsx';
import Home from '../views/home/home.jsx';
import {Router,Route,hashHistory} from 'react-router';
import registerServiceWorker from '../registerServiceWorker';

ReactDOM.render(<Router history={hashHistory}>
    <Route path="/page1" component={Page1}/>
    <Route path="/page2" component={Page2}/>
</Router>, document.getElementById('example'));

registerServiceWorker();
