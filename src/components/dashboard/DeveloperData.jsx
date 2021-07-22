import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import AdminBar from '../dashboard/AdminBar'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'

export class DeveloperData extends Component {
    render() {
        const { developer } = this.props
        return (
            <AdminContainer developer={'active'}>
                <div className="h-p"></div>
                <AdminBar text="account" />
                <div className="inner-area">
                    <div className="container-fluid">
                        <h2 className="admin-heading clearfix">COMPANY PROFILE</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="input-space">
                                    <label htmlFor>Company name</label>
                                    <input type="text" value={developer.data.name} readOnly />
                                </div>
                                <div className="input-space">
                                    <label htmlFor>Website</label>
                                    <input type="text" value={developer.data.website} readOnly />
                                </div>
                                <div className="input-space mb-0">
                                    <label htmlFor>Phone</label>
                                    <input type="tel" value={developer.data.contact_phone} readOnly />
                                </div>
                            </div>
                        </div>
                        <h2 className="admin-heading-sub">COMPANY ADDRESS</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="input-space">
                                    <label htmlFor>Address</label>
                                    <input type="text" value={developer.data.address} readOnly />
                                </div>
                                <div className="input-space">
                                    <label htmlFor>City</label>
                                    <input type="text" value={developer.data.city} readOnly />
                                </div>
                                <div className="input-space">
                                    <label htmlFor>Province / State</label>
                                    <input type="text" value={developer.data.province} readOnly />
                                </div>
                                <div className="input-space">
                                    <label htmlFor>Country</label>
                                    <input type="text" value={developer.data.country} readOnly />
                                </div>
                                <div className="input-space">
                                    <label htmlFor>Postal / Zip code</label>
                                    <input type="text" value={developer.data.postal_code} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-p" />
            </AdminContainer>
        )
    }
}

export default connect((state) => {
    return {
        developer: state.developer
    }
})(DeveloperData)
