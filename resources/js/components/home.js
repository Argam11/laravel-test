import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mt-5 text-center">
                            <h1>Welcome</h1>
                            <p>Home page</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
