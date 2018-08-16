import React from 'react';
import YouTube from 'react-youtube';

class Player extends React.Component {
  render() {
    const opts = {
      height: '25',
      width: '25',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <YouTube
        videoId="s7cHngfzF80"
        opts={opts}
        
      />
    );
  }

  _onReady(e) {
    // access to player in all event handlers via event.target
    // e.target.playVideo();
  }
}

export default Player;
