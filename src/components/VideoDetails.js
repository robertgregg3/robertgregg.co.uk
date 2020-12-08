import React from 'react';

import { Paper, Typography } from '@material-ui/core';

const VideoDetails = ({ video }) => {
    if(!video) 
        return <div style={{ padding: '3rem' }}>Loading</div>

    console.log(video)
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`

    return (
        <React.Fragment>
            <Paper elevation={6} style={{ height: '70%' }}>
                <iframe frameBorder="0" height="100%" width="100%" title="Video Player" src={videoSrc} />
            </Paper>
            <Paper elevation={6} style={{ padding: '1rem' }}>
                <Typography variant="h4">{video.snippet.title}</Typography>
                <Typography variant="subtitle1">{video.snippet.channelTitle}</Typography>
                <Typography variant="subtitle2">{video.snippet.description}</Typography>
                <Typography></Typography>
            </Paper>
        </React.Fragment>
    )
}

export default VideoDetails;