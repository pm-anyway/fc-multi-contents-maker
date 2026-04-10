import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { Tag } from '../components/Tag';
import { C } from '../constants';

interface TipCardProps {
  num: string;
  title: string;
  body: string;
  icon: string;
  accent: string;
  delay: number;
  frame: number;
  fps: number;
}

const TipCard: React.FC<TipCardProps> = ({ num, title, body, icon, accent, delay, frame, fps }) => {
  const slideY = spring({ fps, frame: frame - delay, from: 70, to: 0, durationInFrames: 28, config: { stiffness: 80, damping: 18 } });
  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const iconPop = spring({ fps, frame: frame - delay - 6, from: 0.4, to: 1, durationInFrames: 22, config: { stiffness: 200, damping: 12 } });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: '36px 40px',
        display: 'flex',
        gap: 28,
        alignItems: 'flex-start',
      }}
    >
      {/* 아이콘 영역 */}
      <div
        style={{
          transform: `scale(${iconPop})`,
          flexShrink: 0,
          width: 90,
          height: 90,
          borderRadius: 20,
          background: `${accent}20`,
          border: `1.5px solid ${accent}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 44,
        }}
      >
        {icon}
      </div>

      {/* 텍스트 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: accent,
            fontSize: 24,
            fontFamily: 'monospace',
            fontWeight: 700,
            marginBottom: 8,
            letterSpacing: 1,
          }}
        >
          TIP {num}
        </div>
        <h3
          style={{
            color: C.white,
            fontSize: 46,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            margin: 0,
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: C.muted,
            fontSize: 30,
            fontFamily: 'sans-serif',
            margin: 0,
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
};

export const TipsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const headY = spring({ fps, frame, from: 30, to: 0, durationInFrames: 22 });

  const tips = [
    {
      num: '01',
      title: '지금 당장\n유료 버전 써라',
      body: '최고 사양 모델로\n실제 업무에 써봐야\n감이 온다',
      icon: '💳',
      accent: C.amber,
      delay: 18,
    },
    {
      num: '02',
      title: '매일 1시간\nAI 실험',
      body: '6개월이면\n99%의 사람보다\n앞설 수 있다',
      icon: '⏱️',
      accent: C.blue,
      delay: 48,
    },
  ];

  const footOpacity = interpolate(frame, [88, 105], [0, 1], { extrapolateRight: 'clamp' });

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
        <div style={{ opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 20 }}>
          <Tag>지금 시작하는 법</Tag>
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
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          두려움 말고
          <br />
          <span style={{ color: C.amber }}>호기심으로</span>
        </h2>

        {/* 팁 카드 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {tips.map((tip, i) => (
            <TipCard key={i} {...tip} frame={frame} fps={fps} />
          ))}
        </div>

        {/* 하단 메모 */}
        <p
          style={{
            opacity: footOpacity,
            color: C.dim,
            fontSize: 28,
            fontFamily: 'monospace',
            margin: 0,
            marginTop: 32,
            textAlign: 'center',
          }}
        >
          // 지금 시작하는 사람이 이긴다
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
