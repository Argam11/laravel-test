import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './companies.css';

import Home from './Home';
import Header from './Header';
import Login from './Login';
import CompaniesIndex from './companies/Index';
import CompaniesCreate from './companies/Create';
import CompaniesEdit from './companies/Edit';
import EmployeesIndex from './employees/Index';
import EmployeesCreate from './employees/Create';
import EmployeesEdit from './employees/Edit';
import NotFound from './NotFound';

class App extends Component {
    render() {
        return (
                <Router>
                    <div className="p-3">
                        <Header />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/login' component={Login} />
                            <Route exact path='/companies' component={CompaniesIndex} />
                            <Route path='/companies/create' component={CompaniesCreate} />
                            <Route path='/companies/:id/edit' component={CompaniesEdit} />
                            <Route exact path='/employees' component={EmployeesIndex} />
                            <Route path='/employees/create' component={EmployeesCreate} />
                            <Route path='/employees/:id/edit' component={EmployeesEdit} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('example'));

