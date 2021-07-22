import React from 'react'

export default function Alert({msg, addclass}) {
    return (
        <div className={"alert " + addclass} style={{ display: 'block' }}>
                {msg}
        </div>
    )
}
