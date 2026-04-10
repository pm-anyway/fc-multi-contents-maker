import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../constants';

const LOSER_ITEMS = ['기본 연산도 불안정', '단순 Q&A 수준', '전문직은 안전하다고 믿음', '흥미로운 기술 정도'];
const WINNER_ITEMS = ['최고 엔지니어가 코딩 위임', '복잡한 법률·의료 분석', 'AI가 AI 다음 버전 설계', '모든 인지 업무 자동화 가능'];

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const headY = spring({ fps, frame, from: 30, to: 0, durationInFrames: 22 });

  const leftSpring = spring({ fps, frame: frame - 10, from: -120, to: 0, durationInFrames: 28, config: { stiffness: 90, damping: 18 } });
  const leftOpacity = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });

  const rightSpring = spring({ fps, frame: frame - 22, from: 120, to: 0, durationInFrames: 28, config: { stiffness: 90, damping: 18 } });
  const rightOpacity = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });

  const vsOpacity = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const vsScale = spring({ fps, frame: frame - 18, from: 0.4, to: 1, durationInFrames: 20, config: { stiffness: 200, damping: 12 } });

  const bottomOpacity = interpolate(frame, [72, 88], [0, 1], { extrapolateRight: 'clamp' });

  const itemDelay = (i: number) => i * 8;
  const itemOpacity = (i: number) =>
    interpolate(frame, [30 + itemDelay(i), 44 + itemDelay(i)], [0, 1], { extrapolateRight: 'clamp' });
  const itemX = (i: number, dir: number) =>
    spring({ fps, frame: frame - 30 - itemDelay(i), from: dir * 30, to: 0, durationInFrames: 20 });

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 56px',
        }}
      >
        {/* 헤더 */}
        <p
          style={{
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            color: C.muted,
            fontSize: 36,
            fontFamily: 'sans-serif',
            margin: 0,
            marginBottom: 12,
          }}
        >
          2022년 vs 2025년
        </p>
        <h2
          style={{
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            color: C.white,
            fontSize: 64,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            margin: 0,
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          AI는 얼마나
          <br />
          <span style={{ color: C.amber }}>빨리 바뀌었나</span>
        </h2>

        {/* 두 컬럼 비교 */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 28, alignItems: 'stretch' }}>
          {/* 왼쪽: 언더퍼포머 */}
          <div
            style={{
              flex: 1,
              opacity: leftOpacity,
              transform: `translateX(${leftSpring}px)`,
              background: `${C.red}12`,
              border: `1.5px solid ${C.red}40`,
              borderRadius: 16,
              padding: '28px 24px',
            }}
          >
            <div style={{ color: C.red, fontSize: 28, fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>
              2022년
            </div>
            <div style={{ color: C.muted, fontSize: 26, fontFamily: 'sans-serif', marginBottom: 20 }}>
              "<strong style={{ color: C.white }}>흥미로운 기술</strong>"
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LOSER_ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity(i),
                    transform: `translateX(${itemX(i, -1)}px)`,
                    color: C.muted,
                    fontSize: 26,
                    fontFamily: 'sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ color: `${C.red}80`, fontSize: 20 }}>—</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* VS */}
          <div
            style={{
              opacity: vsOpacity,
              transform: `scale(${vsScale})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: C.dim,
                fontSize: 28,
                fontWeight: 800,
                fontFamily: 'sans-serif',
                writingMode: 'vertical-rl',
              }}
            >
              VS
            </span>
          </div>

          {/* 오른쪽: 아웃퍼포머 */}
          <div
            style={{
              flex: 1,
              opacity: rightOpacity,
              transform: `translateX(${rightSpring}px)`,
              background: `${C.amber}12`,
              border: `1.5px solid ${C.amber}40`,
              borderRadius: 16,
              padding: '28px 24px',
            }}
          >
            <div style={{ color: C.amber, fontSize: 28, fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>
              2025년
            </div>
            <div style={{ color: C.muted, fontSize: 26, fontFamily: 'sans-serif', marginBottom: 20 }}>
              "<strong style={{ color: C.white }}>일을 맡기는 동료</strong>"
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {WINNER_ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity(i),
                    transform: `translateX(${itemX(i, 1)}px)`,
                    color: C.white,
                    fontSize: 26,
                    fontFamily: 'sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ color: C.amber, fontSize: 20 }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 인용 */}
        <div
          style={{
            opacity: bottomOpacity,
            background: C.surface,
            borderLeft: `4px solid ${C.amber}`,
            borderRadius: '0 12px 12px 0',
            padding: '22px 28px',
          }}
        >
          <p
            style={{
              color: C.muted,
              fontSize: 30,
              fontFamily: 'sans-serif',
              margin: 0,
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            "We're past the point where this is an interesting dinner conversation about the future."
            <br />
            <span style={{ color: C.white }}>이건 더 이상 미래에 대한 저녁 식탁 대화가 아니에요.</span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
