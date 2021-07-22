import React from 'react'
import BACKEND_URL from '../../shared/_helpers/utils'

function DetachedTable({ body, handleDelete, handleEdit }) {
    return (
        <table className="prj-list">
            <thead>
                <tr>
                    <th width="20%" scope="col" className="pl-40">Address</th>
                    <th width="10%" scope="col">City</th>
                    <th width="10%" scope="col">Price</th>
                    <th width="5%" scope="col">Beds</th>
                    <th width="5%" scope="col">Baths</th>
                    <th width="5%" scope="col">Floor (SF)</th>
                    <th width="5%" scope="col">Lot (SF)</th>
                    <th width="5%" scope="col">F x D</th>
                    <th width="5%" scope="col">Zone</th>
                    <th width="20%" scope="col">Developer</th>
                    <th width="5%" scope="col" class="text-right"></th>
                    <th width="5%" scope="col" class="text-right"></th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(body) ?
                    body.length === 0 ? '' :
                        body.map((project, i) =>
                            <tr key={i}>
                                <td data-label="Address">
                                    <div className="custom-control custom-checkbox">
                                        {project.featured ?
                                            <input type="checkbox" className="custom-control-input" id="customCheckBox2145" checked />
                                            :
                                            <input type="checkbox" className="custom-control-input" id="customCheckBox2145" />
                                        }

                                        <label className="custom-control-label pt-1 text-dark sm" htmlFor="customCheckBox2145">
                                            {project.address}
                                        </label>
                                    </div>
                                </td>
                                <td data-label="City">{project.city}</td>
                                <td data-label="Price">{project.price}</td>
                                <td data-label="Beds">{project.bedrooms}</td>
                                <td data-label="Baths">{project.bathrooms}</td>
                                <td data-label="Floor (SF)">{project.floor_size}</td>
                                <td data-label="Lot (SF)">{project.lot}</td>
                                <td data-label="F x D">{project.f_d}</td>
                                <td data-label="Zone">{project.zone}</td>
                                <td data-label="Developer">{project.developer.name}</td>
                                <td class="text-right" onClick={() => handleEdit(project)}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                                <td class="text-right" onClick={() => handleDelete(project)}>
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                </td>
                            </tr>
                        )
                    : 'Loading'}
            </tbody>
        </table>

    )
}

export default DetachedTable
