import React, { Component } from 'react'
// import {routes.BASEURL} from '../../shared/_helpers/utils'
import { routes } from '../../services/url'

export class Floorplan extends Component {
    
    render() {
        const {section, add, handleInput, index, handleDelete} = this.props
        return (
            
            <li>
                <a href="#" title className="read-more float-right mb-1">
                    Upload
                        </a>
                <a href title>
                    <img src={routes.BASEURL + '/images/up3.jpg'} className="w-100" alt="" />
                </a>
                <div className="row mt-3">
                    <div className="col-6 pt-2">
                        Level
                          </div>
                    <div className="col-6 form-div admin-info">
                        <input type="text" className="form-control" name="Level"  value={section.Level} onChange={handleInput} />
                    </div>
                    <div className="col-6 pt-2 mt-2">
                        Plan
                          </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="text" className="form-control" name="Plan"  value={section.Plan} onChange={handleInput}  />
                    </div>
                    <div className="col-6 pt-2 mt-2">
                        Beds
                          </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="text" className="form-control" name="Bed"  value={section.Bed} onChange={handleInput} />
                    </div>
                    <div className="col-6 pt-2 mt-2">
                        Den
                          </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="text" className="form-control" name="Den"  value={section.Den} onChange={handleInput} />
                    </div>
                    <div className="col-6 pt-2 mt-2">
                        Floor Size
                          </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="text" className="form-control" name="Floor_size"  value={section.Floor_size} onChange={handleInput} />
                    </div>
                    <div className="col-6 pt-2 mt-2">
                        Balconey Size
                          </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="text" className="form-control" name="Balconey_size"  value={section.Balconey_size} onChange={handleInput} />
                    </div>
                    <div className="col-6 pt-2 mt-2">
                        Price
                          </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="text" className="form-control" name="Price"  value={section.Price} onChange={handleInput} />
                    </div>
                    <div className="col-6 pt-3">
                        {
                            index === 0 ? null : <a href="#" onClick={handleDelete} title className="read-more mb-1">
                            Delete
                            </a>
                        }
                        
                    </div>
                    <div className="col-6 form-div admin-info mt-2">
                        <input type="submit" className="btn btn-block orng-btn mt-0" value={index === 0 ? 'ADD' : 'SAVE'} onClick={index === 0 ? add : null} name />
                    </div>
                </div>
            </li>
        )
    }
}

export default Floorplan
