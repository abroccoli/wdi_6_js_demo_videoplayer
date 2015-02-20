'use strict';
window.onload = function() {
  var VideoPlayer = (function(){
      var video = document.getElementById('video');

      // Buttons
      var playButton = document.getElementById('play-pause');
      var muteButton = document.getElementById('mute');
      var fullScreenButton = document.getElementById('full-screen');

      // Sliders
      var seekBar = document.getElementById('seek-bar');
      var volumeBar = document.getElementById('volume-bar');

      var playvid = function(){
          if (video.paused === true) {
          // Play the video
          video.play();

          // Update the button text to 'Pause'
          playButton.innerHTML = 'Pause';
        } else {
          // Pause the video
          video.pause();

          // Update the button text to 'Play'
          playButton.innerHTML = 'Play';
        }
      };
      var mute = function(){
          if (video.muted === false) {
          // Mute the video
          video.muted = true;

          // Update the button text
          muteButton.innerHTML = 'Unmute';
        } else {
          // Unmute the video
          video.muted = false;

          // Update the button text
          muteButton.innerHTML = 'Mute';
        }
      };
      var fullscreen = function(){
          if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen(); // Chrome and Safari
        }
      };
      var seekbar = function(){
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);

        // Update the video time
        video.currentTime = time;
      };
      var seekbarupdate = function (){
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;

        // Update the slider value
        seekBar.value = value;
      };
      var volumevid = function(){
        // Update the video volume
        video.volume = volumeBar.value;
      };
      return{
        video: video,
        playButton: playButton,
        muteButton: muteButton,
        fullScreenButton: fullScreenButton,
        seekBar: seekBar,
        volumeBar: volumeBar,
        playvid: playvid,
        mute: mute,
        fullscreen: fullscreen,
        seekbar: seekbar,
        seekbarupdate: seekbarupdate,
        volumevid: volumevid
      };
  })();

    var vidplayer = VideoPlayer;

    // Event listener for the play/pause button
    vidplayer.playButton.addEventListener('click', vidplayer.playvid);
    // console.log(vidplayer.playButton);

    // Event listener for the mute button
    vidplayer.muteButton.addEventListener('click', vidplayer.mute);


    // Event listener for the full-screen button
    vidplayer.fullScreenButton.addEventListener('click', vidplayer.fullscreen);


    // Event listener for the seek bar
    vidplayer.seekBar.addEventListener('change', vidplayer.seekbar);


    // Update the seek bar as the vidplayer plays
    vidplayer.video.addEventListener('timeupdate', vidplayer.seekbarupdate);

    // Pause the vidplayer when the seek handle is being dragged
    vidplayer.seekBar.addEventListener('mousedown', vidplayer.playvid);

    // Play the vidplayer when the seek handle is dropped
    vidplayer.seekBar.addEventListener('mouseup', vidplayer.playvid);

    // Event listener for the volume bar
    vidplayer.volumeBar.addEventListener('change', vidplayer.volumevid);
};
