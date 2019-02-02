import React from 'react'
    import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
                <div className='container'>
                    <Link className='btn btn-primary' to='/'>home</Link>
                    <Link className='btn btn-primary' to='/companies'>Companies</Link>
                    <Link className='btn btn-primary' to='/employees'>Employees</Link>
                </div>
            </nav>
        );
    }
}

export default Header;