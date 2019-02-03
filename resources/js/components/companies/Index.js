import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

 class Index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            companies: []
        }
        this.config = {headers: {'Authorization':'Bearer ' + localStorage.getItem('token')}};
        this.deleteCompany = this.deleteCompany.bind(this);
    }
    deleteCompany(id) {
        axios.delete(`/api/companies/${id}`, this.config)
            .then(function (response) {
                window.location.href = "/companies";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount () {
        if(localStorage.getItem('token')) {
            axios.get('/api/companies', this.config).then(response => {
                this.setState({
                    companies: response.data.data
                })
            })
        }
    }
    render() {
        if(!localStorage.getItem('token')) {
            return <Redirect to={{
                        pathname: '/login',
                        state: { history: '/companies' }
                    }} />;
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">
                                <br />
                                <div>
                                    <Link to="/companies/create">
                                        <button type="button" className="btn btn-primary">Create company</button>
                                    </Link>
                                </div>
                                <br />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <td>ID</td>
                                        <td>Company name</td>
                                        <td>Company email</td>
                                        <td>Company logo</td>
                                        <td>Company website</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.companies.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td><img src={`/storage/${item.logo}`} alt="log123o" /></td>
                                                        <td>{item.website}</td>
                                                        <td>
                                                            <Link to={`/companies/${item.id}/edit`} className="btn btn-primary">Edit</Link>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => this.deleteCompany(item.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;