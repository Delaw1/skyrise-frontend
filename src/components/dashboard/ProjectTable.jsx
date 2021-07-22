import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import Tab from './Tab'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
// import ProjectTable from './ProjectTable'
import DetachedTable from './DetachedTable'
import debounce from 'lodash.debounce';
import '../../assest/css/easy-responsive-tabs.css'
import history from '../../shared/_helpers/history'
import $ from 'jquery'
import AdminBar from '../dashboard/AdminBar'
import { DropdownButton, Dropdown } from 'react-bootstrap';

export class ProjectTable extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()

        this.state = {
            body: [{}],
            active: 0,
            isLoading: false,
            isActive: 'attached',
            error: ''
        }

        window.onscroll = debounce(() => {
            const { loadList, state: { isLoading } } = this

            if (isLoading) return

            if (
                window.innerHeight === document.documentElement.offsetHeight
            ) {
                // loadList()
            }
            // console.log(window.innerHeight)
            // console.log(document.documentElement.scrollTop)
            // console.log(document.documentElement.offsetHeight)
        }, 100)
    }

    loadList = () => {

        this.setState({ isLoading: true }, () => {
            this.props.getProjects()
            this.setState({ isLoading: false })
        })
    }

    handleTab = (name) => {
        this.setState({
            isActive: name,
            error: this.state[name].length === 0 ? 'No ' + name + ' project' : ''
        })
    }

    handleAttached = (e) => {
        const name = e.target.value
        if (name === 'attached') {
            const body = this.state.attached
            this.setState({
                body,
                error: body.length === 0 ? 'No ' + name + ' project' : ''
            })
        } else {
            const body = this.state.attached.filter((project) => project[name] && project)
            this.setState({
                body,
                error: body.length === 0 ? 'No ' + name + ' project' : ''
            })
            window.scrollTo(0, 0)
        }
    }

    handleDelete = async (project) => {
        if (window.confirm("Are you sure you want to delete " + project.name + "?")) {
            await this.props.delProject(project.id)
            window.location.reload(false);
        }
    }

    handleEdit = async (project) => {
        this.props.propertyData(project)
        // console.log(project)
        if (project.type_id == 1) {
            history.push("/edit-attached-project")
        }
        if (project.type_id == 2) {
            history.push("/edit-detached-project")
        }
        if (project.type_id == 3) {
            history.push("/edit-duplex-project")
        }
    }

    handleEditDetached = async (project) => {
        this.props.propertyData(project)
        history.push("/edit-detached-project")
    }

    handleProjectClick = (project) => {
        if (project.published == 1) {
            window.open('https://skyriseprojects.com/project-info/'+project.type_id+'/'+project.id, "_blank")
        }
    }

    handleClick = (type) => {
        $('.dropdown-new.lft').css('display', 'none')
        if (type === 'all') {
            this.setState({
                body: this.props.projects
            })
        }
        if (type === 'condos') {
            let body = this.props.projects.filter((project) => project.type_id == 1 && project.condos !== null)
            // body.map(b => console.log(b.condos))

            this.setState({
                body
            })
        }
        if (type === 'townhouse') {
            let body = this.props.projects.filter((project) => project.type_id == 1 && project.townhouse !== null)
            // body.map(b => console.log(b.townhouse))
            this.setState({
                body
            })
        }
        if (type === 'rowhouse') {
            let body = this.props.projects.filter((project) => project.type_id == 1 && project.rowhouse !== null)
            // body.map(b => console.log(b.rowhouse))
            this.setState({
                body
            })
        }
        if (type === 'duplex') {
            this.setState({
                body: this.props.projects.filter((project) => project.type_id == 3)
            })
        }
        if (type === 'detached') {
            this.setState({
                body: this.props.projects.filter((project) => project.type_id == 2)
            })
        }
    }

    async componentDidMount() {

        $('body').click(function (evt) {
            if (evt.target.id == "nav")
                return;
            if ($(evt.target).closest('#nav').length || $(evt.target).closest('#nav-r').length) {
            } else {
                $('.dropdown-new.lft').css('display', 'none');
                $('.lat').removeClass('active');

                $('.dropdown-proj').css('display', 'none')
                $('.lgt').removeClass('active');
                //     evt.stopPropagation();
                //  evt.preventDefault();
            }

            return;
        });
        $('.lat').click(function () {
            if ($('.dropdown-new.lft').css('display') == 'none') {
                $('.lat').addClass('active');
                $('.dropdown-new.lft').css('display', 'block')
            } else {
                $('.lat').removeClass('active');
                $('.dropdown-new.lft').css('display', 'none')
            }
        })
        $('.lgt').click(function () {
            if ($('.dropdown-proj').css('display') == 'none') {
                $('.lgt').addClass('active');
                $('.dropdown-proj').css('display', 'block')
            } else {
                $('.lgt').removeClass('active');
                $('.dropdown-proj').css('display', 'none')
            }
        })
        if (!this.props.isLoggedIn.status) {
            history.push('/login')
        }
        // await this.props.getProjects()
        this.setState({
            body: this.props.projects
        })
        console.log(this.props.projects)

    }

    componentDidUpdate = () => {
        ReactDOM.findDOMNode(this).scrollIntoView()
        // window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="inner-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8">
                            <div className="heading-menu clearfix m-60">
                                <div id="nav">
                                    <a className="dropdown-toggle-new lat" href>{this.props.head} <i className="zmdi zmdi-caret-down" /></a>
                                    <ul className="dropdown-new nwa lft" style={{ display: 'none' }}>
                                        <li>
                                            <a href="#">
                                                <div className="control-group">
                                                    <label className="control control-radio drp-c" onClick={() => this.handleClick('all')}>
                                                        View all
                                                        <input type="radio" name="radio" />
                                                        <div className="control_indicator" />
                                                    </label>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="control-group" onClick={() => this.handleClick('condos')}>
                                                    <label className="control control-radio drp-c" >
                                                        Condos
                                                        <input type="radio" name="radio" />
                                                        <div className="control_indicator" />
                                                    </label>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="control-group">
                                                    <label className="control control-radio drp-c" onClick={() => this.handleClick('townhouse')}>
                                                        Townhouse
                                                        <input type="radio" name="radio" />
                                                        <div className="control_indicator" />
                                                    </label>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="control-group">
                                                    <label className="control control-radio drp-c" onClick={() => this.handleClick('rowhouse')}>
                                                        Row house
                                                        <input type="radio" name="radio" />
                                                        <div className="control_indicator" />
                                                    </label>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="control-group">
                                                    <label className="control control-radio drp-c" onClick={() => this.handleClick('duplex')}>
                                                        1/2 duplex
                                                        <input type="radio" name="radio" />
                                                        <div className="control_indicator" />
                                                    </label>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="control-group">
                                                    <label className="control control-radio drp-c" onClick={() => this.handleClick('detached')}>
                                                        Detached house
                                                        <input type="radio" name="radio" />
                                                        <div className="control_indicator" />
                                                    </label>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div id="nav-r">
                                <a className="dropdown-toggle-proj lgt" href="#">Add project</a>
                                <ul className="dropdown-proj" style={{ display: 'none' }}>
                                    <li><a href="/add-attached">Attached: Condos</a></li>
                                    <li><a href="/add-attached">Attached: Townhouse</a></li>
                                    <li><a href="/add-attached">Attached: Row house</a></li>
                                    <li><a href="/add-duplex">Attached: 1/2 Duplex</a></li>
                                    <li><a href="/add-detached">Detached house</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table className="prj-list">
                        <thead>
                            <tr>
                                <th width="25%" scope="col">PROJECT</th>
                                <th width="25%" scope="col">DEVELOPER</th>
                                <th width="15%" scope="col">PROPERTY TYPE</th>
                                <th width="15%" scope="col">COMMISSION</th>
                                <th width="10%" scope="col">PRICE</th>
                                <th width="5%" scope="col">STATUS</th>
                                {/* <th width="5%" scope="col" className="text-right">EDIT</th>
                                        <th width="5%" scope="col" className="text-right">DELETE</th> */}
                                <th width="10%" scope="col" className="text-right">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.projects.map((project, i) => {
                                project.spec = ''
                                if (project.condos !== null) {
                                    project.spec = 'condos'
                                }
                                if (project.townhouse !== null) {
                                    project.spec = 'townhouse'
                                }
                                if (project.rowhouse !== null) {
                                    project.spec = 'rowhouse'
                                }
                                return <tr>
                                    <td data-label="PROJECT" onClick={() => this.handleProjectClick(project)}>{project.name} {project.published == 0 ? <span className="red">(Not published)</span> : ''}</td>
                                    <td data-label="DEVELOPER">{this.props.developer ? this.props.developer : project.developer ? project.developer.name : ''}</td>
                                    <td data-label="PROPERTY TYPE">{project.type_id == 1 ? 'Attached house/' + project.spec : project.type_id == 2 ? 'Detached house' : 'Duplex'}</td>
                                    <td data-label="COMMISSION">3.255%, 1.1625%</td>
                                    <td data-label="PRICE">{project.price}</td>
                                    <td data-label="STATUS">{project.status}</td>
                                    {/* <td data-label="ACTION" className="text-right" style={{ cursor: 'pointer' }} onClick={() => this.handleEdit(project)} ><a href>Edit</a></td>
                                            <td data-label="ACTION" className="text-right" style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(project)}><a href>Delete</a></td> */}

                                    <td data-label="ACTION" className="text-right" style={{ cursor: 'pointer' }} >
                                        {/* <div className="dropdown">
                                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Activity
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" href="#" onClick={() => this.handleEdit(project)}>Edit</a>
                                                        <a className="dropdown-item" href="#" onClick={() => this.handleDelete(project)}>Delete</a>
                                                    </div>
                                                </div> */}
                                        <DropdownButton id="dropdown-basic-button" title="Action">
                                            <Dropdown.Item href="#" onClick={() => this.handleEdit(project)}>Edit</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => this.handleDelete(project)}>Delete</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            }
                            )}

                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        addProject: state.addProject,
        // projects: state.projects,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    getProjects: apiCallAction.getProjects,
    delProject: apiCallAction.delProject,
    propertyData: apiCallAction.propertyData
})(ProjectTable)
