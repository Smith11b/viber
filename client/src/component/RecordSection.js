import React from 'react'

function RecordSection(props) {
    return (
        <div className = "record-div">
            <div onClick = {props.vidStart}className = "start-circle"><h1>Start Vid</h1></div>
            <div onClick = {props.recordVideo}className = "record-circle"><h1>{props.state.isRecording ? "[]" : "REC"}</h1></div>
        </div>
    )
}

export default RecordSection
