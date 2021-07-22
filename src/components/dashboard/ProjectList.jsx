import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import Tab from './Tab'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import ProjectTable from './ProjectTable'
import DetachedTable from './DetachedTable'
import debounce from 'lodash.debounce';
import '../../assest/css/easy-responsive-tabs.css'
import history from '../../shared/_helpers/history'
import $ from 'jquery'
import AdminBar from '../dashboard/AdminBar'

export class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()

        this.state = {
            body: [],
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

    handleProjectClick = (published) => {
        if (published === 1) {

        }
    }

    handleClick = (type) => {
        $('.dropdown-new.lft').css('display', 'none')
        if (type === 'all') {
            this.setState({
                body: this.props.projects.data
            })
        }
        if (type === 'condos') {
            let body = this.props.projects.data.filter((project) => project.type_id == 1 && project.condos !== null)
            // body.map(b => console.log(b.condos))

            this.setState({
                body
            })
        }
        if (type === 'townhouse') {
            let body = this.props.projects.data.filter((project) => project.type_id == 1 && project.townhouse !== null)
            // body.map(b => console.log(b.townhouse))
            this.setState({
                body
            })
        }
        if (type === 'rowhouse') {
            let body = this.props.projects.data.filter((project) => project.type_id == 1 && project.rowhouse !== null)
            // body.map(b => console.log(b.rowhouse))
            this.setState({
                body
            })
        }
        if (type === 'duplex') {
            this.setState({
                body: this.props.projects.data.filter((project) => project.type_id == 3)
            })
        }
        if (type === 'detached') {
            this.setState({
                body: this.props.projects.data.filter((project) => project.type_id == 2)
            })
        }
    }

    async componentDidMount() {

       
        if (!this.props.isLoggedIn.status) {
            history.push('/login')
        }
        await this.props.getProjects()
        if (this.props.projects.status === serviceConstant.GET_PROJECTS_SUCCESS) {
            this.setState({
                body: this.props.projects.data
            })
        }
    }

    componentDidUpdate = () => {
        ReactDOM.findDOMNode(this).scrollIntoView()
        // window.scrollTo(0, 0)
    }

    render() {
        return (
            <AdminContainer>
                <Fragment>
                    <div className="h-p" />
                    <ProjectTable projects={this.props.projects.data} head='PROJECTS LIST' />
                </Fragment>

            </AdminContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addProject: state.addProject,
        projects: state.projects,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    getProjects: apiCallAction.getProjects,
    delProject: apiCallAction.delProject,
    propertyData: apiCallAction.propertyData
})(ProjectList)
