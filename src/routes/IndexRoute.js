import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AddDuplex from "../components/dashboard/AddDuplex"
import AddAttached from "../components/dashboard/AddAttached"
import AddDetached from "../components/dashboard/AddDetached"
import Developer from "../components/dashboard/Developer"
import DeveloperList from "../components/dashboard/DeveloperList"
import DeveloperData from "../components/dashboard/DeveloperData"
import DeveloperDash from "../components/dashboard/DeveloperDash"
import DeveloperProject from "../components/dashboard/DeveloperProject"
import ProjectList from "../components/dashboard/ProjectList"
import Admin from "../components/dashboard/Admin"
import Analytics from "../components/dashboard/Analytics"
import Login from "../components/dashboard/Login"
import ChangeEmail from "../components/dashboard/ChangeEmail"
import ChangePassword from "../components/dashboard/ChangePassword"
import EditDeveloper from "../components/dashboard/EditDeveloper"
import EditAttached from "../components/dashboard/EditAttached"
import EditDetached from "../components/dashboard/EditDetached"
import EditDuplex from "../components/dashboard/EditDuplex"

export class IndexRoute extends Component {
    render() { 
        return (
            <Fragment>
                <Route exact path="/" component={AddAttached}  />
                <Route path="/add-developer" component={Developer}  />
                <Route path="/admin" component={Admin}  />
                <Route path="/developer-list" component={DeveloperList}  />
                <Route path="/project-list" component={ProjectList}  />
                <Route path="/add-duplex" component={AddDuplex}  />
                <Route path="/add-attached" component={AddAttached}  />
                <Route path="/add-detached" component={AddDetached}  />
                <Route path="/developer-data" component={DeveloperData}  />
                <Route path="/developer-projects" component={DeveloperProject}  />
                <Route path="/developer-dashboard" component={DeveloperDash}  />
                <Route path="/analytics" component={Analytics}  />
                <Route path="/change-username" component={ChangeEmail}  />
                <Route path="/change-password" component={ChangePassword}  />
                <Route path="/login" component={Login} />
                <Route path="/edit-developer" component={EditDeveloper} />
                <Route path="/edit-attached-project" component={EditAttached} />
                <Route path="/edit-detached-project" component={EditDetached} />
                <Route path="/edit-duplex-project" component={EditDuplex} />
            </Fragment>
        )
    }
}

export default IndexRoute
