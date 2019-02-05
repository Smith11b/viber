import React from 'react'

function VideoCard(props) {
    return (
        <div className = "video-card">
            <video src = {props.videoSrc} />
            <h1>{props.videoName}</h1>
            <p>{props.videoDescription}</p>
        </div>
    )
}

export default VideoCard
