import React, { Component, Fragment } from 'react'
import AdminContainer from '../layout/AdminContainers'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { BASEURL } from '../../services/url';

export class PropertyData extends Component {
    render() {
        const { propertyData } = this.props
        return (
            <AdminContainer>
                <div id="container">
                    <div className="w-100">
                        {/* movnile slider */}
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {propertyData.images.map((image, i) =>
                                    <div key={i} className="carousel-item active">
                                        <img className="d-block w-100" src={BASEURL + "/uploads/" + image} alt="First slide" />
                                    </div>
                                )}

                               
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                        <div className="modal fade p-0" id="exampleModal32" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel32" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <button type="button" className="close flor-cross" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.4509449102816!2d72.67042441464567!3d32.084096026299825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392177af937090ad%3A0xd48a5b2159ce60c3!2sSultan%20Plaza!5e0!3m2!1sen!2s!4v1595499691180!5m2!1sen!2s" width="100%" height={500} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-h-area">
                        <div className="container-fluid">
                            <div id="email-box">
                                <div className="email-area">
                                    <input type="text" className="form-control" name placeholder="Email project to..." />
                                    <input type="submit" className="btn btn-block orng-btn mt-0" defaultValue="SHARE" name />
                                </div>
                            </div>
                            {/* slider emd */}
                            <div className="row">
                                <div className="col-7 p-zero">
                                    <h2>
                                        {propertyData.name} </h2>
                                </div>
                                <div className="col-5 p-zero">
                                    <div className="icons-area clearfix">
                                        <ul className="icons-list clearfix">
                                            {/* <li>
                                                <a href="#" data-toggle="modal" data-target="#exampleModal32">
                                                    <div className="location-h" /> <h6>Map</h6>
                                                </a></li>
                                            <li>
                                                <a href="javascript:void(0)" id="email-popover">
                                                    <div className="share-h" /><h6>Share</h6>
                                                </a>
                                            </li> */}
                                            {/* <li>
<div class="email-area">
 <input type="text" class="form-control" name="" placeholder="Email project to..." >
 <input type="submit" class="btn btn-block orng-btn mt-0" value="SHARE" name="">
     </div>
</li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {/* body section */}
                        <div className="w-100">
                            <div className="row">
                                <div className="col-6">
                                    <span className="list-head">
                                        Address:
          </span>
                                    <span className="list-dis">
                                        {propertyData.address}
                                    </span>
                                    <span className="list-head">
                                        City:
          </span>
                                    <span className="list-dis">
                                        {propertyData.city}
                                    </span>
                                    <span className="list-head">
                                        Country:
          </span>
                                    <span className="list-dis">
                                        {propertyData.country}
                                    </span>
                                    <span className="list-head">
                                        Price:
          </span>
                                    <span className="list-dis">
                                        From ${propertyData.price}</span>
                                    <span className="list-head">
                                        Commercial:
          </span>
                                    <span className="list-dis">
                                        {propertyData.commercial ? propertyData.commercial : 0} units</span>
                                    <span className="list-head">Condos:</span>
                                    <span className="list-dis">{propertyData.condos ? propertyData.condos : 0} units</span>
                                    <span className="list-head">Townhouse:</span>
                                    <span className="list-dis m-bt">{propertyData.townhouse ? propertyData.townhouse : 0} units</span>
                                </div>
                                <div className="col-6 p-l-xs">
                                    <span className="list-head">
                                        Floor size:</span>
                                    <span className="list-dis">
                                        {propertyData.fllor_size} SF
          </span>
                                    <span className="list-head">
                                        Levels:</span>
                                    <span className="list-dis">
                                        {propertyData.levels} Level(s)
          </span>
                                    <span className="list-head">
                                        Zoning:</span>
                                    <span className="list-dis">
                                        {propertyData.zone}
                                    </span>
                                    {/* <span className="list-head">
                                        Status:
          </span>
                                    <span className="list-dis">
                                        Under Construction
          </span> */}
                                    <span className="list-head">
                                        Completion:
          </span>
                                    <span className="list-dis">
                                        {propertyData.completion}</span>
                                    <span className="list-head">
                                        Developer:</span>
                                    <span className="list-dis">
                                        {propertyData.developer.name}
                                    </span>
                                    <span className="list-head">
                                        Architect:</span>
                                    <span className="list-dis">
                                        {propertyData.architect}
                                    </span>
                                </div>
                            </div>
                            {/* LIST END */}
                            <h2 className="page-heading">
                                MORTGAGE CALCULATOR
      </h2>
                            <div className="row"><div className="col-md-6 pr-md-1">
                                <div className="round-input readonly big">
                                    <input type="text" defaultValue="$1,486" readOnly />
                                    <span className="list-head d-inline-block ml-2 bg">
                                        Mortgage payment (estimated)
            </span>
                                </div>
                            </div>
                            </div>
                            <h3 className="date-path">
                                Monthly &nbsp;<span className="col-greenish">|</span>&nbsp;
        <span className="col-redish">Semi-monthly</span>
        &nbsp;<span className="col-greenish">|</span>&nbsp; <span className="col-redish">
                                    Bi-weekly</span>&nbsp;
        <span className="col-greenish">|</span>&nbsp;
        <span className="col-redish">Weekly</span>
                            </h3>
                            {/* btn row */}
                            <div className="row">
                                <div className="col-md-3 col-6 mt-3 pr-1">
                                    <span className="down-text">
                                        Mortgage amount
          </span>
                                    <div className="round-input readonly">
                                        <input type="text" defaultValue="$365,600" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-3 pl-1 pr-md-1">
                                    <span className="down-text">
                                        Down payment ($)
          </span>
                                    <div className="round-input readonly">
                                        <input type="text" defaultValue="$91,400" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-6 mt-3 pr-1">
                                    <span className="down-text">
                                        Price
          </span>
                                    <div className="round-input">
                                        <input type="text" defaultValue="$91,400" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-3 pl-1 pr-md-1">
                                    <span className="down-text">
                                        Down payment (%)
          </span>
                                    <div className="custom-selects">
                                        <select>
                                            <option>20%</option>
                                            <option>30%</option>
                                            <option>40%</option>
                                            <option>50%</option>
                                            <option>60%</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-3 pr-1 pl-md-1">
                                    <span className="down-text">
                                        Interest rate
          </span>
                                    <div className="round-input">
                                        <input type="text" defaultValue="3.00%" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-3 pl-1">
                                    <span className="down-text">
                                        Amortization period
          </span>
                                    <div className="custom-selects">
                                        <select>
                                            <option>25 Years</option>
                                            <option>30 Years</option>
                                            <option>35 Years</option>
                                            <option>40 Years</option>
                                            <option>45 Years</option>
                                        </select>
                                    </div>
                                </div>
                                {/* btn row end */}
                                <div className="col-md-12 mt-md-5">
                                    <h2 className="page-heading">
                                        VIDEOS
          </h2>
                                </div>
                                {/* video row */}
                                <div className="col-md-12 m-right-z">
                                    <div className="swiper-container">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#" data-toggle="modal" data-target="#exampleModal">
                                                        <img src="images/v1.jpg" className="img-responsive " />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        Semi-Waterfront Luxury Living
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#">
                                                        <img src="images/v2.jpg" className="img-responsive " />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        The Perfect Place to Call Home
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#">
                                                        <img src="images/v3.jpg" className="img-responsive " />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        Luxury Mountain Home
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#">
                                                        <img src="images/v4.jpg" className="img-responsive" />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        European Style Meets West Coast...
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#" data-toggle="modal" data-target="#exampleModal">
                                                        <img src="images/v1.jpg" className="img-responsive " />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        Semi-Waterfront Luxury Living
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#">
                                                        <img src="images/v2.jpg" className="img-responsive " />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        The Perfect Place to Call Home
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#">
                                                        <img src="images/v3.jpg" className="img-responsive " />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        Luxury Mountain Home
                  </p>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="box-items">
                                                    <a href="#">
                                                        <img src="images/v4.jpg" className="img-responsive" />
                                                    </a>
                                                    <p className="page-para mt-2">
                                                        European Style Meets West Coast...
                  </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Add Arrows */}
                                        <div className="swiper-button-next" />
                                        <div className="swiper-button-prev" />
                                    </div>
                                </div>
                                {/* slider end */}
                                {/* Video roe emd */}
                                <div className="col-md-12 mt-md-5">
                                    <h2 className="page-heading">
                                        DESCRIPTION
          </h2>
                                    <p className="para-sky w-100 mb-0">
                                        Akimbo’s bold exterior will define the Brentwood skyline. The 40-storey project’s architectural definition is marked by its angled, offset balconies
                                        that wrap the height of the building, providing both sun shade and unobstructed views. For the first time ever, an architectural landmark building
                                        designed to the world-class level of the most iconic buildings in Downtown Vancouver, comes to Brentwood.
          </p>
                                </div>
                                <div className="col-md-12 mt-md-5">
                                    <h2 className="page-heading">
                                        AMENITIES  &nbsp;
            <span className="col-witesh">
                                            |
            </span>
            &nbsp;
            <a href data-toggle="modal" data-target="#exampleModal12" title>
                                            <span className="col-redish"> FEATURE SHEET</span>
                                        </a>
                                    </h2>
                                </div>
                                <div className="col-6">
                                    <p className="para-sky w-100 mb-4 sp">
                                        Car wash area
          </p>
                                    <p className="para-sky w-100 mb-4 sp">
                                        Underground parking
          </p>
                                    <p className="para-sky w-100 mb-4">
                                        Children’s play area
          </p>
                                </div>
                                <div className="col-6 p-l-xs">
                                    <p className="para-sky w-100 mb-4 sp">
                                        Concierge
          </p>
                                    <p className="para-sky w-100 mb-4 sp">
                                        Party room
          </p>
                                    <p className="para-sky w-100 mb-4">
                                        Guest suites
          </p>
                                </div>
                                <div className="col-md-12 mt-md-1">
                                    <h2 className="page-heading">
                                        FLOOR PLANS
          </h2>
                                </div>
                                <div className="col-md-12">
                                    <div id="horizontalTab">
                                        <ul className="resp-tabs-list">
                                            <li className="mr-md-1">Townhouse</li>
                                            <li className="mr-md-1">1 Bedroom</li>
                                            <li className="mr-md-1">2 Bedroom</li>
                                            <li className="mr-md-1">3 Bedroom</li>
                                        </ul>
                                        <div className="modal fade p-0" id="exampleModal12" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel12" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <button type="button" className="close flor-cross" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                        <img src="images/floor.jpg" className="w-100" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="resp-tabs-container">
                                            <div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh urna, euismod ut ornare non, volutpat vel tortor. Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna gravida mollis.</p>
                                                <div className="bod-area" />
                                            </div>
                                            <div>
                                                <div className="swiper-container mt-bt">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="plan-bx">
                                                                <a href data-toggle="modal" data-target="#exampleModal12" title>
                                                                    <img src="images/fl1.jpg" className="w-100" alt="" /> </a>
                                                                <b>Plan 01</b>
                                                                <ul className="detail">
                                                                    <li>Bedrooms:</li> <li>1 + Den</li>
                                                                    <li>Bathrooms:</li><li>1</li>
                                                                    <li>Floor size:</li><li>455 SF</li>
                                                                    <li>Balcony:</li><li>95 SF</li>
                                                                    <li>Level:</li><li>5 - 15, 18</li>
                                                                    <li>Starting price:</li><li>$529,900</li>
                                                                </ul></div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="plan-bx">
                                                                <a href data-toggle="modal" data-target="#exampleModal12" title>
                                                                    <img src="images/fl1.jpg" className="w-100" alt="" /> </a>
                                                                <b>Plan 02</b>
                                                                <ul className="detail">
                                                                    <li>Bedrooms:</li> <li>1 + Den</li>
                                                                    <li>Bathrooms:</li><li>1</li>
                                                                    <li>Floor size:</li><li>455 SF</li>
                                                                    <li>Balcony:</li><li>95 SF</li>
                                                                    <li>Level:</li><li>5 - 15, 18</li>
                                                                    <li>Starting price:</li><li>$529,900</li>
                                                                </ul></div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="plan-bx">
                                                                <a href data-toggle="modal" data-target="#exampleModal12" title>
                                                                    <img src="images/fl1.jpg" className="w-100" alt="" /> </a>
                                                                <b>Plan 03</b>
                                                                <ul className="detail">
                                                                    <li>Bedrooms:</li> <li>1 + Den</li>
                                                                    <li>Bathrooms:</li><li>1</li>
                                                                    <li>Floor size:</li><li>455 SF</li>
                                                                    <li>Balcony:</li><li>95 SF</li>
                                                                    <li>Level:</li><li>5 - 15, 18</li>
                                                                    <li>Starting price:</li><li>$529,900</li>
                                                                </ul></div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="plan-bx">
                                                                <a href data-toggle="modal" data-target="#exampleModal12" title>
                                                                    <img src="images/fl1.jpg" className="w-100" alt="" /> </a>
                                                                <b>Plan 04</b>
                                                                <ul className="detail">
                                                                    <li>Bedrooms:</li> <li>1 + Den</li>
                                                                    <li>Bathrooms:</li><li>1</li>
                                                                    <li>Floor size:</li><li>455 SF</li>
                                                                    <li>Balcony:</li><li>95 SF</li>
                                                                    <li>Level:</li><li>5 - 15, 18</li>
                                                                    <li>Starting price:</li><li>$529,900</li>
                                                                </ul></div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="plan-bx">
                                                                <a href data-toggle="modal" data-target="#exampleModal12" title>
                                                                    <img src="images/fl1.jpg" className="w-100" alt="" /> </a>
                                                                <b>Plan 05</b>
                                                                <ul className="detail">
                                                                    <li>Bedrooms:</li> <li>1 + Den</li>
                                                                    <li>Bathrooms:</li><li>1</li>
                                                                    <li>Floor size:</li><li>455 SF</li>
                                                                    <li>Balcony:</li><li>95 SF</li>
                                                                    <li>Level:</li><li>5 - 15, 18</li>
                                                                    <li>Starting price:</li><li>$529,900</li>
                                                                </ul></div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="plan-bx">
                                                                <a href data-toggle="modal" data-target="#exampleModal12" title>
                                                                    <img src="images/fl1.jpg" className="w-100" alt="" /> </a>
                                                                <b>Plan 06</b>
                                                                <ul className="detail">
                                                                    <li>Bedrooms:</li> <li>1 + Den</li>
                                                                    <li>Bathrooms:</li><li>1</li>
                                                                    <li>Floor size:</li><li>455 SF</li>
                                                                    <li>Balcony:</li><li>95 SF</li>
                                                                    <li>Level:</li><li>5 - 15, 18</li>
                                                                    <li>Starting price:</li><li>$ 529,900</li>
                                                                </ul></div>
                                                        </div>
                                                    </div>
                                                    <div className="swiper-button-next" />
                                                    <div className="swiper-button-prev" />
                                                </div>
                                                <div className="bod-area" />
                                            </div>
                                            <div>
                                                <p>Suspendisse blandit velit Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.</p>
                                                <div className="bod-area" />
                                            </div>
                                            <div>
                                                <p>Sus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.</p>
                                                <div className="bod-area" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100 pt-md-4">
                                        <h2 className="page-heading ">
                                            SCHOOLS
            </h2>
                                        {/* TABS SCHOOL */}
                                        <div id="horizontalTab2">
                                            <ul className="resp-tabs-list">
                                                <li className="mr-md-1">Daycare</li>
                                                <li className="mr-md-1">Elementary</li>
                                                <li className="mr-md-1">Middle school </li>
                                                <li>High school</li>
                                            </ul>
                                            <div className="resp-tabs-container marg-area">
                                                <div>
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
                                                                    <li>Blessed Sacrament High School  5</li>
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
                                                                    <li>Blessed Sacrament High School  6</li>
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
                                                <div>
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
                                                                    <li>Blessed Sacrament High School  6</li>
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
                                                <div>
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
                                                                    <li>Blessed Sacrament High School  6</li>
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
                                                <div>
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
                                                                    <li>Blessed Sacrament High School  6</li>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* TABS SCHOOL END */}
                            </div>
                        </div>
                        <div className="w-100 pt-1">
                            <h2 className="page-h">
                                CONTACT
      </h2>
                            <p className="para-sky w-100">
                                We would like to hear from you. Whether you are a property buyer, investor, seller or a real estate developer, seller or a real estate developer, our Skyrise team is ready to answer
                                your questions.
      </p>
                            <div className="row">
                                <div className="col-md-4 col-lg-4">
                                    <a href="tel:6048058888" className="phone">
                                        <span>
                                            (604) 805 - 8888
            </span>
                                    </a>
                                    <a href="mailto:hello@skyriseprojects.com
      " className="mail mt-4 mb-4 mb-md-0">
                                        <span>
                                            hello@skyriseprojects.com
            </span>
                                    </a>
                                </div>
                                {/* form here */}
                                <div className="col-md-4 col-lg-4 pl-lg-3 pr-lg-3 p-r-5">
                                    <div className="row form-div mr-lg-0 contact-area">
                                        <div className="col-md-6 pr-md-1">
                                            <input type="text" className="form-control" name placeholder="First name" />
                                        </div>
                                        <div className="col-md-6 pr-md-1 mt-3 mt-md-0 p-l-5">
                                            <input type="text" className="form-control" name placeholder="Last name" />
                                        </div>
                                        <div className="col-md-12 pr-md-1 mt-3">
                                            <input type="text" className="form-control" name placeholder="Phone" />
                                        </div>
                                        <div className="col-md-12 pr-md-1 mt-3">
                                            <input type="text" className="form-control" name placeholder="Email" />
                                        </div>
                                        <div className="col-md-12 mt-3 pr-md-1">
                                            <textarea name className="form-control" placeholder="Message" defaultValue={""} />
                                        </div>
                                        <div className="col-md-12 pr-md-1">
                                            {/* term and condition checkbox */}
                                            <div className="top-spc custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheckBox1" />
                                                <label className="custom-control-label" htmlFor="customCheckBox1">
                                                    By contacting us, you agree to our <a href="#"> terms of service </a> and
                  <a href="#"> privacy policy.</a>
                                                </label>
                                            </div>
                                            <div className="top-spc">
                                                <input type="submit" className="btn btn-block orng-btn" defaultValue="SEND" name />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* form here */}
                            </div>
                        </div>
                    </div>
                    <div className="clearfix" />
                </div>

            </AdminContainer>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        propertyData: state.propertyData
    }
}

export default connect(mapStateToProps, {
    getProjects: apiCallAction.getProjects
})(PropertyData)
