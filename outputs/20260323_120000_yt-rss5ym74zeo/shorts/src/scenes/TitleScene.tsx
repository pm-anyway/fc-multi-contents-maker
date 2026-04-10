import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { Tag } from '../components/Tag';
import { C } from '../constants';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fade = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const slideUp = (startFrame: number) =>
    spring({ fps, frame: frame - startFrame, from: 50, to: 0, durationInFrames: 25, config: { stiffness: 80, damping: 18 } });

  const tagOpacity = fade(0, 18);
  const tagY = slideUp(0);

  const line1Opacity = fade(12, 28);
  const line1Y = slideUp(12);

  const numScale = spring({ fps, frame: frame - 22, from: 0.5, to: 1, durationInFrames: 22, config: { stiffness: 200, damping: 14 } });
  const numOpacity = fade(22, 36);

  const line2Opacity = fade(32, 46);
  const line2Y = slideUp(32);

  const speakerOpacity = fade(50, 65);
  const speakerY = slideUp(50);

  // 배경 amber 링
  const ringScale = spring({ fps, frame: frame - 5, from: 0.6, to: 1, durationInFrames: 40, config: { stiffness: 50, damping: 20 } });
  const ringOpacity = interpolate(frame, [5, 30, 75, 90], [0, 0.15, 0.15, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background />

      {/* 배경 링 장식 */}
      {[1, 1.4, 1.9].map((scale, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${ringScale * scale})`,
            width: 700,
            height: 700,
            borderRadius: '50%',
            border: `1px solid ${C.amber}`,
            opacity: ringOpacity / (i + 1),
            pointerEvents: 'none',
          }}
        />
      ))}

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 80px',
          gap: 0,
        }}
      >
        {/* 태그 */}
        <div
          style={{
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            marginBottom: 56,
          }}
        >
          <Tag>Matt Shumer · shumer.dev</Tag>
        </div>

        {/* 상단 텍스트 */}
        <p
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            color: C.muted,
            fontSize: 44,
            fontFamily: 'sans-serif',
            fontWeight: 500,
            textAlign: 'center',
            margin: 0,
            marginBottom: 20,
            lineHeight: 1.3,
          }}
        >
          지금
        </p>

        {/* 90% 임팩트 숫자 */}
        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: C.amber,
              fontSize: 220,
              fontWeight: 900,
              fontFamily: 'sans-serif',
              lineHeight: 1,
              textShadow: `0 0 60px ${C.amber}60, 0 0 120px ${C.amber}20`,
            }}
          >
            90%
          </span>
        </div>

        {/* 하단 텍스트 */}
        <p
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            color: C.white,
            fontSize: 72,
            fontFamily: 'sans-serif',
            fontWeight: 800,
            textAlign: 'center',
            margin: 0,
            marginBottom: 80,
            lineHeight: 1.3,
          }}
        >
          뭔가 큰 일이
          <br />
          일어나고 있다
        </p>

        {/* 발표자 */}
        <div
          style={{
            opacity: speakerOpacity,
            transform: `translateY(${speakerY}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 100,
            padding: '14px 32px',
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.amber }} />
          <span style={{ color: C.muted, fontSize: 30, fontFamily: 'sans-serif' }}>
            AI 전문가 Matt Shumer
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
