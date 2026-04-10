import { AbsoluteFill, Series } from 'remotion';
import { SCENE_DURATIONS } from './constants';
import { TitleScene } from './scenes/TitleScene';
import { StatsScene } from './scenes/StatsScene';
import { ComparisonScene } from './scenes/ComparisonScene';
import { TipsScene } from './scenes/TipsScene';
import { CaseStudyScene } from './scenes/CaseStudyScene';
import { QuoteScene } from './scenes/QuoteScene';

export const ShortsVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0c0a09' }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.title}>
          <TitleScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.stats}>
          <StatsScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.comparison}>
          <ComparisonScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.tips}>
          <TipsScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.caseStudy}>
          <CaseStudyScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.quote}>
          <QuoteScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
