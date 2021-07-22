import React, { Component, Fragment, useState } from 'react'
import AdminContainer from '../layout/AdminContainers'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASEURL, UPLOADURL } from '../../services/url'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import CheckBox from './Checkbox'
import Tab from './Tab'
import Floorplan from './Floorplan'
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'
import axios from 'axios'
import { routes } from '../../services/url'
import $ from 'jquery'
import VideoThumbnail from 'react-video-thumbnail';
import { appendScript } from '../../shared/utils/appendScript'
import { removeScript } from '../../shared/utils/removeScript'
import Tabnew from './Tabnew'
import SchoolTab from "./SchoolTab";
import { APIKEY } from '../../shared/_helpers/utils';
import Alert from './Alert'

const curentF = {
  name: '',
  level: '',
  plan: '',
  bedrooms: '',
  bathrooms: '',
  den: '',
  sf_int: '',
  sf_ext: '',
  units: '',
  unit_num: '',
  unit_price: '',
  floor_size: '',
  balcony_size: '',
  price: '',
  images: {
    preview: "", raw: ""
  },
  sheet: {
    name: '',
    raw: ''
  }
}

export class EditAttached extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      video_error: '',
      floor_error: '',
      condos: '',
      townhouse: '',
      rowhouse: '',
      commercial: '',
      contact_email: '',
      video_link: '',
      name: '',
      address: '', city: '', province: '', price: '',

      floor_size: '',
      floor_size2: '',
      // levels: '',
      maintenance_fees: '',
      architect: '', completion: '', project_website: '',
      contact_firstname: '', contact_lastname: '',
      contact_phone: '',
      type_id: 1,
      condo_check: false,
      townhouse_check: false,
      rowhouse_check: false,
      commercial_check: false,
      featured: false,
      developer_id: null,
      zone: '',
      levels: '',
      description: '',
      developer: '',

      deposit_terms: "",
      agent_comm: "",
      completion_mnth: '',
      completion_year: '',
      status: '',
      sales_company: '',
      sales_address: '',
      designer: '',

      amenity_desc: "",
      amenity_title: "",
      amenity_id: "",
      amenities: [

      ],

      promotion_id: "",
      promotion_desc: "",
      promotion_title: "",
      promotion_start: new Date(),
      promotion_end: new Date(),
      promotions: [

      ],

      document_name: "",
      document_file: "",
      document_raw: "",
      document_id: "",
      documents: [

      ],

      floors: [],
      newFloorName: '',
      active: true,
      images: [
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
      ],
      videos: [
        { id: "", title: "" },
        { id: "", title: "" },
        { id: "", title: "" },
      ],

      sheet: {
        name: 'Upload Feature Sheet (pdf)',
        raw: ''
      },
      floor_plan: '',
      current_floor_section_id: '',
      current_floor_id: "",
      current_floor: {
        name: '',
        plan: '',
        bedrooms: '',
        bathrooms: '',
        den: '',
        sf_int: '',
        sf_ext: '',
        units: '',
        unit_num: '',
        unit_price: '',
        images: {
          preview: "", raw: ""
        },
        sheet: {
          name: '',
          raw: ''
        }
      },
      school: [
        { name: 'Daycare' }, { name: 'Elementary' }, { name: 'Middle school' }, { name: 'High school' }
      ],
      address_suggestion: []

    }
  }

  handleNewFloorName = (e) => {
    this.setState({
      newFloorName: e.target.value
    })
  }

  clearFloorName = () => {
    this.setState({
      newFloorName: ''
    })
  }

  handleFloorPlan = (e, i) => {
    e.preventDefault();
    if (this.state.newFloorName === '') {
      this.setState({
        floor_error: "Field cannot be empty"
      })
    } else {
      let newFloor = this.state.floors.map((floor, index) => {
        if (i === index) {
          floor.name = this.state.newFloorName
        }
        return floor
      })
      this.setState({
        floors: newFloor,
        newFloorName: ''
      })
    }
  }

  handleFloorPlanDelete = (e, i) => {
    e.preventDefault();
    let newFloor = this.state.floors.filter((floor, index) => i !== index)
    this.setState({
      floors: newFloor
    })
  }

  handlePromotions = () => {
    this.setState(prevState => ({
      promotions: [{ title: prevState.promotion_title, desc: prevState.promotion_desc, start: prevState.promotion_start, end: prevState.promotion_end }, ...prevState.promotions],
      promotion_start: new Date(),
      promotion_end: new Date(),
      promotion_title: "",
      promotion_desc: "",
      promotion_id: "",
    }))

    $('.showsale').toggle();
    if ($('.opensale').text() == 'Add') {
      $('.opensale').text('Close');
    }
    else {
      $('.opensale').text('Add');
    }

  }

  handleAmenities = id => {
    this.setState(prevState => ({
      amenities: [{ title: prevState.amenity_title, desc: prevState.amenity_desc }, ...prevState.amenities],
      amenity_title: "",
      amenity_desc: ""
    }))

    $('.showpanel').toggle();
    if ($('.open').text() == 'Add') {
      $('.open').text('Close');
    }
    else {
      $('.open').text('Add');
    }
  }

  handleDocuments = () => {
    this.setState(prevState => ({
      documents: [{ name: prevState.document_name, file: prevState.document_file, raw: prevState.document_raw }, ...prevState.documents],
      document_name: "",
      document_file: "",
      document_raw: "",
    }))

    $('.showdoc').toggle();
    if ($('.opendoc').text() == 'Add') {
      $('.opendoc').text('Close');
    }
    else {
      $('.opendoc').text('Add');
    }
  }

  handleEdit = (i, class1, class2, tabs, k = 0) => {
    if (tabs === 'promotions') {
      this.setState(prevState => ({
        promotion_id: i,
        promotion_title: prevState.promotions[i].title,
        promotion_start: prevState.promotions[i].start,
        promotion_end: prevState.promotions[i].end,
        promotion_desc: prevState.promotions[i].desc,
      }))
    }

    if (tabs === 'amenities') {
      this.setState(prevState => ({
        amenity_id: i,
        amenity_title: prevState.amenities[i].title,
        amenity_desc: prevState.amenities[i].desc,
      }))
    }

    if (tabs === 'documents') {
      this.setState(prevState => ({
        document_id: i,
        document_name: prevState.documents[i].name,
        document_file: prevState.documents[i].file,
        document_raw: prevState.documents[i].raw,
      }))
    }

    if (tabs === 'floors') {
      let floor = this.state.floors[i].section[k]
      if (floor.images.preview.slice(0, 4) === 'floo') {
        floor.images.preview = UPLOADURL + "/floor_media/" + floor.images.preview
      }
      this.setState(prevState => ({
        current_floor: floor,
        current_floor_id: i,
        current_floor_section_id: k
      }))
    }

    if ($('.' + class2).text() == 'Add') {
      $('.' + class1).toggle();
      $('.' + class2).text('Close');
    }
  }

  handleEditSave = (id, class1, class2, tabs, k = 0) => {
    let newArray = this.state[tabs]
    if (tabs === 'promotions') {
      newArray[id].title = this.state.promotion_title
      newArray[id].desc = this.state.promotion_desc
      newArray[id].start = this.state.promotion_start
      newArray[id].end = this.state.promotion_end

      this.setState({
        promotions: newArray,
        promotion_id: "",
        promotion_start: new Date(),
        promotion_end: new Date(),
        promotion_title: "",
        promotion_desc: ""
      })
    }

    if (tabs === 'amenities') {
      newArray[id].title = this.state.amenity_title
      newArray[id].desc = this.state.amenity_desc

      this.setState({
        amenities: newArray,
        amenity_desc: "",
        amenity_title: "",
        amenity_id: "",
      })
    }

    if (tabs === 'documents') {
      newArray[id].name = this.state.document_name
      newArray[id].file = this.state.document_file
      newArray[id].raw = this.state.document_raw

      this.setState({
        documents: newArray,
        document_name: "",
        document_file: "",
        document_raw: "",
        document_id: "",
      })
    }

    if (tabs === 'floors') {
      if (newArray[id] != this.state.current_floor.name) {
        newArray[id].section.splice(k, 1)
        if (newArray[id].section.length == 0) {
          newArray.splice(id, 1)
        }
        const elementsIndex = this.state.floors.findIndex(element => element.name === this.state.current_floor.name)
        if (elementsIndex == -1) {
          newArray = [{ name: this.state.current_floor.name, section: [this.state.current_floor] }, ...newArray]
          this.setState({
            floors: newArray,
            current_floor: curentF,
            current_floor_id: "",
            current_floor_section_id: "",
          })
        } else {
          let newArray = [...this.state.floors]
          newArray[elementsIndex].section.unshift(this.state.current_floor)
          this.setState({
            floors: newArray,
            current_floor: curentF,
            current_floor_id: "",
            current_floor_section_id: "",
          })
        }
      } else {
        newArray[id].section[k] = this.state.current_floor
        this.setState({
          [tabs]: newArray,
          current_floor: curentF,
          current_floor_id: "",
          current_floor_section_id: "",
        })
      }
    }

    $('.' + class1).toggle();
    if ($('.' + class2).text() == 'Add') {
      $('.' + class2).text('Close');
    }
    else {
      $('.' + class2).text('Add');
    }
  }

  handleTab = (class1, class2, tabs) => {
    $('.' + class1).toggle();
    if ($('.' + class2).text() == 'Add') {
      $('.' + class2).text('Close');
    }
    else {
      if (tabs == 'promotions') {
        this.setState({
          promotion_id: '',
          promotion_title: '',
          promotion_start: new Date(),
          promotion_end: new Date(),
          promotion_desc: '',
        })
      }
      if (tabs == 'amenities') {
        this.setState({
          amenity_id: "",
          amenity_desc: "",
          amenity_title: "",
        })
      }
      if (tabs == 'documents') {
        this.setState({
          document_name: "",
          document_file: "",
          document_raw: "",
          document_id: "",
        })
      }
      if (tabs == 'floors') {
        this.setState({
          current_floor: curentF,
          current_floor_id: ''
        })
      }
      $('.' + class2).text('Add');
    }
  }

  handleTabDelete = (i, tabs) => {
    this.setState({
      [tabs]: this.state[tabs].filter((tab, index) => i !== index)
    })
  }

  handleValidation = () => {
    const { name,
      contact_email,
      condos,
      commercial,
      townhouse,
      images,
      address, city, price, levels, developer_id,
      architect, completion_mnth, completion_year, project_website,
      contact_phone, sales_address, sales_company, designer, status,
      description, deposit_terms, agent_comm, promotions, amenities,
      floors, documents, videos
    } = this.state
    let check = false
    let check_image = true
    let check_video = true
    images.filter((image) => {
      if (image.preview !== "") {
        check_image = false
        return
      }
    })

    videos.filter((video) => {
      if (video.id !== "") {
        check_video = false
        return
      }
    })

    if (developer_id === '' || developer_id === null) {
      return 'Developer field is required'
    }
    if (name === '') {
      return 'Project name field is required'
    }
    if (condos === '' && commercial === '' && townhouse === '') {
      return 'Select a property type'
    }
    if (levels === '') {
      return 'Level field is required'
    }
    if (price === '') {
      return 'Price field is required'
    }
    if (address === '') {
      return 'Address field is required'
    }
    if (city === '') {
      return 'City field is required'
    }
    if (sales_address === '') {
      return 'Sales Address field is required'
    }
    if (architect === '') {
      return 'Architect field is required'
    }
    if (designer === '') {
      return 'Designer field is required'
    }
    if (completion_mnth === '') {
      return 'Completion Month field is required'
    }
    if (completion_year === '') {
      return 'Completion Year field is required'
    }
    if (status === '') {
      return 'Status field is required'
    }
    if (sales_company === '') {
      return 'Sales Company field is required'
    }
    if (project_website === '') {
      return 'Project website field is required'
    }
    if (contact_email === '') {
      return 'Contact Email field is required'
    }
    if (contact_phone === '') {
      return 'Phone field is required'
    }
    if (description === '') {
      return 'Description field is required'
    }
    if (deposit_terms === '') {
      return 'Deposit Terms field is required'
    }
    if (agent_comm === '') {
      return 'Agent Commissions field is required'
    }
    if (promotions.length === 0) {
      return 'Sales Promotions field is required'
    }
    if (check_image) {
      return 'Select an image'
    }
    if (check_video) {
      return 'Select a video'
    }
    if (amenities.length === 0) {
      return 'Amenities field is required'
    }
    if (floors.length === 0) {
      return 'Floor Plan is required'
    }
    if (documents.length === 0) {
      return 'Document field is required'
    }
    return check
  }

  handleSubmit = async (published) => {
    let check = false
    if (published == '1') {
      check = this.handleValidation()
    } else {
      if (this.state.name === '') {
        check = 'Project name field is required'
      }
    }

    if (check) {
      this.setState({
        error: check
      })
      window.scroll(0, 0)
    } else {
      let newArray = [...this.state.floors]

      const media = new FormData()
      for (var x = 0; x < this.state.images.length; x++) {
        if (this.state.images[x].raw !== '') {
          media.append('media[]', this.state.images[x].raw)
        }
      }

      newArray.map((floor) => {
        floor.section.map((sect) => {
          if (sect.images.raw != '') {
            media.append('floor_media[]', sect.images.raw)
          }
          if (sect.sheet.raw != '') {
            media.append('floor_sheet[]', sect.sheet.raw)
          }
        })
      })

      this.state.documents.map((doc) => {
        if (doc.raw != '') {
          media.append('documents[]', doc.raw)
        }
      })

      let checkForm = 0;
      for (var value of media.values()) {
        checkForm++
      }

      this.props.uploading()
      const videos = this.state.videos.filter((video) => video.id != "")
      let data

      let oldImages = []
      this.state.images.map((image) => {
        if (image.preview.slice(0, 4) === 'imag') {
          oldImages.push(image.preview)
        }
      })

      if (checkForm > 0) {
        await axios.post(routes.UPLOAD, media).then(async (resp) => {

          let i = 0
          let j = 0
          const newFloor = [...this.state.floors]
          newFloor.map((floor) => {
            floor.section.map((sect) => {
              if (sect.images.raw != '') {
                sect.images.url = resp.data.success.floor_media[i]
                i++
              }
              if (sect.sheet.raw != '') {
                sect.sheet.url = resp.data.success.floor_sheet[j]
                j++
                media.append('floor_sheet[]', sect.sheet.raw)
              }
            })
          })

          const newDocs = [...this.state.documents]
          let k = 0;
          newDocs.map((doc) => {
            if (doc.raw != '') {
              doc.url = resp.data.success.documents[k]
              k++
            }
          })

          let lat, lng
          const address = this.state.address
          // const url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + APIKEY)
          // // console.log(encodeURI(url))
          // await axios.get(url).then(resp => {
          //   lat = resp.data.results[0].geometry.location.lat
          //   lng = resp.data.results[0].geometry.location.lng
          // })

          data = {
            ...this.state,
            condos: this.state.condo_check ? this.state.condos : null,
            townhouse: this.state.townhouse_check ? this.state.townhouse : null,
            commercial: this.state.commercial_check ? this.state.commercial : null,
            floors: newFloor,
            documents: newDocs,
            images: [...oldImages, ...resp.data.success.media_path],
            videos,
            // lat,
            // lng,
            published
          }

        }).catch(err => {
          console.log(err)
        })
      } else {
        data = {
          ...this.state,
          condos: this.state.condo_check ? this.state.condos : null,
          townhouse: this.state.townhouse_check ? this.state.townhouse : null,
          commercial: this.state.commercial_check ? this.state.commercial : null,
          // floors: newFloor,
          // documents: newDocs,
          images: oldImages,
          videos,
          developer_id: this.state.developer_id ? this.state.developer_id : null,
          // lat,
          // lng,
          published
        }
      }
      delete data.error
      delete data.video_error
      delete data.floor_error
      delete data.condo_check
      delete data.townhouse_check
      delete data.rowhouse_check
      delete data.commercial_check
      delete data.video_link
      delete data.newFloorName
      delete data.active
      delete data.address_suggestion
      delete data.developer
      delete data.current_floor
      delete data.floor_plan
      delete data.sheet
      delete data.school
      delete data.created_at
      delete data.updated_at

      delete data.current_floor_section_id
      delete data.current_floor_id

      delete data.amenity_desc
      delete data.amenity_title
      delete data.amenity_id
      delete data.promotion_id
      delete data.promotion_desc
      delete data.promotion_title
      delete data.promotion_start
      delete data.promotion_end
      delete data.document_name
      delete data.document_file
      delete data.document_raw
      delete data.document_id
      delete data.spec

      await this.props.editProject(data, published)
      if (this.props.addProject.status === serviceConstant.CREATE_PROJECT_FAILURE) {
        window.scroll(0, 0)
      }
    }

  }

  handleCurrFloor = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, [name]: value }
    }))
  }

  addFloorPlan = () => {
    const { current_floor } = this.state
    if (current_floor.name == '' || current_floor.den == '' || current_floor.images.preview == '') {
      this.setState({
        floor_error: "All fields are required"
      })
    }
    else {
      const elementsIndex = this.state.floors.findIndex(element => element.name === this.state.current_floor.name)
      if (elementsIndex == -1) {
        let newArray = [{ name: this.state.current_floor.name, section: [this.state.current_floor] }, ...this.state.floors]
        this.setState({
          floors: newArray,
          current_floor: curentF
        })
      } else {
        let newArray = [...this.state.floors]
        newArray[elementsIndex].section.unshift(this.state.current_floor)
        this.setState({
          floors: newArray,
          current_floor: curentF
        })
      }

      $('.showfloor').toggle();
      if ($('.openfloor').text() == 'Add') {
        $('.openfloor').text('Close');
      }
      else {
        $('.openfloor').text('Add');
      }
    }
  }

  deleteFloorPlan = (e, name, index) => {
    // console.log(name, index)
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    delete newArray[elementsIndex].section[index]
    this.setState({
      floors: newArray
    })
  }

  handleFloors = () => {
    let check = false
    this.state.floors.map(floor => {
      if (floor.name === this.state.floor_plan) {
        check = true
        return
      }
    })
    if (this.state.floor_plan == '') {
      this.setState({
        floor_error: "Floor Plan field is required"
      })
    } else if (check === true) {
      this.setState({
        floor_error: "Floor Name should be unique"
      })
    }
    else {
      let newFloor = [...this.state.floors, {
        name: this.state.floor_plan, section: [

        ]
      }]

      this.setState({
        floors: newFloor,
        floor_plan: ''
      })
    }

  }

  handleFloorDelete = (e, name, index) => {
    e.preventDefault()
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    const len = newArray[elementsIndex].section.length

    if (len == 1) {
      newArray.filter((floor, i) => i !== elementsIndex)
      // delete newArray[elementsIndex]
      this.setState({
        floors: newArray.filter((floor, i) => i !== elementsIndex),
        current_floor: curentF,
        current_floor_id: ''
      })
    } else {
      delete newArray[elementsIndex].section[index]
      this.setState({
        floors: newArray,
        current_floor: curentF,
        current_floor_id: ''
      })
    }

  }

  handleChange = (e) => {
    if (e.target.name === 'address' || e.target.name === 'sales_address') {
      console.log(e.target.value.length)
      if (e.target.value.length > 3) {
        axios.get(BASEURL + '/address/' + e.target.value).then(resp => {
          if (resp.error_message) {
            console.log(resp.error_message)
          }
          this.setState({
            address_suggestion: resp.data.predictions
          })
        })
      }
    }

    if (e.target.name === 'price') {
      let data = e.target.value
      if (data[0] !== '$') {
        data = '$'+data
      }
      if(data.includes(',')) {
        data = data.replace(/,/g, '')
      } 
      if (data.length > 4 ) {
          data = data.slice(0, [data.length-3]) + ',' + data.slice([data.length-3])
          
      }
      if (data.length > 8 ) {
        data = data.slice(0, [data.length-7]) + ',' + data.slice([data.length-7])
      }
      if (data.length > 12 ) {
        data = data.slice(0, [data.length-11]) + ',' + data.slice([data.length-11])
      }

      e.target.value = data
    }

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = (e) => {
    this.setState({
      [e]: !this.state[e]
    })
  }

  handleVideo = async () => {
    if (this.state.video_link === '' || this.state.video_link.split("v=")[1] === undefined) {
      this.setState({
        video_error: "Video link should a youtube video",
        video_link: ''
      })
      return
    }
    const video_id = this.state.video_link.split("v=")[1].slice(0, 11)

    if (video_id === undefined || video_id === null || video_id.length < 11) {
      this.setState({
        video_error: "Video link should a youtube video",
        video_link: ''
      })
    } else {
      let title = ''
      const url = "https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + APIKEY + "&part=snippet,contentDetails,statistics,status"
      await axios.get(url).then(resp => title = resp.data.items[0].snippet.title)

      let newArray = this.state.videos
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == "") {
          newArray[i].id = video_id
          newArray[i].title = title
          break;
        }
      }

      this.setState(prevState => ({
        videos: newArray,
        video_link: ''
      }))
    }
  }

  handleImage = (e) => {
    if (e.target.files.length) {
      let newArray = this.state.images
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].preview == "") {
          newArray[i].preview = URL.createObjectURL(e.target.files[0])
          newArray[i].raw = e.target.files[0]
          break;
        }
      }

      this.setState({
        images: newArray
      });
      document.getElementById("upload-button").value = "";
    }
  }

  handleDoc = (e) => {
    if (e.target.files.length) {
      this.setState({
        document_file: e.target.files[0].name,
        document_raw: e.target.files[0]
      });
      document.getElementById("upload-doc").value = "";
    }
  }

  handleFloorImage = (e) => {
    if (e.target.files.length) {
      const preview = URL.createObjectURL(e.target.files[0])
      const raw = e.target.files[0]
      this.setState((prevState) => ({
        current_floor: { ...prevState.current_floor, images: { preview, raw } }
      }));
      document.getElementById("upload-floor-image").value = "";
    }
  }

  handleFloorSheet = (e) => {
    const name = e.target.files[0].name
    const raw = e.target.files[0]
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, sheet: { name, raw } }
    }))
    document.getElementById("floor-sheet").value = "";
  }

  handleFloorSheetDelete = () => {
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, sheet: { name: '', raw: '' } }
    }));
  }

  handleFloorImageDelete = () => {
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, images: { preview: '', raw: '' } }
    }));
    document.getElementById("upload-floor-image").value = "";
  }

  handleImageDelete = (index) => {
    let newImages = this.state.images.map((image, i) => {
      if (i === index) {
        return {
          preview: '',
          raw: ''
        }
      }
      return image
    })
    this.setState({
      images: newImages
    })
    document.getElementById("upload-button").value = "";
  }

  handleVideoDelete = (index) => {
    console.log(index)
    // let newVideos = this.state.videos.filter((video, i) => i !== index)
    let newVideos = this.state.videos.map((video, i) => {
      if (i === index) {
        return {
          id: "",
          title: ""
        }
      }
      return video
    })
    this.setState({
      videos: newVideos
    })
    // document.getElementById("upload-button").value = "";
  }

  handleSheet = (e) => {
    this.setState({
      sheet: {
        name: e.target.files[0].name,
        raw: e.target.files[0]
      }
    })
  }

  setStartDate = (date, name) => {
    this.setState({
      [name]: date
    })
  }

  componentDidUpdate() {

    if (this.props.addProject.status == serviceConstant.CREATE_PROJECT_SUCCESS) {
      // this.setState({
      //   error: 'Project successfully added'
      // })
      // window.scroll(0, 0)
      // this.setState(...initState)
      // // alert('Project successfully added')
      this.props.clear()
      // this.setState(this.baseState) 
      history.push('/project-list')
    }
  }

  componentDidMount() {
    this.props.clear()
    $('.vidadd').click(function () {

      $('.showvid').toggle();
      if ($(this).text() == 'Add') {
        $(this).text('Close');
      }
      else {
        $(this).text('Add');
      }
    });

    const { getGS, developers } = this.props
    if (!this.props.isLoggedIn.status) {
      history.push('/login')
    }
    getGS()
    developers()

    let newImage = [
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
      { preview: "", raw: "", url: "" },
    ]

    let newVideo = [
      { id: "", title: "" },
      { id: "", title: "" },
      { id: "", title: "" },
    ]

    this.props.propertyData.videos.map((video, i) => {
      newVideo[i].id = video.id
      newVideo[i].title = video.title
    })
    this.props.propertyData.images.map((url, i) => {
      newImage[i].preview = url
    })
    this.props.propertyData.floors.map((floor) => {
      floor.section.map(sect => {
        sect.images.preview = sect.images.url
      })
    })

    this.setState({
      ...this.props.propertyData,
      condo_check: this.props.propertyData.condos ? true : false,
      commercial_check: this.props.propertyData.commercial ? true : false,
      townhouse_check: this.props.propertyData.townhouse ? true : false,
      images: newImage,
      videos: newVideo
    })
  }



  render() {
    const { images, current_floor } = this.state
    const total = parseInt(current_floor.sf_int) + parseInt(current_floor.sf_ext)
    return (
      <AdminContainer>
        <div>
          <div className="h-p" />
          <div className="inner-area">
            <div className="container-fluid">
              <div class="alert alert-warning" style={{ display: this.state.error !== '' || this.props.addProject.status === serviceConstant.CREATE_PROJECT_FAILURE ? 'block' : 'none' }}>
                {this.state.error ? this.state.error : "Network Error, Try again"}
              </div>
              <div className="row">
                <div className="col-md-4">

                  <h2 className="admin-heading clearfix">PROJECTS: ATTACHED</h2>
                  <div className="input-space srch">
                    <label htmlFor>Developer</label>
                    <div className="select wht">
                      <select name="developer_id" value={this.state.developer_id} onChange={this.handleChange} id="slct">
                        <option value="">Select one...</option>
                        {this.props.getDevelopers.data.map((developer) =>
                          <option value={developer.id}>{developer.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="input-space">
                    <label htmlFor>Project name</label>
                    <input type="text" name="name" onChange={this.handleChange} placeholder="name" value={this.state.name} />
                  </div>
                  <div className=" overall-hold">
                    <div className="property-type">
                      <label className="tp" htmlFor>Property type</label>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="control-group">
                            <CheckBox inputClass="one" name="Condos" clickk={() => this.handleCheck("condo_check")} check={this.state.condo_check} labelClass="control control-checkbox one " />

                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-space  little-s mb-3">
                            <input type="text" placeholder="Units" disabled={this.state.condo_check ? false : true} name="condos" value={this.state.condos} onChange={this.handleChange} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="control-group">
                            <CheckBox inputClass="two" name="Townhouse" clickk={() => this.handleCheck("townhouse_check")} check={this.state.townhouse_check} labelClass="control control-checkbox two " />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-space little-s mb-3">
                            <input type="text" placeholder="Units" disabled={this.state.townhouse_check ? false : true} name="townhouse" value={this.state.townhouse} onChange={this.handleChange} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="control-group">
                            <CheckBox inputClass="three" name="Row house" clickk={() => this.handleCheck("rowhouse_check")} check={this.state.rowhouse_check} labelClass="control control-checkbox three " />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-space little-s mb-3">
                            <input type="text" placeholder="Units" disabled={this.state.rowhouse_check ? false : true} name="rowhouse" value={this.state.rowhouse} onChange={this.handleChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-space">
                    <label htmlFor>Levels</label>
                    <input type="text" name="levels" placeholder="Levels" onChange={this.handleChange} value={this.state.levels} />
                  </div>
                  <div className="input-space">
                    <label htmlFor>Base price (CAD)</label>
                    <input type="text" name="price" onChange={this.handleChange} placeholder="Price" value={this.state.price} />
                  </div>
                </div>
                <div className="col-md-4">
                  <h2 className="admin-heading clearfix">LOCATION</h2>
                  <div className="input-space srch">
                    <label htmlFor="Address">Project address</label>
                    {/* <input type="text" defaultValue="888 Pacific St." /> */}
                    <input type="text" list="address" id="Address" className="form-control" name='address' value={this.state.address} onChange={this.handleChange} placeholder="Address" />
                    <datalist id="address">
                      {this.state.address_suggestion.map((add, i) => <option key={i} value={add.description} />)}
                    </datalist>
                    {/* <button className="srch"><i className="zmdi zmdi-search" /></button> */}
                  </div>
                  <div className="input-space">
                    <label htmlFor>City</label>
                    <input type="text" name="city" onChange={this.handleChange} placeholder="City" value={this.state.city} />
                  </div>
                  <div className="input-space">
                    <label htmlFor>Sales center address</label>
                    <input type="text" list="sales_address" name='sales_address' onChange={this.handleChange} value={this.state.sales_address} />
                    <datalist id="sales_address">
                      {this.state.address_suggestion.map((add, i) => <option key={i} value={add.description} />)}
                    </datalist>
                  </div>
                  <div className="input-space mb-0">
                    <div className="mapouter">
                      <div className="gmap_canvas"><iframe width="100%" height={370} id="gmap_canvas" src={"https://maps.google.com/maps?q=" + this.state.address + "&t=&z=13&ie=UTF8&iwloc=&output=embed"} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h2 className="admin-heading clearfix">DETAILS</h2>
                  <div className="input-space">
                    <label htmlFor>Architect</label>
                    <input type="text" name="architect" onChange={this.handleChange} value={this.state.architect} placeholder="Architect" />
                  </div>
                  <div className="input-space">
                    <label htmlFor>Interior designer</label>
                    <input type="text" name='designer' value={this.state.designer} onChange={this.handleChange} />
                  </div>
                  <div className="input-space-white">
                    <label htmlFor>Completion date</label>
                    <div className="row">
                      <div className="col-6 pr-1">
                        <div className="select wht">
                          <select name='completion_mnth' value={this.state.completion_mnth} onChange={this.handleChange} id="slct">
                            <option value>Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6 pl-1">
                        <div className="select wht">
                          <select name='completion_year' value={this.state.completion_year} onChange={this.handleChange} id="slct">
                            <option value>Year</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-space-white">
                    <label htmlFor>Status</label>
                    <div className="select wht">
                      <select name='status' value={this.state.status} onChange={this.handleChange} id="slct">
                        <option value>Select</option>
                        <option value="For Presale">For Presale</option>
                        <option value="Under construction">Under construction</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-space">
                    <label htmlFor>Sales company / Brokerage / Agent</label>
                    <input type="text" name='sales_company' value={this.state.sales_company} onChange={this.handleChange} />
                  </div>
                  <div className="input-space">
                    <label htmlFor>Website</label>
                    <input type="text" name="project_website" value={this.state.project_website} onChange={this.handleChange} placeholder="Website" />
                  </div>
                  <div className="input-space">
                    <label htmlFor>Email</label>
                    <input type="email" name="contact_email" value={this.state.contact_email} onChange={this.handleChange} placeholder="Email" />
                  </div>
                  <div className="input-space">
                    <label htmlFor>Phone number</label>
                    <input type="text" maxlength="20" name="contact_phone" value={this.state.contact_phone} onChange={this.handleChange} placeholder="Phone" />
                  </div>
                </div>
              </div>

              <h2 className="page-heading ">
                DESCRIPTION
              </h2>
              <div className="input-space mb-0">
                <textarea name="description" value={this.state.description} placeholder="Project description..." value={this.state.description} onChange={this.handleChange} />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h2 className="page-heading ">
                    DEPOSIT TERMS
                  </h2>
                  <div className="input-space mb-0">
                    <textarea placeholder="Deposit terms..." value={this.state.deposit_terms} id name='deposit_terms' onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h2 className="page-heading ">
                    AGENT COMMISSIONS
                  </h2>
                  <div className="input-space  mb-0">
                    <textarea placeholder="Agent commissions..." value={this.state.agent_comm} name='agent_comm' onChange={this.handleChange} />
                  </div>
                </div>
              </div>
              <div className="h-area mt-ex">
                <h2 className="admin-heading-sub bod new-bt">SALES PROMOTIONS</h2>
                <a href="javascript:void(0)" className="close-link opensale" onClick={() => this.handleTab('showsale', 'opensale', 'promotions')} style={{ cursor: 'pointer' }}>Add</a>
              </div>
              <div className="showsale clearfix">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-space">
                      <label htmlFor>Promotion title</label>
                      <input type="text" name="promotion_title" placeholder="Title" onChange={this.handleChange} value={this.state.promotion_title} />
                    </div>
                    <div className="input-space">
                      <div className="row">
                        <div className="col-md-6 pr-md-1">
                          <label>Start date</label>
                          <DatePicker selected={this.state.promotion_start} onChange={(date) => this.setStartDate(date, 'promotion_start')} />
                          {/* <input id="datepicker" placeholder="Start Date" name="promotion_start" onChange={this.handleChange} value={this.state.promotion_start} /> */}
                        </div>
                        <div className="col-md-6 pl-md-1">
                          <label>End date</label>
                          <DatePicker selected={this.state.promotion_end} onChange={(date) => this.setStartDate(date, 'promotion_end')} />
                          {/* <input id="datepicker2" placeholder="End Date" name="promotion_end" onChange={this.handleChange} value={this.state.promotion_end} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-space">
                  <label htmlFor>Description</label>
                  <textarea className="ex-h" name="promotion_desc" placeholder="Description" onChange={this.handleChange} value={this.state.promotion_desc} />
                  <div className="right-btnz clearfix">
                    {/* <input type="button" defaultValue="DELETE" /> */}
                    {this.state.promotion_id === "" ?
                      <input type="button" defaultValue="ADD PROMOTION" onClick={this.handlePromotions} />
                      :
                      <input type="button" defaultValue="EDIT PROMOTION" onClick={() => this.handleEditSave(this.state.promotion_id, 'showsale', 'opensale', 'promotions')} />
                    }
                  </div>
                </div>
              </div>
              <table className="prj-list bt-blk bd top-no">
                <thead>
                  <tr>
                    <th width="32%" scope="col">Title</th>
                    <th width="43%" scope="col">Description</th>
                    <th width="10%" scope="col">Start Date</th>
                    <th width="10%" scope="col">End Date</th>
                    <th width="5%" scope="col" className="text-right">EDIT</th>
                    <th width="5%" scope="col" className="text-right">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.promotions.map((child, i) =>
                    <tr>
                      <td data-label="Title">{child.title}</td>
                      <td data-label="Description">
                        <p>{child.desc}</p>
                      </td>
                      <td data-label="Start Date">{new Date(child.start).toDateString()}</td>
                      <td data-label="End Date">{new Date(child.end).toDateString()}</td>
                      <td data-label="EDIT" className="text-right" onClick={() => this.handleEdit(i, 'showsale', 'opensale', 'promotions')} style={{ cursor: 'pointer' }}><a href>Edit</a></td>
                      <td data-label="EDIT" className="text-right" onClick={() => this.handleTabDelete(i, 'promotions')} style={{ cursor: 'pointer' }}><a href>Delete</a></td>
                    </tr>
                  )}

                </tbody>
              </table>
              <div className="add-area">
                <h2 className="page-heading ">
                  PHOTOS
                </h2>
                <label style={{ position: 'absolute', top: '3px', right: '0px', color: '#007bff', cursor: 'pointer' }} htmlFor="upload-button" className="link-right">
                  Add
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={this.handleImage}
                />
              </div>
              <ul className="tab-list clearfix">
                {images.map((image, i) => {
                  let image_url
                  if (image.preview.slice(0, 4) === 'blob') {
                    image_url = image.preview
                  } else {
                    image_url = UPLOADURL + "/images/" + image.preview
                  }
                  return <li>
                    {image.preview ?
                      <div className="img-coverz">
                        <img src={image_url} className="up-img" alt="loading" />
                        <a href className="corner-cross" onClick={() => this.handleImageDelete(i)}><i className="zmdi zmdi-close" onClick={() => this.handleImageDelete(i)} /></a>
                      </div>
                      :
                      <div className="photo-box">Photo {i + 1}</div>
                    }

                  </li>

                })}

              </ul>
              <div className="add-area">
                <h2 className="page-heading ">
                  VIDEOS
                </h2>
                <a href="javascript:void(0)" className="link-right vidadd" style={{ cursor: 'pointer' }}>Add</a>
                <div class="alert alert-warning" style={{ display: this.state.video_error !== '' ? 'block' : 'none' }}>
                  {this.state.video_error}
                </div>
              </div>
              <div className="showvid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-space">
                      <input type="text" placeholder="Enter youtube link" name="video_link" onChange={this.handleChange} value={this.state.video_link} />
                    </div>
                  </div>
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-6 pr-md-1">
                        {/* <input type="button" className="btn-one" defaultValue="DELETE" /> */}
                      </div>
                      <div className="col-md-6 pl-md-1"><input type="button" className="btn-two" defaultValue="ADD VIDEO" onClick={this.handleVideo} /></div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="vid-list clearfix">
                {this.state.videos.map((data, i) =>
                  <li>
                    {data.id ?
                      <div className="vid-coverz">
                        <img src={"https://img.youtube.com/vi/" + data.id + "/mqdefault.jpg"} className="up-img" alt="loading" />
                        <a href className="corner-cross" onClick={() => this.handleVideoDelete(i)}><i className="zmdi zmdi-close" /></a>
                      </div>
                      :
                      <div className="vid-box"><a href="#">Video {i + 1}</a></div>
                    }

                  </li>
                )}
              </ul>
              <div className="h-area mt-ex">
                <h2 className="admin-heading-sub bod new-bt mb-0">AMENITIES</h2>
                <a href="javascript:void(0)" className="close-link open" onClick={() => this.handleTab('showpanel', 'open', 'amenities')} style={{ cursor: 'pointer' }}>Add</a>
              </div>
              <div className="showpanel clearfix">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-space">
                      <label htmlFor>Amenity title</label>
                      <input type="text" name="amenity_title" placeholder="Title" onChange={this.handleChange} value={this.state.amenity_title} />
                    </div>
                  </div>
                </div>
                <div className="input-space">
                  <label htmlFor>Description</label>
                  <textarea className="ex-h" name="amenity_desc" placeholder="Description" onChange={this.handleChange} value={this.state.amenity_desc} />
                  <div className="right-btnz clearfix">
                    {/* <input type="button" defaultValue="DELETE" /> */}

                    {this.state.amenity_id === "" ?
                      <input type="button" defaultValue="ADD AMENITY" onClick={this.handleAmenities} />
                      :
                      <input type="button" defaultValue="EDIT AMENITY" onClick={() => this.handleEditSave(this.state.amenity_id, 'showpanel', 'open', 'amenities')} />
                    }
                  </div>
                </div>
              </div>
              <table className="prj-list bt-blk bd bt-grey top-bk">
                <thead>
                  <tr>
                    <th width="32%" scope="col">AMENITY</th>
                    <th width="63%" scope="col">DESCRIPTION</th>
                    <th width="5%" scope="col" className="text-right">EDIT</th>
                    <th width="5%" scope="col" className="text-right">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.amenities.map((child, i) =>
                    <tr>
                      <td data-label="AMENITY">{child.title}</td>
                      <td data-label="DESCRIPTION">
                        <p>{child.desc}</p>
                      </td>
                      <td data-label="EDIT" className="text-right" onClick={() => this.handleEdit(i, 'showpanel', 'open', 'amenities')} style={{ cursor: 'pointer' }}><a href>Edit</a></td>
                      <td data-label="EDIT" className="text-right" onClick={() => this.handleTabDelete(i, 'amenities')} style={{ cursor: 'pointer' }}><a href>Delete</a></td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="h-area mt-ex">
                <h2 className="admin-heading-sub bod new-bt">FLOOR PLANS</h2>
                <a href className="close-link openfloor" onClick={() => this.handleTab('showfloor', 'openfloor', 'floors')} style={{ cursor: 'pointer' }}>Add</a>
              </div>
              <div className="showfloor">
                <div class="alert alert-warning" style={{ display: this.state.floor_error !== '' ? 'block' : 'none' }}>
                  {this.state.floor_error}
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <h6 className="f-h">Floor plan</h6>
                    <label style={{ display: current_floor.sheet.name ? 'none' : 'block' }} htmlFor="floor-sheet" className="orange text-right"><a className="blue-t" href>Upload</a></label>
                    {current_floor.sheet.name ?
                      <label className="orange text-right"><a className="blue-t" href> <i onClick={this.handleFloorSheetDelete} className="zmdi zmdi-close cross-bt" />
                        {current_floor.sheet.name}
                      </a></label>
                      : ''}
                    <input
                      type="file"
                      id="floor-sheet"
                      style={{ display: "none" }}
                      onChange={this.handleFloorSheet}
                    />
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="upload-floor-image"
                        style={{ display: "none" }}
                        onChange={this.handleFloorImage}
                      />

                      {current_floor.images.preview ?
                        <div className="file-upload-box position-relative">
                          <a href title className="pdf-cross" onClick={this.handleFloorImageDelete}>
                            <i className="zmdi zmdi-close" />
                          </a>
                          <img src={current_floor.images.preview} className="img-fluid" />
                        </div> : ''}

                      <label htmlFor="upload-floor-image">
                        <a >Click this placeholder to <br />
                          upload floor plan image
                        </a>
                      </label>
                    </div>

                  </div>
                  <div className="col-md-4">
                    <div className="input-space-white">
                      <label htmlFor>Floor plan type</label>
                      <div className="select wht">
                        <select value={current_floor.name} name="name" onChange={this.handleCurrFloor} id="slct">
                          <option value>Select</option>
                          <option value="Studio">Studio</option>
                          <option value="1 Bedroom Condo">1 Bedroom Condo</option>
                          <option value="2 Bedroom Condo">2 Bedroom Condo</option>
                          <option value="3 Bedroom Condo">3 Bedroom Condo</option>
                          <option value="4 Bedroom Condo">4 Bedroom Condo</option>
                          <option value="5 Bedroom Condo">5 Bedroom Condo</option>
                          <option value="6 Bedroom Condo">6 Bedroom Condo</option>
                          <option value="Sub penthouse">Sub penthouse</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="Townhouse">Townhouse</option>
                          {/* <option value="Row house">Row house</option>
                          <option value="1/2 Duplex">1/2 Duplex</option> */}
                        </select>
                      </div>
                    </div>
                    <div className="input-space">
                      <label htmlFor>Plan ID</label>
                      <input type="text" placeholder="Enter plan ID" name="plan" value={current_floor.plan} onChange={this.handleCurrFloor} />
                    </div>
                    <div className="input-space-white">
                      <div className="row">
                        <div className="col-md-4 pr-1">
                          <label>Bedrooms</label>
                          <div className="select wht">
                            <select name="bedrooms" id="slct" value={current_floor.bedrooms} onChange={this.handleCurrFloor}>
                              <option value>Select</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4 pl-1 pr-1">
                          <label>Bathrooms</label>
                          <div className="select wht">
                            <select name="bathrooms" value={current_floor.bathrooms} onChange={this.handleCurrFloor} id="slct">
                              <option value>Select</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4 pl-1">
                          <label>Den</label>
                          <div className="select wht">
                            <select name="den" value={current_floor.den} onChange={this.handleCurrFloor} id="slct">
                              <option value>Select</option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="input-space">
                      <label>Floor Size (SF)</label>
                      <div className="row">
                        <div className="col-md-4 pr-1">
                          <input type="text" name="sf_int" value={current_floor.sf_int} onChange={this.handleCurrFloor} placeholder="Interior" />
                        </div>
                        <div className="col-md-4 pl-1 pr-1">
                          <input type="text" name="sf_ext" value={current_floor.sf_ext} onChange={this.handleCurrFloor} placeholder="Exterior" />
                        </div>
                        <div className="col-md-4 pl-1">
                          <input type="text" defaultValue="Total" readOnly value={Number.isInteger(total) ? total : 'Total'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-space-white">
                      <label htmlFor>Units with this floor plan</label>
                      <div className="select wht">
                        <select name="units" onChange={this.handleCurrFloor} value={current_floor.units} id="slct">
                          <option value>Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-space">
                      <div className="row">
                        <div className="col-md-6 pr-md-1">
                          <label htmlFor>Unit number</label>
                          <input type="text" name="unit_num" value={current_floor.unit_num} onChange={this.handleCurrFloor} />
                        </div>
                        <div className="col-md-6 pl-md-1">
                          <label htmlFor>Price (CAD)</label>
                          <input type="text" name="unit_price" value={current_floor.unit_price} onChange={this.handleCurrFloor} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-50 tp-40">
                      <div className="row">
                        {/* <div className="col-md-6 pr-md-2"><input type="button" className="btn-one" defaultValue="DELETE" /></div> */}
                        {this.state.current_floor_id === "" ?
                          <div className="col-md-6 pl-md-1" onClick={this.addFloorPlan}><input type="button" className="btn-two" defaultValue="ADD FLOOR PLAN" /></div>
                          :
                          <div className="col-md-6 pl-md-1" onClick={() => this.handleEditSave(this.state.current_floor_id, 'showfloor', 'openfloor', 'floors', this.state.current_floor_section_id)} ><input type="button" className="btn-two" defaultValue="EDIT FLOOR PLAN" /></div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.floors.map((floor, i) =>
                <div className="mt-in">
                  <h4 className="sm-h">{floor.name}</h4>
                  <div className="mob-none">
                    <div className="row">
                      {floor.section.map((sect, k) => {
                        let image_url
                        if (sect.images.preview.slice(0, 4) === 'blob') {
                          image_url = sect.images.preview
                        } else {
                          image_url = UPLOADURL + "/floor_media/" + sect.images.url
                        }
                        return <div className="col-md-4">
                          <div className="plan-box marg-b">
                            <a href="#" data-toggle="modal" data-target="#exampleModal">
                              <div className="border-img"><img src={image_url} height='370px'  className="img-responsive " /></div>
                            </a>
                            <div className="g-bg clearfix">
                              <div className="row">
                                <div className="col-8">
                                  <b>{sect.plan}</b>
                                </div>
                                <div className="col-4">
                                  <div className="hrt-cvr" onClick={() => this.handleEdit(i, 'showfloor', 'openfloor', 'floors', k)} style={{ cursor: 'pointer' }} ><a href className="edit-text">Edit</a></div>
                                  <div className="hrt-cvr" onClick={(e) => this.handleFloorDelete(e, floor.name, k)} style={{ cursor: 'pointer', width: '50px' }}><a href className="edit-text">Delete</a></div>
                                </div>
                              </div>
                            </div>
                            <ul className="specs clearfix">
                              <li>Bedrooms:</li>
                              <li>{sect.bedrooms} {sect.den == 1 ? "+ Den" : ""}</li>
                              <li>Bathrooms:</li>
                              <li>{sect.bathrooms}</li>
                              <li>Interior size:</li>
                              <li>{sect.sf_int} SF</li>
                              <li>Exterior size:</li>
                              <li>{sect.sf_ext} SF</li>
                              <li>Base price:</li>
                              <li>${sect.unit_price}</li>
                            </ul>
                          </div>
                        </div>

                      })}
                    </div>
                  </div>

                </div>

              )}


              <div className="h-area mt-ex">
                <h2 className="admin-heading-sub bod new-bt">DOCUMENTS</h2>
                <a href="javascript:void(0)" className="close-link opendoc" onClick={() => this.handleTab('showdoc', 'opendoc', 'documents')} style={{ cursor: 'pointer' }}>Add</a>
              </div>
              <div className="showdoc">
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-space-white">
                      <label htmlFor>Document type</label>
                      <div className="select wht">
                        <select name="document_name" id="slct" onChange={this.handleChange} value={this.state.document_name}>
                          <option value>Selecte one...</option>
                          <option value="Contract of Purchase and Sale">Contract of Purchase and Sale</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-space">
                      <label htmlFor>Document</label>
                      {/* <a href className="edit-link">Upload</a> */}
                      <label className="edit-link" style={{ position: 'absolute', top: '3px', right: '0px', color: '#007bff' }} htmlFor="upload-doc">
                        Upload
                      </label>
                      <input
                        type="file"
                        id="upload-doc"
                        style={{ display: "none" }}
                        onChange={this.handleDoc}
                      />
                      <input type="text" value={this.state.document_file} />
                      <a href className="close-icon"><i className="zmdi zmdi-close" /></a>
                    </div>
                    <div className="mb-50">
                      <div className="row">
                        <div className="col-md-6 pr-md-1">
                          {/* <input type="button" className="btn-one" defaultValue="DELETE" /> */}
                        </div>
                        {this.state.document_id === "" ?
                          <div className="col-md-6 pl-md-1"><input type="button" className="btn-two" defaultValue="ADD DOCUMENT" onClick={this.handleDocuments} /></div>
                          :
                          <div className="col-md-6 pl-md-1"><input type="button" className="btn-two" defaultValue="EDIT DOCUMENT" onClick={() => this.handleEditSave(this.state.document_id, 'showdoc', 'opendoc', 'documents')} /></div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <table className="prj-list bt-blk bd bt-grey top-bk">
                <thead>
                  <tr>
                    <th width="32%" scope="col">DOCUMENT NAME</th>
                    <th width="63%" scope="col">FILE</th>
                    <th width="5%" scope="col" className="text-right">EDIT</th>
                    <th width="5%" scope="col" className="text-right">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.documents.map((child, i) =>
                    <tr>
                      <td data-label="DOCUMENT NAME">{child.name}</td>
                      <td data-label="FILE">
                        {child.file}
                      </td>
                      <td data-label="EDIT" className="text-right" onClick={() => this.handleEdit(i, 'showdoc', 'opendoc', 'documents')} style={{ cursor: 'pointer' }}><a href>Edit</a></td>
                      <td data-label="EDIT" className="text-right" onClick={() => this.handleTabDelete(i, 'documents')} style={{ cursor: 'pointer' }}><a href>Delete</a></td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-space ex-top ex-b blk-btn">
                    <input type="submit" value={this.props.addProject.status === serviceConstant.SAVE_PROJECT_PENDING || this.props.addProject.status === serviceConstant.SAVE_PROJECT_UPLOADING ? "SAVING..." : "SAVE PROGRESS"} onClick={() => this.handleSubmit(0)} />
                  </div>
                </div>
                <div className="col-md-4" />
                <div className="col-md-4">
                  <div className="input-space ex-top ex-b">
                    <input type="submit" value={this.props.addProject.status === serviceConstant.CREATE_PROJECT_PENDING || this.props.addProject.status === serviceConstant.CREATE_PROJECT_UPLOADING ? "PUBLISHING..." : "PUBLISH PROJECT"} data-toggle="modal" data-target="#publish-project" />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            {/* The Modal */}
            <div className="modal" id="publish-project">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  {/* Modal body */}
                  <div className="modal-body">
                    <div className="icon-cs"><i className="zmdi zmdi-alert-octagon" /></div>
                    <h4>Are you sure you want to publish the project?</h4>
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary mr-auto" data-dismiss="modal" onClick={() => this.handleSubmit(1)} >Yes</button>
                    <button type="button" className="btn btn-danger blkk" data-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div></div>

      </AdminContainer >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addProject: state.addProject,
    gs: state.gs,
    getDevelopers: state.developers,
    isLoggedIn: state.isLoggedIn,
    propertyData: state.propertyData
  }
}

export default connect(mapStateToProps, {
  getGS: apiCallAction.getGS,
  developers: apiCallAction.getDevelopers,
  createProject: apiCallAction.createProject,
  saveProject: apiCallAction.saveProject,
  editProject: apiCallAction.editProject,
  clear: () => { return { type: serviceConstant.CREATE_PROJECT_CLEAR } },
  uploading: (id) => { if (id === 0) { return { type: serviceConstant.SAVE_PROJECT_UPLOADING } } return { type: serviceConstant.CREATE_PROJECT_UPLOADING } }
})(EditAttached)