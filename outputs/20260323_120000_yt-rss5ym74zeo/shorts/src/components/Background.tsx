import { AbsoluteFill } from 'remotion';
import { C } from '../constants';

interface BackgroundProps {
  accent?: string;
  gridOpacity?: number;
}

export const Background: React.FC<BackgroundProps> = ({
  accent = C.amber,
  gridOpacity = 0.35,
}) => {
  return (
    <AbsoluteFill>
      {/* 베이스 */}
      <div style={{ position: 'absolute', inset: 0, background: C.bg }} />

      {/* 그리드 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${C.border} 1px, transparent 1px),
            linear-gradient(90deg, ${C.border} 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          opacity: gridOpacity,
        }}
      />

      {/* 중앙 글로우 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${accent}12 0%, transparent 70%)`,
        }}
      />

      {/* 상단 비네팅 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${C.bg}cc 0%, transparent 25%, transparent 75%, ${C.bg}cc 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
