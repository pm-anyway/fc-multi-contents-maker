import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { Tag } from '../components/Tag';
import { C } from '../constants';

export const CaseStudyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fade = (s: number, e: number) =>
    interpolate(frame, [s, e], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const slideUp = (startFrame: number) =>
    spring({ fps, frame: frame - startFrame, from: 40, to: 0, durationInFrames: 24 });

  // 45분 카드
  const leftSpring = spring({ fps, frame: frame - 10, from: -80, to: 0, durationInFrames: 26, config: { stiffness: 90, damping: 16 } });
  const leftOpacity = fade(10, 26);

  // 화살표
  const arrowScale = spring({ fps, frame: frame - 28, from: 0, to: 1, durationInFrames: 18, config: { stiffness: 180, damping: 14 } });
  const arrowOpacity = fade(28, 40);

  // 7000일 카드
  const rightSpring = spring({ fps, frame: frame - 36, from: 80, to: 0, durationInFrames: 26, config: { stiffness: 90, damping: 16 } });
  const rightOpacity = fade(36, 52);

  // 숫자 팝업
  const numPop = spring({ fps, frame: frame - 44, from: 0.5, to: 1, durationInFrames: 22, config: { stiffness: 200, damping: 12 } });

  // 설명 텍스트
  const descOpacity = fade(56, 70);
  const descY = slideUp(56);

  const footOpacity = fade(76, 90);

  return (
    <AbsoluteFill>
      <Background accent={C.green} />

      {/* 배경 글로우 */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.green}15 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 64px',
        }}
      >
        {/* 태그 */}
        <div style={{ marginBottom: 32, opacity: fade(0, 14) }}>
          <Tag color={C.green}>자기 개선 루프</Tag>
        </div>

        <h2
          style={{
            opacity: fade(0, 18),
            transform: `translateY(${slideUp(0)}px)`,
            color: C.white,
            fontSize: 60,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            margin: 0,
            marginBottom: 44,
            lineHeight: 1.25,
          }}
        >
          AI가 AI를
          <br />
          만들기 시작했다
        </h2>

        {/* 숫자 비교 박스 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 36,
          }}
        >
          {/* 45분 */}
          <div
            style={{
              opacity: leftOpacity,
              transform: `translateX(${leftSpring}px)`,
              flex: 1,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: '28px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.muted, fontSize: 26, fontFamily: 'monospace', marginBottom: 8 }}>2023년</div>
            <div
              style={{
                color: C.white,
                fontSize: 88,
                fontWeight: 900,
                fontFamily: 'sans-serif',
                lineHeight: 1,
              }}
            >
              GPT
            </div>
            <div style={{ color: C.muted, fontSize: 32, fontFamily: 'sans-serif' }}>-4</div>
          </div>

          {/* 화살표 */}
          <div
            style={{
              opacity: arrowOpacity,
              transform: `scale(${arrowScale})`,
              color: C.amber,
              fontSize: 52,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            →
          </div>

          {/* 7,000일 */}
          <div
            style={{
              opacity: rightOpacity,
              transform: `translateX(${rightSpring}px)`,
              flex: 1,
              background: `${C.green}15`,
              border: `1.5px solid ${C.green}40`,
              borderRadius: 16,
              padding: '28px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.green, fontSize: 26, fontFamily: 'monospace', marginBottom: 8 }}>2026년</div>
            <div
              style={{
                transform: `scale(${numPop})`,
                transformOrigin: 'center',
                color: C.green,
                fontSize: 80,
                fontWeight: 900,
                fontFamily: 'sans-serif',
                lineHeight: 1,
                textShadow: `0 0 30px ${C.green}60`,
              }}
            >
              GPT
            </div>
            <div style={{ color: C.green, fontSize: 32, fontFamily: 'sans-serif' }}>-5.3</div>
          </div>
        </div>

        {/* 설명 */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            background: C.surface,
            borderRadius: 14,
            padding: '24px 28px',
            borderLeft: `3px solid ${C.green}`,
            marginBottom: 24,
          }}
        >
          <p
            style={{
              color: C.muted,
              fontSize: 30,
              fontFamily: 'sans-serif',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            GPT-5.3-Codex는 자기 자신을
            <br />
            만드는 데 핵심 역할을 한
            <br /><span style={{ color: C.white }}>첫 번째 모델이다.</span>
          </p>
        </div>

        {/* 하단 강조 */}
        <p
          style={{
            opacity: footOpacity,
            color: C.amber,
            fontSize: 32,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          "Your dreams just got a lot closer."{'\n'}
          <span style={{ color: C.white }}>당신의 꿈이 훨씬 가까워졌다.</span>
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
