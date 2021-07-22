import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import AdminBar from '../dashboard/AdminBar'
import BACKEND_URL from '../../shared/_helpers/utils'
import ProjectTable from './ProjectTable'
import { connect } from 'react-redux'

export class DeveloperProject extends Component {
    render() {
        return (
            <AdminContainer developer={'active'}>
                <div className="h-p"></div>
                <AdminBar text="project" />
                <ProjectTable projects={this.props.developer.data.project} developer={this.props.developer.data.name} head='Developer Project List' />
            </AdminContainer>

        )
    }
}

export default connect((state) => {
    return {
        developer: state.developer
    }
})(DeveloperProject)