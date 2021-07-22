import React, { Fragment } from 'react'

export default function Checkbox({ check, clickk, name, labelClass, id, inputClass }) {
    return (
        <Fragment>

            <label className={check ? labelClass + "blk-bz" : labelClass} for={id} >
                {name}
                <input type="checkbox" className={inputClass} onClick={clickk} id={id} checked={check} />
                <div className="control_indicator" />
            </label>

            
        </Fragment>
    )
}
