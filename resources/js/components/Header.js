import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Header extends React.Component {
    logOut() {
        if(localStorage.getItem('token')) {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }
    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
                <div className='container'>
                    <Link className='btn btn-success' to='/'>home</Link>
                    <Link className='btn btn-primary' to='/companies'>Companies</Link>
                    <Link className='btn btn-primary' to='/employees'>Employees</Link>
                    <Link className='btn btn-success' to='/login'>Login</Link>
                    <button className="btn btn-danger" onClick={this.logOut.bind(this)}>Logout</button>
                </div>
            </nav>
        );
    }
}

export default Header;