import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

 class Edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            companies: [],
            first_name: "",
            last_name: "",
            company_id: "",
            email: "",
            phone: ""
        }
        this.id = this.props.match.params.id;
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.editFunction = this.editFunction.bind(this);
    }
    handleChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }
    handleChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }
    handleChangeCompany(e) {
        this.setState({
            company_id: e.target.value
        });
    }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }
    editFunction(e) {
        e.preventDefault();
        axios.put(`/api/employees/${this.id}`, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                company_id: this.state.company_id,
                email: this.state.email,
                phone: this.state.phone
            })
            .then(function (response) {
                window.location.href = "/employees";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount () {
        axios.get(`/api/employees/${this.id}/edit`).then(response => {
            this.setState({
                companies: response.data.companies,
                first_name: response.data.employee.first_name,
                last_name: response.data.employee.last_name,
                company_id: response.data.employee.company_id,
                email: response.data.employee.email,
                phone: response.data.employee.phone
            })
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card uper">
                            <div className="card-header">
                                Edit company
                            </div>
                            <div className="card-body">
                                <form method="post" encType="multipart/form-data" onSubmit={this.editFunction} >
                                <div className="form-group">
                                        <label htmlFor="name">Firstname: </label>
                                        <input type="text" className="form-control" name="name" onChange={this.handleChangeFirstName} defaultValue={this.state.first_name} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Lastname: </label>
                                        <input type="text" className="form-control" name="email" onChange={this.handleChangeLastName} defaultValue={this.state.last_name} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Company: </label>
                                        <select name="company_id" id="company_id" className="form-control" onChange={this.handleChangeCompany} value={this.state.company_id}>
                                            {
                                                this.state.companies.map((item, key) => <option value={item.id} key={key}>{item.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Email: </label>
                                        <input type="text" className="form-control" name="logo" onChange={this.handleChangeEmail} defaultValue={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Phone: </label>
                                        <input type="number" className="form-control" name="website" onChange={this.handleChangePhone} defaultValue={this.state.phone} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;