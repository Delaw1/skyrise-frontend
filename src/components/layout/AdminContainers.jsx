import React, { Component, Fragment } from 'react'
import logo from '../../assest/images/logo.png'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import BACKEND_URL from '../../shared/_helpers/utils';
import Footer from './Footer'
import { appendScript } from '../../shared/utils/appendScript'
import history from '../../shared/_helpers/history'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import CheckBox from '../dashboard/Checkbox'
import { serviceConstant } from '../../redux/constants/apicall.constant'

export class AdminContainers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: null,
      city: null
    }
  }

  handleLogout = async () => {
    await this.props.logout()
    history.push('/login')
  }

  handleFilter = (name) => {
    let data
    let featured
    if (name === "Detached") {
      data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 2)
      featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 2)
    } else {
      data = this.props.projects.data.filter((project) => project.featured === 0 && project[name.toLowerCase()] !== null)
      featured = this.props.projects.data.filter((project) => project.featured === 1 && project[name.toLowerCase()] !== null)
    }

    if (this.state.city !== null) {
      data = data.filter((proj) => proj.city.search(this.state.city) !== -1)
      featured = featured.filter((proj) => proj.city.search(this.state.city) !== -1)
    }

    this.props.filPro(name, data, featured)
  }

  handleCity = (city) => {
    let data
    let featured
    let name = this.props.filterProperty.name

    if (this.state.city === city) {
      this.setState({
        city: null
      })

      if (name === "Detached") {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 2)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 2)
      } else {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project[name.toLowerCase()] !== null)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project[name.toLowerCase()] !== null)
      }

    } else {
      this.setState({
        city
      })

      if (name === "Detached") {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 2 && project.city.search(city) !== -1)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 2 && project.city.search(city) !== -1)
      } else {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project[name.toLowerCase()] !== null && project.city.search(city) !== -1)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project[name.toLowerCase()] !== null && project.city.search(city) !== -1)
      }

    }
    this.props.filPro(name, data, featured)
  }

  toggleClass = (tab) => {
    if (tab === "New projects") {

      history.push('/property')
    }
    this.state.activeTab === tab ? this.setState({ activeTab: null }) : this.setState({ activeTab: tab })
  }

  toggleSidebar = () => {
    document.body.classList.toggle("pushy-open-left")
  }

  componentDidMount() {
    appendScript("./js/pushy.min.js")
    // appendScript("./js/pushy.js")
    // this.props.filterProperty()

    // appendScript("https://unpkg.com/swiper/swiper-bundle.min.js")
    // appendScript("./js/swiper.js")
    // appendScript("./js/swiperjs.js")

    if (history.location.pathname === '/property') {
      this.setState({
        activeTab: "New projects"
      })
    }
  }
  render() {
    return (
      <Fragment>
        <div id="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand" href="#"><img src="images/logo.png" alt="Skyrise-logo" /></a>
            <button className="menu-btn d-none"><i className="zmdi zmdi-menu" /></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto ml-auto">
                <li className="nav-item dropdown">
                  {/* <a className="nav-link" href="/project-list" >
                    PROJECTS</a> */}
                  <div className="dropdown-menu bk" aria-labelledby="navbarDropdown">
                    <form>
                      <div className="input-space-white-scl">
                        <span className="dropdown-el">
                          <input type="radio" name="sortType1" defaultValue="City" defaultChecked="checked" id="City" /><label htmlFor="City">City</label>
                          <input type="radio" name="sortType1" defaultValue="City 1" id="City-one" /><label htmlFor="City-one">City 1</label>
                          <input type="radio" name="sortType1" defaultValue="City 2" id="City-two" /><label htmlFor="City-two">City 2</label>
                          <input type="radio" name="sortType1" defaultValue="City 1" id="City-three" /><label htmlFor="City-three">City 3</label>
                          <input type="radio" name="sortType1" defaultValue="City 1" id="City-four" /><label htmlFor="City-four">City 4</label>
                        </span>
                      </div>
                      <div className="input-space-white-scl">
                        <span className="dropdown-el">
                          <input type="radio" name="sortType" defaultValue="Relevance" defaultChecked="checked" id="Property" /><label htmlFor="Property">Property Type</label>
                          <input type="radio" name="sortType" defaultValue="Popularity" id="condos" /><label htmlFor="condos">Condos</label>
                          <input type="radio" name="sortType" defaultValue="PriceIncreasing" id="Townhouse" /><label htmlFor="Townhouse">Townhouse</label>
                          <input type="radio" name="sortType" defaultValue="PriceDecreasing" id="Row-house" /><label htmlFor="Row-house">Row house</label>
                          <input type="radio" name="sortType" defaultValue="ProductBrand" id="Duplex" /><label htmlFor="Duplex">1/2 Duplex</label>
                          <input type="radio" name="sortType" defaultValue="ProductName" id="Detached" /><label htmlFor="Detached">Detached house</label>
                        </span>
                      </div>
                      <div className="input-space-white mb-0">
                        <input type="submit" defaultValue="GO" />
                      </div>
                    </form>
                  </div>
                </li>
                <li className="nav-item active">
                  {/* <a className="nav-link" href="#">Contact <span className="sr-only">(current)</span></a> */}
                </li>
              </ul>
              
                <ul className="navbar-right ex-spcz">
                <li>
                {
                this.props.isLoggedIn.status === false ? <a href="#">SIGN UP</a>  : ''
              }
                </li>
                <li className=" dropdown">
                  <a className="hdl dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {
                this.props.isLoggedIn.status === false ?  "LOG IN" : ''
              }
          </a>
                  <div className="dropdown-menu dropdown-menu-right log" aria-labelledby="navbarDropdown">
                    <form className="login-form">
                      <div className="input-space-white">
                        <input type="email" placeholder="Email" />
                      </div>
                      <div className="input-space-white">
                        <input type="password" placeholder="Password" />
                      </div>
                      <div className="input-space-white">
                        <input type="submit" defaultValue="LOGIN" />
                      </div>
                      <a href="javascript:void(0)" className="white-link forgot">Forgot your password?</a>
                    </form>
                    <form className="forgot-form">
                      <div className="input-space-white">
                        <input type="email" placeholder="Enter recovery email" />
                      </div>
                      <div className="input-space-white">
                        <input type="submit" defaultValue="RECOVER PASSWORD" />
                      </div>
                    </form>
                  </div>
                </li>
                <li>
                  <button className="menu-btn"><i className="zmdi zmdi-menu" /></button>
                </li>
              </ul>
            
               
              </div>
          </nav>
        </div>

        <nav className="pushy pushy-right" data-focus="#first-link">
          <div className="pushy-content">
            <ul>
              <li className="pushy-link"><a href="#">HOME</a></li>
              <li className="pushy-submenu">
                <button>PROJECTS<span></span></button>
                <ul className="sub-ul">
                  <li className="pushy-link"><Link to="/project-list">Project List</Link></li>
                  <li className="pushy-link"><Link to="/add-duplex">Add duplex project</Link></li>
                  <li className="pushy-link"><Link to="/add-attached">Add attached project</Link></li>
                  <li className="pushy-link"><Link to="/add-detached">Add detached project</Link></li>
                </ul>
              </li>
              <li className="pushy-submenu">
                <button>DEVELOPERS</button>
                <ul className="sub-ul">
                  <li className="pushy-link"><Link to="/developer-list">Developers list</Link></li>
                  <li className="pushy-link"><Link to="/add-developer">Add developer</Link></li>
                </ul>
              </li>
              <li className="pushy-submenu">
                <button>ACCOUNT SETTINGS</button>
                <ul className="sub-ul">
                  <li className="pushy-link"><Link to="/change-username">Change Username</Link></li>
                  <li className="pushy-link"><Link to="/change-password">Change Password</Link></li>
                </ul>
              </li>
              {this.props.isLoggedIn.status ? <li onClick={this.handleLogout} className="pushy-link"><Link>Logout</Link></li> : ''}
              
            </ul>
          </div>
        </nav>

        <div className="clearfix" />

        {this.props.children}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addProject: state.addProject,
    projects: state.projects,
    filterProperty: state.filterProperty,
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, {
  getProjects: apiCallAction.getProjects,
  delProject: apiCallAction.delProject,
  filPro: apiCallAction.filterProperty,
  logout: () => { return { type: serviceConstant.LOGOUT_SUCCESS } }
})(AdminContainers)