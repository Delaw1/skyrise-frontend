import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'
import Alert from './Alert';
import axios from 'axios'
import { BASEURL } from '../../services/url'

export class EditDeveloper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            contact_email: '',
            country: '',
            address_suggestion: []
        }
    }

    handleChange = (e) => {
        if (e.target.name === 'address') {
            console.log(e.target.name.length)
            if (e.target.value.length > 2) {
                axios.get(BASEURL + '/address/' + e.target.value).then(resp => {
                    // console.log(resp.data.predictions)
                    this.setState({
                        address_suggestion: resp.data.predictions
                    })
                })
            }
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleValidation = () => {
        const { name, contact_email, country } = this.state
        let check = false
        if (name === "" || contact_email === "" || country === "") {
            check = true
        }
        return check
    }

    handleSubmit = () => {
        if (this.handleValidation()) {
            // console.log('yes')
            this.setState({
                error: "All fields are required"
            })
            window.scroll(0, 0)
        } else {
            this.props.dispatch(apiCallAction.editDevelper(this.state))
        }
    }

    handleCancel = () => {
        history.push('/developer-list')
    }

    componentDidMount() {
        if (!this.props.isLoggedIn.status) {
            history.push('/login')
        }
        this.setState({
            ...this.props.developer.data
        })
    }

    componentDidUpdate() {

        if (this.props.addDeveloper.status == serviceConstant.CREATE_DEVELOPER_SUCCESS) {

            this.props.dispatch({ type: serviceConstant.CREATE_DEVELOPER_CLEAR })
            history.push('/developer-list')
        }
    }

    render() {
        const { error } = this.state
        const { developer } = this.props
        return (
            <AdminContainer developer={'active'}>
                <div>
                    <div className="h-p" />
                    <div className="inner-area">
                        <div className="container-fluid">
                            {error ? <Alert addclass="alert-warning" msg={error} /> : ""}
                            <h2 className="admin-heading clearfix">COMPANY PROFILE</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="input-space">
                                        <label htmlFor>Company name</label>
                                        <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space">
                                        <label htmlFor>Website</label>
                                        <input type="text" value={this.state.website} name="website" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space">
                                        <label htmlFor>Email</label>
                                        <input type="email" value={this.state.contact_email} name="contact_email" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space mb-0">
                                        <label htmlFor>Phone</label>
                                        <input type="tel" value={this.state.contact_phone} name="contact_phone" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <h2 className="admin-heading-sub">COMPANY ADDRESS</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="input-space">
                                        <label htmlFor>Address</label>
                                        <input type="text" list="address" value={this.state.address} name="address" onChange={this.handleChange} />
                                        <datalist id="address">
                                            {this.state.address_suggestion.map((add, i) => <option key={i} value={add.description} />)}
                                        </datalist>
                                    </div>
                                    <div className="input-space">
                                        <label htmlFor>Unit</label>
                                        <input type="text" value={this.state.unit} name="unit" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space">
                                        <label htmlFor>City</label>
                                        <input type="text" value={this.state.city} name="city" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space">
                                        <label htmlFor>Province / State</label>
                                        <input type="text" value={this.state.province} name="province" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space">
                                        <label htmlFor>Country</label>
                                        <input type="text" value={this.state.country} name="country" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space mb-0">
                                        <label htmlFor>Postal / Zip code</label>
                                        <input type="text" value={this.state.postal_code} name="postal_code" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-space ex-top">
                                        <input type="submit" value="Cancel" onClick={this.handleCancel} />
                                    </div>
                                    <div className="input-space">
                                        {/* <input type="submit" value="Cancel" onClick={this.handleCancel} /> */}
                                        <input type="submit" value={this.props.addDeveloper.status === serviceConstant.CREATE_DEVELOPER_PENDING ? "Saving..." : "Save Developer"} onClick={this.handleSubmit} />
                                    </div>
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

const mapStateToProps = (state) => {
    return {
        addDeveloper: state.addDeveloper,
        isLoggedIn: state.isLoggedIn,
        developer: state.developer
    }
}

export default connect(mapStateToProps, null)(EditDeveloper)
