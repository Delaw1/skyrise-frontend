import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function AdminBar({text}) {
    return (
        <div className="admin-bar">
            <div className="container-fluid">
                <ul className="admin-m">
                    <li className={text === 'dash' && 'active'}><Link to='/developer-dashboard'>Developer's dashboard</Link></li>
                    <li className={text === 'project' && 'active'}><Link to='/developer-projects'>Developer's project list</Link></li>
                    <li className={text === 'analytics' && 'active'}><Link to='/analytics'>Analytics</Link></li>
                    <li className={text === 'account' && 'active'}><Link to='/developer-data'>Account</Link></li>
                </ul>
                <div className="col-md-3" />
                <div className="col-md-3" />
                <div className="col-md-3" />
            </div>
        </div>
    )
}

export default AdminBar

