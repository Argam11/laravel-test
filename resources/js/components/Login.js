import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import axios from 'axios';

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: []
        }
        this.config = {headers: {'content-type': 'application/json'}};
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.loginFunction = this.loginFunction.bind(this);
    }
    handleChangeLogin(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    loginFunction(e) {
        e.preventDefault();
        axios.post('/api/login', this.state, this.config).then(response => {
            if(response.data.data.token) {
                localStorage.setItem('token', response.data.data.token);
                console.log(this.props);
                if(this.props.location.state) {
                    window.location.href = this.props.location.state.history;
                } else {
                    window.location.href = '/';
                }
            }
        })
        .catch(error => {
            if(error.response.data.errors) {
                this.setState({errors: Object.values(error.response.data.errors)});
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <h1 className="text-center mt-3">Login page</h1>
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
                            <form className="login-form" method="post" onSubmit={this.loginFunction}>
                                <div className="form-group">
                                    <label htmlFor="email">Email: </label>
                                    <input type="text" className="form-control" name="email" onChange={this.handleChangeLogin} defaultValue={this.state.first_name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password: </label>
                                    <input type="password" className="form-control" name="password" onChange={this.handleChangeLogin} defaultValue={this.state.last_name} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;