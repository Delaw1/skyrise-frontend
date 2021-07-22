import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import AdminContainer from '../layout/AdminContainers'
import { APIKEY } from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import axios from 'axios'
import { BASEURL } from '../../services/url'
import history from '../../shared/_helpers/history'

export class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            amenity: {
                name: ''
            },
            isActive: 'company',
            video_link: '',
            videos: [],
            error: '',
            address_suggestion: []
        }
    }

    handleChange = (e) => {
        const { updateGS } = this.props
        if (e.target.name === 'address') {
            console.log(e.target.name.length)
            if (e.target.value.length > 3) {
                axios.get(BASEURL + '/address/' + e.target.value).then(resp => {
                    // console.log(resp.data.predictions)
                    this.setState({
                        address_suggestion: resp.data.predictions
                    })
                })
            }
        }
        updateGS(e.target.name, e.target.value)
    }

    handleVideoLink = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleVideo = async () => {
        const { updateGS } = this.props
        const video_id = this.state.video_link.split("v=")[1]
        if (video_id === undefined || video_id === null) {
            this.setState({
                error: "Video link should a youtube video",
                video_link: ''
            })
            window.scrollTo(0, 0)
        } else {
            let title = ''
            const url = "https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + APIKEY + "&part=snippet,contentDetails,statistics,status"
            await axios.get(url).then(resp => title = resp.data.items[0].snippet.title)
            console.log(title)
            updateGS('videos', [{ id: video_id, title }, ...this.props.gs.data.videos])
        }

    }

    handleVideoDelete = (index) => {
        const { updateGS } = this.props
        let newVideos = this.props.gs.data.videos.filter((image, i) => i !== index)
        updateGS('videos', newVideos)
    }

    handleAmenity = (e) => {
        this.setState({
            [e.target.name]: {
                name: e.target.value,
                checked: false
            }
        })
    }

    saveAmenity = () => {
        const { updateGS } = this.props
        if (this.state.amenity.name == '') {
            this.setState({
                error: "Field cant be empty"
            })
        } else {
            if (this.props.gs.data.amenities.length !== 0) {
                updateGS('amenities', [this.state.amenity, ...this.props.gs.data.amenities])
            } else {
                updateGS('amenities', [this.state.amenity])
            }
            this.setState({
                amenity: {
                    name: ''
                }
            })
        }
    }

    deleteAmenity = (amenity) => {
        const { updateGS } = this.props
        let amenities = this.props.gs.data.amenities
        amenities = amenities.filter((data, i) => i !== amenity)
        updateGS('amenities', amenities)
    }

    deleteEmail = async (id, j) => {
        const { updateGS } = this.props
        let newsletters = this.props.gs.data.newsletters
        newsletters = newsletters.filter((data, i) => i !== j)
        axios.post(BASEURL + '/removeEmail', {id}).then((resp) => {
            if(resp.data.status === 'success') {
                updateGS('newsletters', newsletters)
            }
        }).catch(e => {
            alert("Network error")
        })
        
    }

    handleTab = (name) => {
        this.setState({
            isActive: name
        })
        window.scrollTo(0, 0)
    }

    handleSubmit = () => {
        const { saveGS } = this.props
        saveGS(this.props.gs.data)
    }
    componentDidMount() {
        this.props.getGS()
    }

    componentDidUpdate() {
        if(!this.props.isLoggedIn.status) {
            history.push('/login')
        }
        if (this.props.gs.status === serviceConstant.SAVE_GS_SUCCESS) {
            this.setState({
                error: "Admin details updated successfully"
            })
            this.props.clearSave()
        }
        ReactDOM.findDOMNode(this).scrollIntoView()
        // window.scrollTo(0, 0)
    }
    componentWillReceiveProps() {
        if (this.props.gs.status === serviceConstant.GET_GS_SUCCESS) {
            this.setState({
                data: this.props.gs.data
            })
        }
    }
    render() {
        // {this.props.gs.status === serviceConstant.GET_GS_SUCCESS ? }
        return (
            <AdminContainer admin={'active'}>
                <div id="container">
                    <div className="container-fluid">
                        <div class="alert alert-warning" style={{ display: this.state.error !== '' ? 'block' : 'none' }}>
                            {this.state.error}.
            </div>
                        <div className="w-100 pt-1">
                            <div class="alert alert-warning" style={{ display: this.state.error !== '' ? 'block' : 'none' }}>
                                {this.state.error}.
            </div>


                            <h2 className="page-h">
                                ADMIN INFO
                            </h2>
                            <div className="tabs">
                                <div className="tab-button-outer">
                                    <ul id="tab-button">
                                        <li className={this.state.isActive === 'company' ? 'is-active' : ''} onClick={() => this.handleTab('company')}><a >Company info</a></li>
                                        <li className={this.state.isActive === 'amenities' ? 'is-active' : ''} onClick={() => this.handleTab('amenities')}><a >Amenities</a></li>
                                        <li className={this.state.isActive === 'video' ? 'is-active' : ''} onClick={() => this.handleTab('video')}><a >Videos</a></li>
                                        <li className={this.state.isActive === 'email' ? 'is-active' : ''} onClick={() => this.handleTab('email')}><a >Newsletter emails</a></li>
                                    </ul>
                                </div>
                                <div id="tab01" className="tab-contents" style={{ display: this.state.isActive === 'company' ? "block" : "none" }}>
                                    <div className="row">
                                        <div className="col-md-7 form-div admin-info">
                                            <div className="row">
                                                <div className="col-md-6 pr-md-5 form-div admin-info">
                                                    <div className="w-100">
                                                        <label htmlFor="c-name">Company name</label>
                                                        <input type="text" id="c-name" className="form-control" name="company_name" onChange={this.handleChange} placeholder="name" value={this.props.gs.data.company_name} />
                                                    </div>
                                                    <div className="w-100  mt-3">
                                                        <label htmlFor="Address">Address</label>
                                                        <input type="text" list="address" id="Address" className="form-control" name="address" placeholder="Address" onChange={this.handleChange} value={this.props.gs.data.address} />
                                                       
                                                        <datalist id="address">
                                                            {this.state.address_suggestion.map((add, i) => <option key={i} value={add.description} />)}
                                                        </datalist>
                                                    </div>
                                                    <div className="w-100  mt-3">
                                                        <label htmlFor="City">City</label>
                                                        <input type="text" id="City" className="form-control" name="city" placeholder="City" onChange={this.handleChange} value={this.props.gs.data.city} />
                                                    </div>
                                                    <div className="w-100  mt-3">
                                                        <label htmlFor="Province">Province</label>
                                                        <input type="text" id="Province" className="form-control" name="province" placeholder="Province" onChange={this.handleChange} value={this.props.gs.data.province} />
                                                    </div>
                                                    <div className="w-100  mt-3">
                                                        <label htmlFor="Province">Country</label>
                                                        <input type="text" id="Province" className="form-control" name="country" placeholder="country" onChange={this.handleChange} value={this.props.gs.data.country} />
                                                    </div>
                                                    <div className="w-100  mt-3">
                                                        <label htmlFor="Postal">Postal code</label>
                                                        <input type="text" id="Postal" className="form-control" name="postal_code" placeholder="Postal code" onChange={this.handleChange} value={this.props.gs.data.postal_code} />
                                                    </div>
                                                </div>
                                                {/* form here */}
                                                <div className="col-md-6 pl-md-5">
                                                    <div className="row form-div admin-info">
                                                        <div className="col-md-12 mt-3 mt-md-0">
                                                            <label htmlFor="Contact">Contact</label>
                                                        </div>
                                                        <div className="col-md-6 pr-md-0 ">
                                                            <input type="text" className="form-control" name="contact_firstname" placeholder="FIrst name" onChange={this.handleChange} value={this.props.gs.data.contact_firstname} />
                                                        </div>
                                                        <div className="col-md-6 pl-md-1 pr-md-1 mt-3 mt-md-0">
                                                            <input type="text" className="form-control" name="contact_lastname" placeholder="Contact" onChange={this.handleChange} value={this.props.gs.data.contact_lastname} />
                                                        </div>
                                                        <div className="col-md-12 pr-md-1 mt-2 pt-2">
                                                            <label htmlFor="Phone">Phone</label>
                                                            <input type="text" id="Phone" className="form-control" name="contact_phone" placeholder="Phone" onChange={this.handleChange} value={this.props.gs.data.contact_phone} />
                                                        </div>
                                                        <div className="col-md-12 pr-md-1 mt-2 pt-2">
                                                            <label htmlFor="Email">Email</label>
                                                            <input type="text" id="Email" className="form-control" name="contact_email" placeholder="Email" onChange={this.handleChange} value={this.props.gs.data.contact_email} />
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* form here */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab02" className="tab-contents" style={{ display: this.state.isActive === 'amenities' ? "block" : "none" }}>
                                    <div className="row">
                                        <div className="col-8 col-lg-2 col-md-6 pr-md-1 form-div admin-info">
                                            <input type="text" className="form-control" name="amenity" placeholder="AMENITY" value={this.state.amenity.name} onChange={this.handleAmenity} />
                                        </div>
                                        <div className="col-4 col-lg-1 col-md-3 pl-md-1">
                                            <input type="submit" className="btn btn-block orng-btn mt-0" value="ADD" name="amenities" onClick={this.saveAmenity} />
                                        </div>
                                    </div>
                                    <ul className="amenities">
                                        {
                                            this.props.gs.data.amenities.map((amenity, i) =>
                                                <li>
                                                    <a href="#" title>
                                                        <i onClick={() => this.deleteAmenity(i)} className="fa fa-times crs" aria-hidden="true" />
                                                        {amenity.name}
                                                    </a>
                                                </li>
                                            )}
                                    </ul>
                                </div>
                                <div id="tab03" className="tab-contents" style={{ display: this.state.isActive === 'video' ? "block" : "none" }}>
                                    <div className="row mt-4">
                                        <div className="col-md-6 mt-1">
                                            <div class="upload-input">
                                                <input type="text" className="form-control" name="video_link" placeholder="Enter video link" onChange={this.handleVideoLink} value={this.state.video_link} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-1">

                                            <a href="#" title className="add-btn" onClick={this.handleVideo} >ADD VIDEO</a>
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <div className="row">
                                            {this.props.gs.data.videos.map((data, i) =>

                                                <div className="col-md-3 p-r-15">
                                                    <a href="#" data-toggle="modal" data-target="#exampleModal"></a>
                                                    <div className="box1">
                                                        <a href="#" data-toggle="modal" data-target="#exampleModal"></a>
                                                        <a href title className="corner-cross">
                                                            <img src="images/black-cross.png" className alt="loading" onClick={() => this.handleVideoDelete(i)} />
                                                        </a>
                                                        <img src={"https://img.youtube.com/vi/" + data.id + "/mqdefault.jpg"} className="img-fluid fx-h" />

                                                    </div>
                                                    <p className="page-para mt-2 ex-40">
                                                        {data.title}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div id="tab04" className="tab-contents" style={{ display: this.state.isActive === 'email' ? "block" : "none" }}>
                                    <ul className="amenities">
                                        {this.props.gs.data.newsletters.map((data, i) => 
                                            <li key={i}>
                                                <a href="#" title>
                                                    <i onClick={() => this.deleteEmail(data.id, i)} className="fa fa-times crs" aria-hidden="true" />
                                                    {data.email}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <br></br>


                            <div className="row">
                                <div className="col-md-3">
                                    <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.gs.status === serviceConstant.SAVE_GS_PENDING ? "Loading..." : "Save"} onClick={this.handleSubmit} />
                                </div>
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
    saveGS: apiCallAction.saveGS,
    getGS: apiCallAction.getGS,
    updateGS: apiCallAction.updateGS,
    clearSave: () => { return { type: serviceConstant.SAVE_GS_CLEAR } }
})(Admin)
