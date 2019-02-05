import React from 'react'
import VideoCard from './component/VideoCard';

function Recordings(props) {
    return (
        <div className = "recording-list">
            {props.state.recordings.map(recording => {
                return <VideoCard videoSrc = {recording.filePath} />
            })}
        </div>
    )
}

export default Recordings
