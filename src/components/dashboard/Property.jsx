import React, { Component, Fragment } from 'react'
import AdminContainer from '../layout/AdminContainers'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { filterProperty } from '../../redux/reducers/apicall.reducer';
import { serviceConstant } from '../../redux/constants/apicall.constant'
import { BASEURL } from '../../services/url';
import history from '../../shared/_helpers/history'
import Map from './Map'

export class Property extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    handleClick = (project) => {
        this.props.propertyData(project)
        history.push("/property-data")
    }


    async componentDidMount () {
        await this.props.getProjects()
        if (this.props.projects.status === "GET_PROJECTS_SUCCESS") {
            console.log('glory')
            let data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 1 && project.commercial !== null)
            let featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 1 && project.commercial !== null)
            this.props.filPro('Commercial', data, featured)
        }
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps() {
        // console.log('success')
        
    }

    render() {
         return (
            <AdminContainer>
                <div class="clearfix"></div>
                <div id="container">
                    <div className="w-100">
                        <div className="w-100 mp-top">
                            {/* <iframe width="100%" height={600} id="gmap_canvas" src="https://maps.google.com/maps?q=United%20States&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /> */}
                            <Map />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="w-100">
                            <div className="row spc-zero">
                                <div className="col-md-12">
                                    <h2 className="page-heading mg">
                                        FEATURED {this.props.filterProperty.name.toUpperCase()} PROJECT
                                    </h2>
                                </div>
                                {this.props.filterProperty.featured.map((project, i) =>
                                    <div key={i} className="col-md-4 mt-2 p-r-15" onClick={() => this.handleClick(project)}>
                                        <a>
                                            <img src={BASEURL + "/uploads/" + project.images[0]} className="img-fluid w-100  fx-hs" alt="" />
                                        </a><div className="p-bx"><a>
                                            <h4 className="thumb-heading mb-1">
                                                {project.address}
                                            </h4></a>
                                            <p className="page-para m-40">
                                                {project.city} <span className="pipe">|</span> From ${project.price}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="col-md-12">
                                    <h2 className="page-heading psc">
                                        {this.props.filterProperty.name.toUpperCase()} PROJECT
          </h2>
                                </div>
                                {this.props.filterProperty.data.map((project, i) =>
                                    <div key={i} className="col-md-4 mt-4 p-r-15">
                                        <a>
                                            <img src={BASEURL + "/uploads/" + project.images[0]} className="img-fluid w-100 fx-hs" alt="" />
                                        </a><div className="p-bx"><a>
                                            <h4 className="thumb-heading mb-1">
                                                {project.address}
                                            </h4></a>
                                            <p className="page-para m-40">
                                                {project.city} <span className="pipe">|</span> From ${project.price}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </AdminContainer>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        addProject: state.addProject,
        projects: state.projects,
        filterProperty: state.filterProperty
    }
}

export default connect(mapStateToProps, {
    getProjects: apiCallAction.getProjects,
    delProject: apiCallAction.delProject,
    filPro: apiCallAction.filterProperty,
    propertyData: apiCallAction.propertyData
})(Property)
