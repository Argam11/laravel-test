import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios, { post } from 'axios';

 class Create extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            logo: "",
            website: ""
        }
        this.config = {headers: {
            'Authorization':'Bearer ' + localStorage.getItem('token'),
            'content-type': 'multipart/form-data'
        }};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeLogo = this.handleChangeLogo.bind(this);
        this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
        this.createFunction = this.createFunction.bind(this);
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
        this.setState({logo:e.target.files[0]});
    }
    handleChangeWebsite(e) {
        this.setState({
            website: e.target.value
        });
    }
    createFunction(e) {
        e.preventDefault();
        let form = document.forms.namedItem("compForm");
        let formData = new FormData(form);
        axios.post('/api/companies', formData, this.config)
        .then(function (response) {
            window.location.href = "/companies";
        })
        .catch(function (error) {
            console.log(error);
        });
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
                                Add company
                            </div>
                            <div className="card-body">
                                <form method="post" name="compForm"  onSubmit={this.createFunction} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" className="form-control" name="name" onChange={this.handleChangeName} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">EMail: </label>
                                        <input type="text" className="form-control" name="email" onChange={this.handleChangeEmail} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Logo: </label>
                                        <input type="file" className="form-control" name="logo" onChange={this.handleChangeLogo} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Website: </label>
                                        <input type="text" className="form-control" name="website" onChange={this.handleChangeWebsite} />
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

export default Create;