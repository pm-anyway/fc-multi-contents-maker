import { Composition } from 'remotion';
import { ShortsVideo } from './ShortsVideo';
import { TOTAL_FRAMES, W, H, FPS } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShortsVideo"
        component={ShortsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{}}
      />
    </>
  );
};
