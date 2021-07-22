import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import AdminBar from '../dashboard/AdminBar'

export class Analytics extends Component {
    render() {
        return (
            <AdminContainer developer={'active'}>
                <div className="h-p"></div>
                <AdminBar text="analytics" />
                
            </AdminContainer>
        )
    }
}

export default Analytics
