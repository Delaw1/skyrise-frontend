import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import { serviceConstant } from '../../redux/constants/apicall.constant'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import axios from 'axios'
import { BASEURL } from '../../services/url';
import { isLoggedIn } from '../../redux/reducers/apicall.reducer';
import history from '../../shared/_helpers/history'

export class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            error: "",
            old_password: "",
            new_password: "",
            success: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async () => {
        this.setState({
            error: "",
            success: ""
        })
        const { old_password, new_password } = this.state
        if (old_password === "" || new_password === "") {
            this.setState({
                error: "All fields are required"
            })
        } else {
            const data = {
                old_password, new_password
            }
            axios.post(BASEURL + '/changePassword', data)
                .then(async (resp) => {
                    console.log(resp)
                    if (resp.data.status === 'failure') {
                        this.setState({
                            error: resp.data.message
                        })
                    } else {
                        this.setState({
                            success: resp.data.message
                        })
                    }
                })
                .catch((e) => {

                })
        }
    }

    componentDidMount() {
        // if (this.props.isLoggedIn.status) {
        //     history.push('/')
        // }
    }

    render() {
        return (
            <AdminContainer>
                <div id="container">
                    <div className="container-fluid">
                        <div class="alert alert-warning" style={{ display: this.state.error !== "" ? 'block' : 'none' }}>
                            {this.state.error}.
                        </div>
                        <div class="alert alert-success" style={{ display: this.state.success !== "" ? 'block' : 'none' }}>
                            {this.state.success}.
                        </div>
                        <div className="w-100 pt-1">
                            <div class="alert alert-warning" style={{ display: this.state.error !== "" ? 'block' : 'none' }}>
                                {this.state.error}.
                            </div>
                            <div class="alert alert-success" style={{ display: this.state.success !== "" ? 'block' : 'none' }}>
                                {this.state.success}.
                            </div>

                            <div className="row">
                                <div className="col-md-12 form-div admin-info">
                                    <div className="row">
                                        <div className="col-lg-4"></div>
                                        <div className="col-lg-4 pr-lg-5 form-div admin-info">
                                            <h2 className="page-h">
                                                Change Password
                            </h2>
                                            <div className="w-100">
                                                <label htmlFor="old_password">Old Password</label>
                                                <input type="password" id="old_password" className="form-control" name="old_password" onChange={this.handleChange} placeholder="Old Password" value={this.state.old_password} />
                                            </div>
                                            <div className="w-100  mt-3">
                                                <label htmlFor="new_password">New Password</label>
                                                <input type="password" id="new_password" className="form-control" name="new_password" placeholder="New Password" onChange={this.handleChange} value={this.state.new_password} />
                                            </div>
                                            <div className="w-100  mt-3">
                                                <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.gs.status === serviceConstant.SAVE_GS_PENDING ? "Loading..." : "Save"} onClick={this.handleSubmit} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">

                            </div>


                        </div>
                    </div>
                </div>
                <div className="f-spc"></div>
                <div className="clearfix"></div>
            </AdminContainer>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        gs: state.gs,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    login: apiCallAction.login,
    getGS: apiCallAction.getGS,
    updateGS: apiCallAction.updateGS,
    clearSave: () => { return { type: serviceConstant.SAVE_GS_CLEAR } }
})(ChangePassword)
