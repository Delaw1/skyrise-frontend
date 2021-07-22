import React, { Component, Fragment }  from 'react'

const Floor = props => {
    return (
        props.floors.map((floor, i) => {
            const name = floor.name
            return <Fragment>
                <h2 className={"resp-accordion " + (this.state.activeTab === i ? "resp-tab-active" : "")} role="tab" aria-controls={"tab_item-" + i} onClick={() => this.handleTab(i)}>{name}</h2>
                <div className={"resp-tab-content " + (this.state.activeTab === i ? "resp-tab-content-active" : "resp-accordion-closed")} aria-labelledby={"tab_item-" + 1} style={{ display: this.state.activeTab !== i ? "none" : "block" }}>
                    <ul className="plan-area clearfix">
                        {floor.section.map((sect, k) => {
                            const name = floor.name
                            return <li>
                                <div className="plan-bx position-relative">
                                    <a className="corner-cross"> <img src="images/black-cross.png" onClick={(e) => props.handleDelete(e, name, k)} className="" alt="loading" /> </a>
                                    <a href="" data-toggle="modal" data-target="#exampleModal12" title="">
                                        <img src={sect.images.preview} alt="" /> </a>
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
        )


    )
}

export default Floor