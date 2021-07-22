import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import AdminBar from '../dashboard/AdminBar'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'
import axios from 'axios'
import { routes } from '../../services/url'
import { DropdownButton, Dropdown } from 'react-bootstrap';

export class DeveloperList extends Component {

    handleClick = (developer) => {
        this.props.getDeveloper(developer)
        history.push('/developer-dashboard')
    }

    handleEdit = (developer) => {
        this.props.getDeveloper(developer)
        history.push('/edit-developer')
    }

    handleDelete = (developer) => {
        if (window.confirm("Are you sure you want to delete " + developer.name + "?")) {
            axios.post(routes.DELETEDEVELOPER, developer).then((resp) => {
                window.location.reload(false);
            }).catch((e) => {
                alert("Network problem. Try again")
            })
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn.status) {
            history.push('/login')
        }
        this.props.getDevelopers()
    }
    render() {
        return (
            <AdminContainer>
                <div>
                    <div className="h-p" />
                    {/* <AdminBar text="dash" /> */}
                    <div className="inner-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <h2 className="admin-heading clearfix">DEVELOPERS LIST</h2>
                                </div>
                                <div className="col-4"><a href="/add-developer" className="blue-link">Add developer</a></div>
                            </div>
                            <table className="prj-list">
                                <thead>
                                    <tr>
                                        <th width="20%" scope="col">DEVELOPER</th>
                                        <th width="20%" scope="col">COUNTRY</th>
                                        <th width="15%" scope="col">PROJECTS</th>
                                        <th width="15%" scope="col">CONTACT</th>
                                        <th width="15%" scope="col">EMAIL</th>
                                        <th width="10%" scope="col">WEBSITE</th>
                                        {/* <th width="5%" scope="col" className="text-right">EDIT</th>
                                        <th width="5%" scope="col" className="text-right">DELETE</th> */}
                                        <th width="10%" scope="col" className="text-right">Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.developers.status === serviceConstant.GET_DEVELOPERS_SUCCESS ?
                                        this.props.developers.data.map((developer, i) => {
                                            const pub = developer.project.filter((proj, i) => proj.published == 1)
                                            console.log(pub)
                                            return <tr kry={i} >
                                                <td data-label="DEVELOPER" style={{ wordWrap: 'break-word' }} onClick={() => this.handleClick(developer)} style={{ cursor: 'pointer' }}>
                                                    {developer.name}
                                                </td>
                                                <td data-label="COUNTRY" style={{ wordWrap: 'break-word' }} >{developer.country}</td>
                                                <td data-label="PROJECTS" style={{ wordWrap: 'break-word' }} > {pub.length}/{developer.project.length}</td>
                                                <td data-label="CONTACT" style={{ wordWrap: 'break-word' }} >{developer.contact_phone}</td>
                                                <td data-label="EMAIL" style={{ wordWrap: 'break-word' }} >{developer.contact_email}</td>
                                                <td data-label="WEBSITE" style={{ wordWrap: 'break-word' }} >{developer.website}</td>
                                                {/* <td data-label="ACTION" className="text-right" style={{ cursor: 'pointer' }} onClick={() => this.handleEdit(developer)}><a href>Edit</a></td> */}
                                                <td data-label="ACTION" className="text-right" style={{ cursor: 'pointer' }} >
                                                    <DropdownButton id="dropdown-basic-button" title="Action">
                                                        <Dropdown.Item href="#" onClick={() => this.handleEdit(developer)}>Edit</Dropdown.Item>
                                                        <Dropdown.Item href="#" onClick={() => this.handleDelete(developer)}>Delete</Dropdown.Item>
                                                    </DropdownButton>
                                                </td>
                                            </tr>
                                        })
                                        : 'loading...'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </AdminContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addProject: state.addProject,
        developers: state.developers,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    getDevelopers: apiCallAction.getDevelopers,
    getDeveloper: apiCallAction.getDeveloper,
})(DeveloperList)
