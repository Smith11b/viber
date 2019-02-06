import React from 'react'

function VideoCard(props) {
    return (
        <div className = "video-card">
            <video onClick = {props.click} className = "recordings-vid" src = {props.videoSrc} />
            <h1>{props.videoName}</h1>
            <p>{props.videoDescription}</p>
            <button onClick = {props.deleteBTN} className = "delete-btn">Delete</button>
            <button className = "edit-btn">Edit</button>
        </div>
    )
}

export default VideoCard
