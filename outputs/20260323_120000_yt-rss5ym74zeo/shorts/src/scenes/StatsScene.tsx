import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { Tag } from '../components/Tag';
import { C } from '../constants';

interface StatCardProps {
  value: string;
  label: string;
  sub: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, sub, color, delay, frame, fps }) => {
  const cardSpring = spring({
    fps,
    frame: frame - delay,
    from: 60,
    to: 0,
    durationInFrames: 28,
    config: { stiffness: 90, damping: 18 },
  });
  const cardOpacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const numScale = spring({
    fps,
    frame: frame - delay - 8,
    from: 0.6,
    to: 1,
    durationInFrames: 20,
    config: { stiffness: 180, damping: 12 },
  });

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardSpring}px)`,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 16,
        padding: '36px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          transform: `scale(${numScale})`,
          transformOrigin: 'left center',
          color,
          fontSize: 96,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          lineHeight: 1,
          textShadow: `0 0 30px ${color}50`,
        }}
      >
        {value}
      </div>
      <div style={{ color: C.white, fontSize: 38, fontWeight: 700, fontFamily: 'sans-serif' }}>
        {label}
      </div>
      <div style={{ color: C.muted, fontSize: 28, fontFamily: 'sans-serif', lineHeight: 1.4 }}>
        {sub}
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const headY = spring({ fps, frame, from: 30, to: 0, durationInFrames: 22 });

  const dividerScale = spring({ fps, frame: frame - 8, from: 0, to: 1, durationInFrames: 20 });

  const stats = [
    { value: '7개월', label: 'AI 성능 2배 주기', sub: '모델 성능 배증 속도', color: C.green, delay: 18 },
    { value: '50%', label: '화이트칼라 직업 소멸', sub: 'Dario Amodei 예측, 1-5년 내', color: C.amber, delay: 32 },
    { value: '1시간', label: '하루 투자로 충분', sub: '6개월이면 99% 앞선다', color: C.red, delay: 46 },
  ];

  const footOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background accent={C.amber} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 0,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            marginBottom: 16,
          }}
        >
          <Tag>AI가 바꾸는 숫자들</Tag>
        </div>

        <h2
          style={{
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            color: C.white,
            fontSize: 64,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            margin: 0,
            marginTop: 20,
            marginBottom: 12,
            lineHeight: 1.25,
          }}
        >
          이미 일어나고{'\n'}있는 일들
        </h2>

        {/* 구분선 */}
        <div
          style={{
            width: `${80 * dividerScale}px`,
            height: 4,
            background: `linear-gradient(90deg, ${C.amber}, ${C.amberDark})`,
            borderRadius: 2,
            marginBottom: 48,
          }}
        />

        {/* 스탯 카드들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {stats.map((s, i) => (
            <StatCard key={i} {...s} frame={frame} fps={fps} />
          ))}
        </div>

        {/* 하단 강조 */}
        <div
          style={{
            opacity: footOpacity,
            marginTop: 44,
            background: `${C.amber}15`,
            border: `1px solid ${C.amber}40`,
            borderRadius: 12,
            padding: '20px 28px',
          }}
        >
          <p
            style={{
              color: C.amber,
              fontSize: 32,
              fontFamily: 'sans-serif',
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: C.white }}>"컴퓨터로 하는 일 중{'\n'}안전한 것은 없다"</span>
            <br />— Matt Shumer
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
