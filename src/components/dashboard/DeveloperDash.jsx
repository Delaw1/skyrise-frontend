import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import AdminBar from '../dashboard/AdminBar'
import { connect } from 'react-redux'

export class DeveloperDash extends Component {
    render() {
        return (
            <AdminContainer developer={'active'}>
                <div className="h-p"></div>
                <AdminBar text="dash" />
                <div className="inner-area">
                    <div className="container-fluid">
                        <h2 className="admin-heading clearfix">{this.props.developer.data.name}</h2>
                        
                    </div>
                </div>
            </AdminContainer>
        )
    }
}

export default connect((state) => {
    return {
        developer: state.developer
    }
})(DeveloperDash)
