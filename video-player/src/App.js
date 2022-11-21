import backward from './icon/backward.jpg'
import play from './icon/images.png'
import pause from './icon/pause.png'
import forward from './icon/forward-flat.png'
import video from './icon/video.mp4'
import { useRef, useState } from "react";
import './App.css';

function App() {

  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const [videoTime, setVideoTime] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [progress, setProgress] = useState(0);


  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
      var vid = document.getElementById("video1");
      setVideoTime(vid.duration);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }

  };

  
  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  window.setInterval(function () {

    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);
  return (
    <div className="App">
    <div><video
    id="video1"
    ref={videoRef}
    className="video"
    src={video}
  ></video></div>
    
      <div className="controlsContainer">
      
      


        <div className="controls">
          <img className="controlsIcon" alt="" src={backward} onClick={revert} />
          {playing ? (
            <img className="controlsIcon--small" alt="" src={pause} onClick={() => videoHandler("pause")} />
          ) : (
            <img className="controlsIcon--small" alt="" src={play} onClick={() => videoHandler("play")} />
          )}
          <img className="controlsIcon" alt="" src={forward} onClick={fastForward} />
        </div>

      </div>

      <div className="timecontrols">

        <p className="controlsTime">

          {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </p>
        <div className="time_progressbarContainer">
          <div style={{ width: "40%" }} className="time_progressBar"></div>
        </div>

        <p className="controlsTime">
          {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </p>
      </div>

      
    </div>
  );
}

export default App;
