import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Category from './Category';
import Expenses from './Expenses'
import Home from './Home'
import Chart from './Chart'

class App extends Component {
    state = { }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path='/' exact = {true} component = {Expenses}/>
                    {/* <Route path='/categories' exact = {true} component = {Category}/> */}
                    <Route path='/expenses' exact = {true} component = {Expenses}/>
                    <Route path='/chart' exact = {true} component = {Chart}/>
                </Switch>
            </Router>
         );
    }
}
 
export default App;