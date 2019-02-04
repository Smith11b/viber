import React from 'react'

function RecordSection(props) {
    return (
        <div className = "record-div">
            <div onClick = {props.vidStart}className = "start-circle"><h1>Start Vid</h1></div>
            <div className = "record-circle"><h1>REC</h1></div>
        </div>
    )
}

export default RecordSection
