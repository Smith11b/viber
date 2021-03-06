import React from 'react'
import VideoCard from './component/VideoCard';

function Recordings(props) {
    return (
        <div className = "recording-list">
            {props.state.recordings ? props.state.recordings.map(recording => {
                return (<VideoCard key = {recording._id} deleteBTN = {props.deleteBTN} click = {props.videoClick} videoSrc = {`api/vids/${recording.fileName}`} />)
            }) : <h1>Nothing to Display</h1>}
        </div>
    )
}

export default Recordings
