import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

 class Edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            logo: "",
            website: "",
            errors: []
        }
        this.config = {headers: {
            'Authorization':'Bearer ' + localStorage.getItem('token'),
            'content-type': 'multipart/form-data'
        }};
        this.id = this.props.match.params.id;
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeLogo = this.handleChangeLogo.bind(this);
        this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
        this.editFunction = this.editFunction.bind(this);
    }
    handleChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleChangeLogo(e) {
        this.setState({logo: e.target.files[0]});
    }
    handleChangeWebsite(e) {
        this.setState({
            website: e.target.value
        });
    }
    editFunction(e) {
        e.preventDefault();
        let form = document.forms.namedItem("compForm");
        let formData = new FormData(form);
        formData.append('_method', 'PUT');
        axios.post(`/api/companies/${this.id}`, formData, this.config)
            .then(function (response) {
                 window.location.href = "/companies";
            })
            .catch(error => {
                if(error.response.data.errors) {
                    this.setState({errors: Object.values(error.response.data.errors)});
                }
            });
    }
    componentDidMount () {
        if(localStorage.getItem('token')) {
            axios.get(`/api/companies/${this.id}/edit`, this.config).then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    logo: response.data.logo,
                    website: response.data.website
                })
            })
        }
    }
    render() {
        if(!localStorage.getItem('token')) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card uper">
                            <div className="card-header">
                                Edit company
                            </div>
                            {
                                this.state.errors.length > 0 && 
                                <div className="alert alert-danger">
                                    <ul>
                                        {
                                            this.state.errors.map((error, key) => <li key={key}>{ error }</li>)
                                        }
                                    </ul>
                                </div>
                            }
                            <div className="card-body">
                                <form method="post" name="compForm" onSubmit={this.editFunction} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" className="form-control" name="name" onChange={this.handleChangeName} defaultValue={this.state.name} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">EMail: </label>
                                        <input type="text" className="form-control" name="email" onChange={this.handleChangeEmail} defaultValue={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="logo">Logo: </label>
                                        <input type="file" className="form-control" name="logo" onChange={this.handleChangeLogo} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="website">Website: </label>
                                        <input type="text" className="form-control" name="website" onChange={this.handleChangeWebsite} defaultValue={this.state.website} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add</button>
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