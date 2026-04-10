import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../constants';

export const QuoteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fade = (s: number, e: number) =>
    interpolate(frame, [s, e], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // 배경 링
  const ringScale = spring({ fps, frame: frame - 4, from: 0.7, to: 1, durationInFrames: 40, config: { stiffness: 50, damping: 22 } });
  const ringOpacity = interpolate(frame, [4, 24, 80, 100], [0, 0.2, 0.2, 0]);

  // 따옴표 장식
  const quoteMarkPop = spring({ fps, frame, from: 0.4, to: 1, durationInFrames: 22, config: { stiffness: 180, damping: 12 } });

  // 텍스트 라인별 등장
  const line1Opacity = fade(10, 26);
  const line1Y = spring({ fps, frame: frame - 10, from: 40, to: 0, durationInFrames: 24 });

  const line2Opacity = fade(24, 40);
  const line2Y = spring({ fps, frame: frame - 24, from: 40, to: 0, durationInFrames: 24 });

  const line3Opacity = fade(40, 56);
  const line3Y = spring({ fps, frame: frame - 40, from: 30, to: 0, durationInFrames: 22 });

  const sourceOpacity = fade(58, 72);
  const ctaOpacity = fade(72, 86);

  return (
    <AbsoluteFill>
      <Background accent={C.amber} />

      {/* 배경 링들 */}
      {[1, 1.5, 2.1].map((scale, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '48%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${ringScale * scale})`,
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: `1.5px solid ${C.amber}`,
            opacity: ringOpacity / (i + 1),
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* 파티클 장식 */}
      {[
        { top: '18%', left: '12%' },
        { top: '24%', right: '10%' },
        { top: '72%', left: '8%' },
        { top: '78%', right: '14%' },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: C.amber,
            opacity: fade(20 + i * 8, 36 + i * 8),
            boxShadow: `0 0 12px ${C.amber}`,
          }}
        />
      ))}

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 72px',
        }}
      >
        {/* 큰 따옴표 */}
        <div
          style={{
            transform: `scale(${quoteMarkPop})`,
            color: C.amber,
            fontSize: 140,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            opacity: fade(0, 14),
            marginBottom: -20,
            alignSelf: 'flex-start',
            textShadow: `0 0 40px ${C.amber}50`,
          }}
        >
          "
        </div>

        {/* 인용문 라인 1 */}
        <p
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            color: C.muted,
            fontSize: 52,
            fontFamily: 'sans-serif',
            fontWeight: 500,
            textAlign: 'center',
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          지금 시작하는 사람이
        </p>

        {/* 인용문 라인 2 */}
        <p
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            color: C.white,
            fontSize: 64,
            fontFamily: 'sans-serif',
            fontWeight: 800,
            textAlign: 'center',
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          살아남는다.
        </p>

        {/* 인용문 라인 3 (amber 강조) */}
        <p
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
            color: C.amber,
            fontSize: 64,
            fontFamily: 'sans-serif',
            fontWeight: 900,
            textAlign: 'center',
            margin: 0,
            marginBottom: 48,
            lineHeight: 1.3,
            textShadow: `0 0 40px ${C.amber}40`,
          }}
        >
          "두려움이 아닌{'\n'}호기심과 긴박감으로."
        </p>

        {/* 출처 */}
        <div
          style={{
            opacity: sourceOpacity,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: C.dim,
            }}
          />
          <span style={{ color: C.dim, fontSize: 28, fontFamily: 'sans-serif' }}>
            Matt Shumer, AI 전문가
          </span>
          <div style={{ width: 40, height: 1, background: C.dim }} />
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 100,
            padding: '16px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ color: C.amber, fontSize: 24 }}>▶</span>
          <span style={{ color: C.muted, fontSize: 28, fontFamily: 'sans-serif' }}>
            원문: shumer.dev/something-big-is-happening
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
