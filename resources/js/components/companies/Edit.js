import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

 class Edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            logo: "",
            website: ""
        }
        this.id = this.props.match.params.id;
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
        this.setState({logo: e.target.files[0]});
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
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.put(`/api/companies/${this.id}`, formData, config)
            .then(function (response) {
                console.log(response.data);
                
                // window.location.href = "/companies";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount () {
        axios.get(`/api/companies/${this.id}/edit`).then(response => {
            this.setState({
                name: response.data.name,
                email: response.data.email,
                logo: response.data.logo,
                website: response.data.website
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
                                <form method="post" name="compForm"  onSubmit={this.createFunction} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" className="form-control" name="name" onChange={this.handleChangeName} defaultValue={this.state.name} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">EMail: </label>
                                        <input type="text" className="form-control" name="email" onChange={this.handleChangeEmail} defaultValue={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Logo: </label>
                                        <input type="file" className="form-control" name="logo" onChange={this.handleChangeLogo} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Website: </label>
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