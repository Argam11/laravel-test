import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

 class Index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            employees: []
        }
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    deleteEmployee(id) {
        axios.delete(`/api/employees/${id}`)
            .then(function (response) {
                window.location.href = "/employees";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount () {
        axios.get('/api/employees').then(response => {
            this.setState({
                employees: response.data.data
            })
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">
                                <br />
                                <div>
                                    <Link to="/employees/create">
                                        <button type="button" className="btn btn-primary">Create employee</button>
                                    </Link>
                                </div>
                                <br />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Firstname</td>
                                            <td>Lastname</td>
                                            <td>Company</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.employees.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{item.id}</td>
                                                        <td>{item.first_name}</td>
                                                        <td>{item.last_name}</td>
                                                        <td>{item.companies.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>
                                                            <Link to={`/employees/${item.id}/edit`} className="btn btn-primary">Edit</Link>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => this.deleteEmployee(item.id)}>Delete</button>
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