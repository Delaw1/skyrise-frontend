import React, { Component, Fragment } from 'react'
import $ from "jquery"
import { appendScript } from '../../shared/utils/appendScript'
import '../../assest/css/easy-responsive-tabs.css'
import { BASEURL } from '../../services/url';
// require("easy-responsive-tabs")
// const easyResponsiveTabs = require('easy-responsive-tabs')

export class Tabnew extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: null
        }
    }

    componentDidMount() { 
        this.$node = $(this.horizontalTab);
        appendScript("./js/easy-responsive-tabs.js")
        // appendScript("./js/tabs.js")

    }


    handleTab = (tab) => {
        this.state.activeTab === tab ? this.setState({ activeTab: null }) : this.setState({ activeTab: tab })
        this.props.clearFloorName()
    }


    componentWillUnmount() {
        // this.$node.easyResponsiveTabs('destroy')
    }
    render() {
        return (
            <div ref={horizontalTab => this.horizontalTab = horizontalTab} id="horizontalTab" className="admin-tabs">
                <div className="resp-tabs-container">
                    {this.props.floors.map((floor, i) => {
                        const name = floor.name
                        return <Fragment>
                            <h2 className={"resp-accordion " + (this.state.activeTab === i ? "resp-tab-active" : "")} role="tab" aria-controls={"tab_item-" + i} onClick={() => this.handleTab(i)}>{name}</h2>
                            <div className={"resp-tab-content " + (this.state.activeTab === i ? "resp-tab-content-active" : "resp-accordion-closed")} aria-labelledby={"tab_item-" + 1} style={{ display: this.state.activeTab !== i ? "none" : "block" }}>
                                <div className="input-a clearfix"> 
                                 
                                    <input type="text" value={this.props.newFloorName} onChange={(e) => this.props.handleNewFloorName(e)} />
                                    <a href="#" onClick={(e) => this.props.handleFloorPlan(e, i)} className="edit" style={{marginRight: '5px'}}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                                    </a>
                                    <a href="#" onClick={(e) => this.props.handleFloorPlanDelete(e, i)} className="delete-icon"> 
                                        <i className="fa fa-times" aria-hidden="true"></i> Delete
                                    </a>
                                </div>
                                    <ul className="plan-area clearfix">
                                        {floor.section.map((sect, k) => {
                                            const name = floor.name
                                            let image_url = BASEURL + "/public/uploads/floor_media/" + sect.images.url
                                            if(sect.images.preview.slice(0,4) === 'blob') {
                                                image_url = sect.images.preview
                                            } else {
                                                image_url = BASEURL + "/public/uploads/floor_media/" + sect.images.url
                                            }
                                            return <li>
                                                <div className="plan-bx position-relative">
                                                    <a className="corner-cross"> <img src="images/black-cross.png" onClick={(e) => this.props.handleDelete(e, name, k)} className="" alt="loading" /> </a>
                                                    <a href="" data-toggle="modal" data-target="#exampleModal12" title="">
                                                        <img src={image_url} alt="" /> </a>
                                                    <b>Plan 01</b>
                                                    <ul className="detail clearfix">
                                                        <li>Bedrooms:</li>
                                                        <li>{sect.bedrooms} {sect.den == 'Yes' ? '+ Den' : ''} </li>
                                                        <li>Bathrooms:</li>
                                                        <li>{sect.bathrooms}</li>
                                                        <li>Floor size:</li>
                                                        <li>{sect.floor_size}</li>
                                                        <li>Balcony:</li>
                                                        <li>{sect.balcony_size}</li>
                                                        <li>Level:</li>
                                                        <li>{sect.level}</li>
                                                        <li>Starting price:</li>
                                                        <li>$ {sect.price}</li>

                                                    </ul>
                                                </div>
                                            </li>

                                        })}
                                    </ul>
                                </div>
            </Fragment>
        }
        )}



                </div>

            </div>
        )
    }
}

export default Tabnew
