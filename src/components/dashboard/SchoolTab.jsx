import React, { Component, Fragment } from 'react'
import $ from "jquery"
import { appendScript } from '../../shared/utils/appendScript'
import '../../assest/css/owl.carousel.min.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export class SchoolTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: null,
            responsive: {
                0: {
                  items: 1, slideBy: 3, stagePadding: 30
                },
                600: {
                  items: 3, slideBy: 3
                },
                1000: {
                  items: 3, slideBy: 3
                }
              }
        }
    }

    componentDidMount() {
        appendScript("./js/easy-responsive-tabs.js")
        appendScript("./js/owl.carousel.min.js")
        // appendScript("./js/carouseljs")
    }

    handleTab = (tab) => {
        this.state.activeTab === tab ? this.setState({ activeTab: null }) : this.setState({ activeTab: tab })
    }

    render() {
        return (
            <div ref={horizontalTab => this.horizontalTab = horizontalTab} id="horizontalTab2" className="admin-tabs">
                <div className="resp-tabs-container marg-area">
                    {this.props.school.map((sch, i) => {
                        const name = sch.name
                        return <Fragment>
                            <h2 className={"resp-accordion " + (this.state.activeTab === i ? "resp-tab-active" : "")} role="tab" aria-controls={"tab_item-" + i} onClick={() => this.handleTab(i)}>{name}</h2>
                            <div className={"resp-tab-content " + (this.state.activeTab === i ? "resp-tab-content-active" : "resp-accordion-closed")} aria-labelledby={"tab_item-" + 1} style={{ display: this.state.activeTab !== i ? "none" : "block" }}>
                            
                                <OwlCarousel className="owl-theme owl-dbox" items={3}
                                    nav={true}
                                    margin={13}
                                    loop={true}
                                    navText={["<div class='nav-btn nav-ct-pre'>Pre</div>", "<div class='nav-btn nav-ct-next'>Next</div>"]}
                                    key={`carousel_${name}`}
                                    dots={false}
                                    responsive={this.state.responsive} 
                                >
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 1</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 2</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 3</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 4</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 5</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 6</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>

                                </OwlCarousel>

                                <div className="owl-dbox owl-carousel owl-theme">
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 1</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 2</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 3</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 4</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 5</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="data-box">
                                            <ul>
                                                <li>Blessed Sacrament High School 6</li>
                                                <li>Private</li>
                                                <li>Grade 8 - 12</li>
                                                <li>207 enrollment</li>
                                                <li>1.5 KM away</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="bod-area" />
                            </div>
                        </Fragment>
                    }
                    )}



                </div>

            </div>
        )
    }
}

export default SchoolTab
