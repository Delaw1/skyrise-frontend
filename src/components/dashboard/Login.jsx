import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import { serviceConstant } from '../../redux/constants/apicall.constant'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import axios from 'axios'
import { BASEURL } from '../../services/url';
import { isLoggedIn } from '../../redux/reducers/apicall.reducer';
import history from '../../shared/_helpers/history'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            error: "",
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async () => {
        this.props.pending()
        const { email, password } = this.state
        if (email === "" || password === "") {
            this.setState({
                error: "All fields are required"
            })
            this.props.failure()
        } else {
            const data = {
                email, password
            }
            axios.post(BASEURL + '/login', data)
                .then(async (resp) => {
                    if (resp.data.status === 'failure') {
                        this.setState({
                            error: resp.data.message
                        })
                        this.props.failure()
                    } else {
                        await this.props.login()
                        history.push('/project-list')
                    }
                })
                .catch((e) => {

                })
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn.status) {
            history.push('/project-list')
        }
    }

    render() {
        return (
            <AdminContainer>
                <div id="container">
                    <div className="container-fluid">
                        <div class="alert alert-warning" style={{ display: this.state.error !== "" ? 'block' : 'none' }}>
                            {this.state.error}.
                        </div>
                        <div className="w-100 pt-1">
                            <div class="alert alert-warning" style={{ display: this.state.error !== "" ? 'block' : 'none' }}>
                                {this.state.error}.
                            </div>


                            <div className="row">
                                <div className="col-md-12 form-div admin-info">
                                    <div className="row">
                                        <div className="col-lg-4"></div>
                                        <div className="col-lg-4 pr-lg-5 form-div admin-info">
                                            <h2 className="page-h">
                                                LOGIN
                            </h2>
                                            <div className="w-100">
                                                <label htmlFor="email">Username</label>
                                                <input type="text" id="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Username" value={this.state.email} />
                                            </div>
                                            <div className="w-100  mt-3">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" id="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                                            </div>
                                            <div className="w-100  mt-3">
                                                <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.isLoggedIn.request === serviceConstant.LOGIN_PENDING ? "Loading..." : "Sign In"} onClick={this.handleSubmit} />
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
    pending: () => { return { type: serviceConstant.LOGIN_PENDING } },
    failure: () => { return { type: serviceConstant.LOGIN_FAILURE } }
})(Login)
