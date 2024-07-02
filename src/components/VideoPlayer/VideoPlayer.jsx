import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  Player,
  PlayToggle,
} from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";

export function VideoPlayer({
  src,
  onPlayerChange = () => {},
  onChange = () => {},
  startTime = undefined,
}) {
  const [player, setPlayer] = useState(undefined);
  const [playerState, setPlayerState] = useState(undefined);
  const [source, setSource] = useState();

  useEffect(() => {
    setSource(URL.createObjectURL(src));
  }, [src]);

  useEffect(() => {
    if (playerState) {
      onChange(playerState);
    }
  }, [playerState]);

  useEffect(() => {
    onPlayerChange(player);

    if (player) {
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player]);

  return (
    <div className={styles.videoPlayerContainer}>
      <Player
        ref={(player) => {
          setPlayer(player);
        }}
        startTime={startTime}
        src={source}
      >
        <source src={source} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar disableCompletely></ControlBar>
      </Player>
    </div>
  );
}